import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {

  private word : String = '';
  private hint : String = '';
  private showHint : boolean = false;
  private optionOpen : boolean = false;
  private disabled : boolean = false;
  private option = [];
  private currentOption : number = -1;
  private submitStatus : boolean = false;

  @Input()
  time : boolean = false;
  @Input()
  defaultWord : String = '';
  @Input()
  defaultCheckboxValue : String = '';
  @Input()
  defaultHint : String = '';
  @Input()
  InitOption = [];
  @Input()
  defaultIndex : number = -1;

  constructor() { }

  ngOnInit() {
    this.word = this.defaultWord;
    this.hint = this.defaultHint;
    this.option = this.InitOption;
    if(this.defaultIndex != -1){
      this.currentOption = this.defaultIndex;
      this.option[this.currentOption].status = true;
      this.word = this.option[this.currentOption].detail;
      this.submitStatus = true;
    }
  }

  boxClick(){
    if(this.disabled){
      this.optionOpen=false;
    }
    else{
      this.optionOpen=!this.optionOpen;
    }
    this.showHint=false;
  }

  selectItem(index){
    for(let i = 0;i < this.option.length;i++){
      if(i == index){
        this.option[i].status = true;
        this.currentOption = index;
        this.word = this.option[i].detail;
        this.submitStatus = true;
      }
      else{
        this.option[i].status = false;
      }
    }
    this.optionOpen = false;
  }

  checkClick(){
    this.disabled=!this.disabled;
    if(this.disabled){
      this.submitStatus = true;
    }
    else if(this.currentOption != -1){
      this.submitStatus = true;
    }
    else{
      this.submitStatus = false;
    }
    this.optionOpen=false;
  }

  getShowVal() {
    if(this.disabled){
      return this.defaultCheckboxValue;
    }
    else if(this.currentOption != -1){
      return this.option[this.currentOption].detail;
    }
    else{
      return this.defaultWord;
    }
  }

  getVal() {
    if(this.disabled){
      return this.defaultCheckboxValue;
    }
    else if(this.currentOption != -1){
      return this.option[this.currentOption].detail;
    }
    else{
      return "";
    }
  }

  getHint() {
    return this.hint;
  }

  getSubmitStatus(){
    return this.submitStatus;
  }

  showServerInfo(serverHint) {
    this.showHint = true;
    this.hint = serverHint;
  }

  hideOption(){
    this.optionOpen = false;
  }

  setVal(value){
    if(this.time && value == this.defaultCheckboxValue){
      this.disabled = true;
      this.word = value;
      this.submitStatus = true;
    }
    else{
      let index = -1;
      for(let i = 0;i < this.option.length;i++){
        if(value == this.option[i].detail){
          index = i;
        }
      }
      if(index != -1){
        this.currentOption = index;
        this.option[this.currentOption].status = true;
        this.word = this.option[this.currentOption].detail;
        this.submitStatus = true;
      }
      else{
        this.submitStatus = false;
      }
    }
  }

}
