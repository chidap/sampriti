import firebase from 'firebase';
import { Member } from '../models/member';
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Injectable()
export class UploadImageService {
    public cameraImage: string;
    constructor(private commonService: CommonService, private _CAMERA: Camera) {

    }

    takePicture(imgSourceType: string) : Promise <any> {
        let imageSourceType = 0;
        return new Promise(resolve=> {
                if(imgSourceType == 'camera'){
                    imageSourceType = this._CAMERA.PictureSourceType.CAMERA
                } else if(imgSourceType == 'gallery') {
                    imageSourceType = this._CAMERA.PictureSourceType.PHOTOLIBRARY;
                }
                let cameraOptions : CameraOptions = {
                    
                    sourceType         : imageSourceType,
                    destinationType    : this._CAMERA.DestinationType.DATA_URL,
                    mediaType: this._CAMERA.MediaType.PICTURE,
                    quality            : 100,
                    targetWidth        : 500,
                    targetHeight       : 320,
                    encodingType       : this._CAMERA.EncodingType.JPEG,
                    correctOrientation : true
                };
                this._CAMERA.getPicture(cameraOptions)
                        .then((data)=> {
                            this.cameraImage 	= "data:image/jpeg;base64," + data;
                            resolve(this.cameraImage);
                        },
                        error => {
                                    console.log("ERROR -> " + JSON.stringify(error));
                                }
                        )

        })
    }


    uploadImage(imageString: string, imageType: string, path: string): Promise <any> {
                let imageURL =  { 'iconImage': '', 'cardImage': ''};
                let storageRef: any,
                    parseUpload: any;
                return new Promise((resolve, reject)=> {
                    let image: string = this.commonService.guid() + '.jpg'
                    storageRef = firebase.storage().ref(path + image);
                    parseUpload = storageRef.putString(imageString, 'data_url');

                    parseUpload.on('state_changed', (_snapshot)=>{
                        // We could log the progress here IF necessary
                        //console.log('snapshot progess ' + _snapshot);   
                    },
                    (_err)=> {
                        reject(_err);
                    },
                    (success)=> {
                        
                        if(imageType =='icon')
                        {
                            imageURL.iconImage = parseUpload.snapshot.downloadURL;
                        }  
                        else if(imageType =='card') {
                            imageURL.cardImage = parseUpload.snapshot.downloadURL;
                        }
                        resolve(imageURL);
                        });
                
            });
    }

}