import { Component, OnInit } from '@angular/core';
import Zone from '../../modules/zone.module';
import Ethnic from '../../modules/ethnic.module';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public myEthnic: Ethnic;
  public myZone: Zone;

  constructor(private ethnic: Ethnic,private zone: Zone) {
    this.myEthnic = ethnic;
    this.myZone = zone;
    console.log(this.myEthnic,this.myZone,this.myZone.getAllProvince());
  }

  ngOnInit() {
  }

}
