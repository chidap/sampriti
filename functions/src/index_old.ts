import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
//import * as nodemailer from 'nodemailer';
//const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
//const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({origin: true});
const mailgun = require("mailgun-js");
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

/*const corsOptions = {
                origin: true,
                allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
                methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
                optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
        };*/
export const firestoreInstance = admin.firestore();       

//exports.sendContactMessage = functions.database.ref('contact_us/{email}').onWrite(async(event: any, res: any) => {
exports.sendContactMessage = functions.firestore.document('contact_us/{docId}').onCreate((queryDocumentSnapshot, eventContext) => {
    //const corsMiddleware = cors(corsOptions);
    //return cors()(event, context, () => {
        //context.set("Access-Control-Allow-Origin", "*");
        //context.set("Access-Control-Allow-Methods", "GET");
        //context.set("Access-Control-Allow-Headers", "Content-Type");
        //context.set("Access-Control-Max-Age", "3600");


       const snapshot = queryDocumentSnapshot.data();
        console.log('snapshot1 = ', snapshot);
      // Only send email for new messages.
      // if (snapshot.previous.val() || !snapshot.val().name) {
      //  return;
      //  }
        //console.log('Uppercasing', context.params.pushId, snapshot);
        //const val = snapshot.after.val();
        //console.log('Uppercasing', context.params.pushId, val);
        const mailOptions = {
          from: 'chidap1907@gmail.com',
          to: 'chidap1907@gmail.com',
          subject: `Information Request from ${snapshot.name}`,
          //subject: `Information Request from`,
          //html: val.html
          html:"You've received a new Friend Request"
        };
        console.log('mailoptions = ', mailOptions);
        
        mailTransport.sendMail( mailOptions, (error: any, info: any) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return 0;
        
    });

    /*const DOMAIN = "sandbox42dff048e42349949002e942a1208100.mailgun.org";
    const mg = mailgun({apiKey: "5a167b1f65db56d50f255aa536cf419e-cb3791c4-85384b0a", domain: DOMAIN});
  const data = {
	from: "Mailgun Sandbox <postmaster@sandbox42dff048e42349949002e942a1208100.mailgun.org>",
	to: "chidap1907@gmail.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};
mg.messages().send(data, function (error: any, body: any) {
	  if(error) {
      console.log(error.toString());
    }
    console.log('Sent');
    });

  });*/


