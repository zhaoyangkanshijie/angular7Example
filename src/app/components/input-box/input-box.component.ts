import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {

  private canSeeSubtitle : String = 'not-visible';
  private inputClass : String = '';
  private changeType : String = 'text';
  private val : String = '';
  private canSubmit : boolean = false;
  private info : String = '';

  @Input()
  subtitle : String = '';
  @Input()
  inputType : String = '';
  @Input()
  inputName: String = '';
  @Input()
  inputValue: String = '';
  @Input()
  disable: Boolean = false;
  @Input()
  readOnly: Boolean = false;
  @Input()
  len: Number;
  @Input()
  patternReg: String = '';
  @Input()
  validTitle: String = '';
  @Input()
  required: String = '';
  @Input()
  patternInfo = [];
  // @Input()
  // set _val(_val: String) {
  //   this.val = _val.trim();
  // }
  // get _val(): String {
  //   return this.val.trim();
  // }

  @Output()
  beforeFocus = new EventEmitter<String>();
  @Output()
  focused = new EventEmitter<String>();
  @Output()
  beforeBlur = new EventEmitter<String>();
  @Output()
  blured = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // changes.prop contains the old and the new value...
    // changes.aaa.currentValue/previousValue
    //console.log(changes)
  }

  valtrim(e){
    this.val = e.trim();
  }

  focusAction(){
    this.beforeFocus.emit("beforeFocus");
    if(!this.readOnly){
      this.inputClass = 'focus';
      this.canSeeSubtitle = '';
      this.info = '';
    }
    this.focused.emit("focused");
  }

  blurAction(){
    this.beforeBlur.emit("beforeBlur");
    this.inputClass = '';
      if(this.val == ''){
        this.canSeeSubtitle = 'not-visible';
        if(this.required != ''){
          this.inputClass = 'error';
          this.info = this.required;
        }
      }
      this.validation();
      // 通知父组件是否有错误
      if(this.inputClass == 'error'){
        this.canSubmit = false;
      }
      else{
        this.canSubmit = true;
      }
    this.blured.emit("blured");
  }

  validation() {
    // 循环匹配每项规则是否正确
    if(this.patternInfo != null){
      for(let i = 0;i < this.patternInfo.length;i++){
        // 匹配到正则表达式，则显示错误
        if(typeof this.patternInfo[i].pattern == 'object'){
          if(!this.patternInfo[i].pattern.test(this.val)){
            this.inputClass = 'error';
            this.info = this.patternInfo[i].info;
            break;
          }
        }
        // 匹配到字符串是否相等，决定显示错误
        else if(typeof this.patternInfo[i].pattern == 'string'){
          if(this.patternInfo[i].option){
            //相等显示错误
            if(this.patternInfo[i].option == '='){
              if(this.val == this.patternInfo[i].pattern){
                this.inputClass = 'error';
                this.info = this.patternInfo[i].info;
                break;
              }
            }
            //不等显示错误
            else{
              if(this.val != this.patternInfo[i].pattern){
                this.inputClass = 'error';
                this.info = this.patternInfo[i].info;
                break;
              }
            }
          }
          //默认不等显示错误
          else{
            if(this.val != this.patternInfo[i].pattern){
              this.inputClass = 'error';
              this.info = this.patternInfo[i].info;
              break;
            }
          }
        }
        // 匹配到长度，决定显示错误
        else if(typeof this.patternInfo[i].pattern == 'number'){
          if(this.patternInfo[i].option){
            //大于指定长度
            if(this.patternInfo[i].option == '>'){
              if(this.val.length > this.patternInfo[i].pattern){
                this.inputClass = 'error';
                this.info = this.patternInfo[i].info;
                break;
              }
            }
            //等于指定长度
            else if(this.patternInfo[i].option == '='){
              if(this.val.length == this.patternInfo[i].pattern){
                this.inputClass = 'error';
                this.info = this.patternInfo[i].info;
                break;
              }
            }
            //小于指定长度
            else{
              if(this.val.length < this.patternInfo[i].pattern){
                this.inputClass = 'error';
                this.info = this.patternInfo[i].info;
                break;
              }
            }
          }
          //默认小于指定长度
          else{
            if(this.val.length < this.patternInfo[i].pattern){
              this.inputClass = 'error';
              this.info = this.patternInfo[i].info;
              break;
            }
          }
        }
        // 匹配到是否显示错误
        else if(typeof this.patternInfo[i].pattern == 'boolean'){
          if(this.patternInfo[i].pattern){
            this.inputClass = 'error';
            this.info = this.patternInfo[i].info;
            break;
          }
        }
        // 其余均显示错误
        else {
          this.inputClass = 'error';
          this.info = this.patternInfo[i].info;
          break;
        }
      }
    }
  }

  getVal() {
    return this.val.trim();
  }

  getSubmitStatus() {
    return this.canSubmit;
  }

  showServerInfo(serverInfo) {
    if(serverInfo != ''){
      this.inputClass = 'error';
      this.info = serverInfo;
    }
  }

}
