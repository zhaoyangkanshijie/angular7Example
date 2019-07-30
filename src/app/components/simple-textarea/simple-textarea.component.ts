import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'simple-textarea',
  templateUrl: './simple-textarea.component.html',
  styleUrls: ['./simple-textarea.component.scss']
})
export class SimpleTextareaComponent implements OnInit {

  private hint : String = '';
  private showHint : boolean = false;
  private val : String = '';
  private len : number = 0;
  private submitStatus : boolean = false;

  @Input()
  inputValue: String = '';
  @Input()
  placeholder: String = '';
  @Input()
  limit: number = 200;
  @Input()
  require: boolean = false;
  @Input()
  defaultHint : String = '';

  constructor() { }

  ngOnInit() {
    this.hint = this.defaultHint;
    this.val = this.inputValue;
    this.len = this.val.length;
  }

  focusAction() {
    this.showHint = false;
    this.len = this.val.length;
  }

  blurAction() {
    if((this.val != "" || (!this.require && this.val == "")) && !this.showHint){
      this.submitStatus = true;
    }
    else{
      this.showHint = true;
      this.submitStatus = false;
    }
  }

  valsubstr(e) {
    this.val = e.substring(0, this.limit);
    this.len = this.val.length;
  }

  getVal() {
    return this.val.substring(0, this.limit);
  }

  setVal(value){
    this.val = value;
    this.submitStatus = true;
  }

  getHint() {
    return this.hint;
  }

  getSubmitStatus() {
    if(this.val != "" || (!this.require && this.val == "") && !this.showHint){
      this.submitStatus = true;
    }
    else{
      this.submitStatus = false;
    }
    return this.submitStatus;
  }

  showServerInfo(serverInfo) {
    this.showHint = true;
    this.hint = serverInfo;
  }

}
