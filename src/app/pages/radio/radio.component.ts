import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  public a = [
    {
      detail : 'aaa',
      status : false
    },
    {
      detail : 'bbb',
      status : false
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
