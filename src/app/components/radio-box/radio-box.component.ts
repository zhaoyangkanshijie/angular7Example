import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'radio-box',
  templateUrl: './radio-box.component.html',
  styleUrls: ['./radio-box.component.scss']
})
export class RadioBoxComponent implements OnInit {

  private option = [];
  private hint : String = "";
  private showHint : boolean = false;
  private currentOption : number = -1;
  private submitStatus : boolean = false;

  @Input()
  defaultIndex: number = -1;
  @Input()
  defaultHint : String = '';
  @Input()
  InitOption = [];

  constructor() { }

  ngOnInit() {
    this.currentOption =  this.defaultIndex;
    this.hint =  this.defaultHint;
    this.option =  this.InitOption;
  }

  getVal() {
    return this.option[this.currentOption].detail;
  }

  getHint() {
    return this.hint;
  }

  selectItem(index){
    for(let i = 0;i < this.option.length;i++){
      if(i == index){
        this.option[i].status = true;
        this.currentOption = index;
        this.submitStatus = true;
      }
      else{
        this.option[i].status = false;
      }
    }
    this.showHint = false;
  }
  
  getSubmitStatus() {
    return this.submitStatus;
  }

  showServerInfo(serverInfo) {
    this.showHint = true;
    this.hint = serverInfo;
  }

  setVal(value){
    let index = -1;
    for(let i = 0;i < this.option.length;i++){
      if(value == this.option[i].detail){
        index = i;
      }
    }
    if(index != -1){
      this.currentOption = index;
      this.option[this.currentOption].status = true;
      this.submitStatus = true;
    }
    else{
      this.submitStatus = false;
    }
  }

}
