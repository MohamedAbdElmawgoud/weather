import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  slides = [
    {
      img: 'assets/img/1.jpeg',
      titulo: 'Weather patterns and air pressure'
    },
    {
      img: 'assets/img/2.jpeg',
      titulo: 'weather is cold and unpleasant'
    },
    {
      img: 'assets/img/3.jpeg',
      titulo: ' weather is very unpleasant, with rain, snow, or wind'
    },
    {
      img: 'assets/img/4.jpeg',
      titulo: 'weather is very strong or severe'
    }
  ];

  constructor() {}

}
