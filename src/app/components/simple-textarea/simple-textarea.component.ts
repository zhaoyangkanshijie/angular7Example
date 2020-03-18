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
  defaultHint : String = '';
  @Input()
  patternInfo = [];

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
    this.blurAction();
    if(!this.showHint){
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
