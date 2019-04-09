import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'style-pipe',
  templateUrl: './style-pipe.component.html',
  styleUrls: ['./style-pipe.component.scss']
})
export class StylePipeComponent implements OnInit {

  public value : String = "Hello <span style=\"color: #0096FF;\">World</span>"

  constructor() { }

  ngOnInit() {
  }

}
