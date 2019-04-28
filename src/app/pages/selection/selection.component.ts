import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

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
