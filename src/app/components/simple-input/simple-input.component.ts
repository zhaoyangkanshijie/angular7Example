import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss']
})
export class SimpleInputComponent implements OnInit {

  public hint : string = '';
  public showHint : boolean = false;
  public val : string = '';
  public submitStatus : boolean = false;
  public optionList = [];
  public openList : boolean = false;

  @Input()
  defaultWord : string = '';
  @Input()
  inputValue: string = '';
  @Input()
  defaultHint : string = '';
  @Input()
  patternInfo = [];
  @Input()
  optionInfo = [];

  @Output()
  beforeFocus = new EventEmitter<string>();
  @Output()
  focused = new EventEmitter<string>();
  @Output()
  beforeBlur = new EventEmitter<string>();
  @Output()
  blured = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.hint = this.defaultHint;
  }

  focusAction(): void {
    this.beforeFocus.emit("beforeFocus");
    this.showHint = false;
    this.focused.emit("focused");
  }

  blurAction(): void {
    this.beforeBlur.emit("beforeBlur");
    // 循环匹配每项规则是否正确
    if(this.patternInfo != null){
      for(let i = 0;i < this.patternInfo.length;i++){
        // 匹配到正则表达式，则显示错误
        if(typeof this.patternInfo[i].pattern == 'object'){
          if(!this.patternInfo[i].pattern.test(this.val)){
            this.showHint = true;
            this.hint = this.patternInfo[i].info;
            break;
          }
        }
        // 匹配到字符串是否相等，决定显示错误
        else if(typeof this.patternInfo[i].pattern == 'string'){
          if(this.patternInfo[i].option){
            //相等显示错误
            if(this.patternInfo[i].option == '='){
              if(this.val == this.patternInfo[i].pattern){
                this.showHint = true;
                this.hint = this.patternInfo[i].info;
                break;
              }
            }
            //不等显示错误
            else{
              if(this.val != this.patternInfo[i].pattern){
                this.showHint = true;
                this.hint = this.patternInfo[i].info;
                break;
              }
            }
          }
          //默认不等显示错误
          else{
            if(this.val != this.patternInfo[i].pattern){
              this.showHint = true;
              this.hint = this.patternInfo[i].info;
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
                this.showHint = true;
                this.hint = this.patternInfo[i].info;
                break;
              }
            }
            //等于指定长度
            else if(this.patternInfo[i].option == '='){
              if(this.val.length == this.patternInfo[i].pattern){
                this.showHint = true;
                this.hint = this.patternInfo[i].info;
                break;
              }
            }
            //小于指定长度
            else{
              if(this.val.length < this.patternInfo[i].pattern){
                this.showHint = true;
                this.hint = this.patternInfo[i].info;
                break;
              }
            }
          }
          //默认小于指定长度
          else{
            if(this.val.length < this.patternInfo[i].pattern){
              this.showHint = true;
              this.hint = this.patternInfo[i].info;
              break;
            }
          }
        }
        // 匹配到是否显示错误
        else if(typeof this.patternInfo[i].pattern == 'boolean'){
          if(this.patternInfo[i].pattern){
            this.showHint = true;
            this.hint = this.patternInfo[i].info;
            break;
          }
        }
        // 其余均显示错误
        else {
          this.showHint = true;
          this.hint = this.patternInfo[i].info;
          break;
        }
      }
    }
    if(this.showHint){
      this.submitStatus = false;
    }
    this.blured.emit("blured");
  }

  valtrim(e: string): void {
    this.val = e.trim();
  }

  getHint(): string {
    return this.hint;
  }

  getVal(): string {
    return this.val.trim();
  }

  getSubmitStatus(): boolean {
    this.blurAction();
    if(!this.showHint){
      this.submitStatus = true;
    }
    else{
      this.submitStatus = false;
    }
    return this.submitStatus;
  }

  showServerInfo(serverInfo: string): void {
    this.showHint = true;
    this.hint = serverInfo;
  }

  setVal(value: string): void{
    this.val = value;
    this.submitStatus = true;
  }

  showList(): void {
    this.optionList = this.optionInfo.filter((value,index,arr)=>{
      return value.Name.indexOf(this.val) > -1;
    });
    this.openList = true;
  }

  setItem(e): void {
    if(e.target.nodeName === "P"){
      this.val = e.target.innerHTML;
      this.openList = false;
    }
    this.focusAction();
  }

}
