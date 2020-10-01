import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puja-update',
  templateUrl: './puja-update.component.html',
  styleUrls: ['./puja-update.component.scss']
})
export class PujaUpdateComponent implements OnInit {

  public posts: Object[] = [
    {
      icon: 'fa fa-heart',
      color: 'teal-text',
      category: 'Lifestyle',
      title: 'Our Durga Idol is getting ready',
      img: './../../assets/images/puja_update/idol_prep1.jpg',
      content: `Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor.`,
      by: 'Jessica Clark',
      date: '26/08/2016',
      number: 'First',
    },
    {
      icon: 'fa fa-heart',
      color: 'red-text',
      category: 'Lifestyle',
      title: 'Sampriti Cultural team is ready to rock on the stage',
      img: 'https://mdbootstrap.com/img/Photos/Others/img (39).jpg',
      content: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
      by: 'Jessica Clark',
      date: '21/08/2016',
      number: 'Fourth',
    },
    {
      icon: 'fa fa-plane',
      color: 'cyan-text',
      category: 'Travels',
      title: 'Our Venue Umadri Mahal is ready with COVID norms',
      img: './../../assets/images/puja_update/covid_prep.jpg',
      content: `Our puja venue is Umadri Mahal. It has started following Covid norms. The physical setting has already been set up`,
      by: 'Jessica Clark',
      date: '24/08/2016',
      number: 'Second',
    },
    {
      icon: 'fa fa-camera',
      color: 'brown-text',
      category: 'Photography',
      title: 'Our Venue Partner is Umadri Mahal',
      img: './../../assets/images/puja_update/umadri_mahal.jpg',
      content: `Shri Umadri Mahal is an elegant, centrally air-conditioned and 
      newly constructed Mahal on OMR, Sholinganallur, Chennai, with outstanding features and excellent 
      amenities. The Mahal is located bang on the OMR after Infosys Campus and Ponniamman Temple and 
      before TCS in Sholinganallur, Chennai. Built in a sprawling campus of around 1.20 acres, 
      Shri Umadri Mahal is Aesthetically Designed and well suited for Wedding, Family, Corporate and 
      Commercial Functions and Events. We thank Umadri Mahal for alltheir support and help for the puja during this pandemic situation.`,
      by: 'Jessica Clark',
      date: '21/08/2016',
      number: 'Third',
    },
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
