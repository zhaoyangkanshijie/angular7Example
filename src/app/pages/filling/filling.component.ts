import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'filling',
  templateUrl: './filling.component.html',
  styleUrls: ['./filling.component.scss']
})
export class FillingComponent implements OnInit {

  public option = [
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
