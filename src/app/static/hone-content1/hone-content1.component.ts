import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hone-content1',
  templateUrl: './hone-content1.component.html',
  styleUrls: ['./hone-content1.component.scss']
})
export class HoneContent1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openWindow() {
    window.open('https://www.facebook.com/ShriUmadriMahalOMR/', '_blank');
  }

  openWindow1()
  {
    window.open('https://www.facebook.com/hashtag/sampritidurgostav2020', '_blank');
  }


}
