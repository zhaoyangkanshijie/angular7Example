import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  private hint : String = '';
  private showHint : boolean = false;
  private val : String = '';
  private optionOpen : boolean = false;
  private option = [];
  private currentOption : number = -1;
  private submitStatus : boolean = false;

  @Input()
  defaultWord : String = '';
  @Input()
  defaultValue: String = '';
  @Input()
  defaultHint : String = '';
  @Input()
  InitOption = [];

  constructor() { }

  ngOnInit() {
    this.val = this.defaultValue.trim();
    this.hint = this.defaultHint;
    this.option = this.InitOption;
  }

  boxClick(){
    this.optionOpen=!this.optionOpen;
    this.showHint=false;
  }

  valtrim(e){
    this.val = e.trim();
    if(this.val != ""){
      this.submitStatus = true;
    }
    else{
      this.submitStatus = false;
    }
  }

  getVal() {
    return this.val.trim();
  }

  selectItem(index){
    for(let i = 0;i < this.option.length;i++){
      if(i == index){
        this.option[i].status = true;
        this.currentOption = index;
        this.val = this.option[i].detail;
      }
      else{
        this.option[i].status = false;
      }
    }
    this.optionOpen = false;
  }
  
  getSubmitStatus() {
    return this.submitStatus;
  }

  showServerInfo(serverInfo) {
    this.showHint = true;
    this.hint = serverInfo;
  }

}
