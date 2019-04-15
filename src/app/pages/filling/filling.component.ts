import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'filling',
  templateUrl: './filling.component.html',
  styleUrls: ['./filling.component.scss']
})
export class FillingComponent implements OnInit {

  public option = [
    {
      detail : '2019-01-23',
      status : false
    },
    {
      detail : '2020-04-05',
      status : false
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
