import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent implements OnInit {

  public keyInput : any = {
    value: '',
    placeholder: '',
    patternInfo: []
  };
  public keySelect : any = {
    word: '',
    optionOpen: false,
    currentOption: -1,
    option: []
  };
  public valueInput : any = {
    value: '',
    placeholder: '',
    patternInfo: []
  };
  public valueSelect : any = {
    word: '',
    optionOpen: false,
    currentOption: -1,
    option: []
  };
  public isKeyRequired : Boolean = false;
  public isValueRequired : Boolean = false;
  public hint : string = '';
  public showHint : boolean = false;
  public val : string = '';
  public submitStatus : boolean = false;

  @Input()
  keyType : string = 'input';
  @Input()
  valueType : string = 'input';
  @Input()
  keyObject : any = {};
  @Input()
  valueObject : any = {};
  @Input()
  defaultKeyRequired : Boolean = false;
  @Input()
  defaultValueRequired : Boolean = false;
  @Input()
  defaultHint : string = '';

  constructor() { }

  ngOnInit() {
    this.initFillData();
    this.hint = this.defaultHint;
  }

  ngOnChanges(changes: SimpleChange){
    this.initFillData();
    this.hint = this.defaultHint;
  }

  initFillData(): void {
    if(this.keyType == 'input'){
      //this.keyInput = JSON.parse(JSON.stringify(this.keyObject));
      this.keyInput = _.cloneDeep(this.keyObject);
    }
    else{
      //this.keySelect = JSON.parse(JSON.stringify(this.keyObject));
      this.keySelect = _.cloneDeep(this.keyObject);
    }
    if(this.valueType == 'input'){
      //this.valueInput = JSON.parse(JSON.stringify(this.valueObject));
      this.valueInput = _.cloneDeep(this.valueObject);
    }
    else{
      //this.valueSelect = JSON.parse(JSON.stringify(this.valueObject));
      this.valueSelect = _.cloneDeep(this.valueObject);
    }
    this.isKeyRequired = this.defaultKeyRequired;
    this.isValueRequired = this.defaultValueRequired;
  }

  focusAction(): void {
    this.showHint = false;
  }

  blurAction(isKey: boolean): void {
    let patternInfo = [];
    let value = '';
    if(isKey){
      patternInfo = this.keyInput.patternInfo;
      value = this.keyInput.value;
    }
    else{
      patternInfo = this.valueInput.patternInfo;
      value = this.valueInput.value;
    }
    // 循环匹配每项规则是否正确
    if(patternInfo != null){
      for(let i = 0;i < patternInfo.length;i++){
        // 匹配到正则表达式，则显示错误
        if(typeof patternInfo[i].pattern == 'object'){
          if(!patternInfo[i].pattern.test(value)){
            this.showHint = true;
            this.hint = patternInfo[i].info;
            break;
          }
        }
        // 匹配到字符串是否相等，决定显示错误
        else if(typeof patternInfo[i].pattern == 'string'){
          if(patternInfo[i].option){
            //相等显示错误
            if(patternInfo[i].option == '='){
              if(value == patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
            //不等显示错误
            else{
              if(value != patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
          }
          //默认不等显示错误
          else{
            if(value != patternInfo[i].pattern){
              this.showHint = true;
              this.hint = patternInfo[i].info;
              break;
            }
          }
        }
        // 匹配到长度，决定显示错误
        else if(typeof patternInfo[i].pattern == 'number'){
          if(patternInfo[i].option){
            //大于指定长度
            if(patternInfo[i].option == '>'){
              if(value.length > patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
            //等于指定长度
            else if(patternInfo[i].option == '='){
              if(value.length == patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
            //小于指定长度
            else{
              if(value.length < patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
          }
          //默认小于指定长度
          else{
            if(value.length < patternInfo[i].pattern){
              this.showHint = true;
              this.hint = patternInfo[i].info;
              break;
            }
          }
        }
        // 匹配到是否显示错误
        else if(typeof patternInfo[i].pattern == 'boolean'){
          if(patternInfo[i].pattern){
            this.showHint = true;
            this.hint = patternInfo[i].info;
            break;
          }
        }
        // 其余均显示错误
        else {
          this.showHint = true;
          this.hint = patternInfo[i].info;
          break;
        }
      }
    }
    if(this.showHint){
      this.submitStatus = false;
    }
  }

  boxClick(isKey: boolean): void {
    if(isKey){
      this.keySelect.optionOpen = !this.keySelect.optionOpen;
    }
    else{
      this.valueSelect.optionOpen = !this.valueSelect.optionOpen;
    }
    this.showHint = false;
  }

  trimKey(e): void {
    this.keyInput.value = e.trim();
  }

  trimValue(e): void {
    this.valueInput.value = e.trim();
  }

  getVal(): string {
    let val1 = '';
    let val2 = '';
    if(this.keyType == 'input'){
      val1 = this.keyInput.value.trim();
    }
    else{
      if(this.keySelect.word != this.keyObject.word){
        val1 = this.keySelect.word;
      }
    }
    if(this.valueType == 'input'){
      val2 = this.valueInput.value.trim();
    }
    else{
      if(this.valueSelect.word == this.valueObject.word){
        val2 = this.valueSelect.word;
      }
    }
    if(val1 == '' && val2 == ''){
      return '';
    }
    else{
      return val1 + ' ' + val2;
    }
  }

  getKeyVal(): string {
    let val1 = '';
    if(this.keyType == 'input'){
      val1 = this.keyInput.value.trim();
    }
    else{
      if(this.keySelect.word != this.keyObject.word){
        val1 = this.keySelect.word;
      }
    }
    if(val1 == ''){
      return '';
    }
    else{
      return val1;
    }
  }

  getValueVal(): string {
    let val2 = '';
    if(this.valueType == 'input'){
      val2 = this.valueInput.value.trim();
    }
    else{
      if(this.valueSelect.word == this.valueObject.word){
        val2 = this.valueSelect.word;
      }
    }
    if(val2 == ''){
      return '';
    }
    else{
      return val2;
    }
  }

  setVal(value: string): void {
    if(value == ''){
      if(this.keyType == 'input'){
        this.keyInput.value = '';
      }
      else{
        this.keySelect.currentOption = -1;
        this.keySelect.word = this.keyObject.word;
      }

      if(this.valueType == 'input'){
        this.valueInput.value = '';
      }
      else{
        this.valueSelect.currentOption = -1;
        this.valueSelect.word = this.valueObject.word;
      }
    }
    else{
      let valueSum = value;
      let valueArr = valueSum.split(' ');
      let value1 = valueArr[0];
      let value2 = valueArr[1];
      
      if(this.keyType == 'input'){
        this.keyInput.value = value1;
      }
      else{
        let index = -1;
        for(let i = 0;i < this.keySelect.option.length;i++){
          if(value1 == this.keySelect.option[i].detail){
            index = i;
          }
        }
        if(index != -1){
          this.keySelect.currentOption = index;
          this.keySelect.option[this.keySelect.currentOption].status = true;
          this.keySelect.word = this.keySelect.option[this.keySelect.currentOption].detail;
        }
        else{
          this.keySelect.currentOption = -1;
          this.keySelect.word = this.keyObject.word;
        }
      }
  
      if(this.valueType == 'input'){
        this.valueInput.value = value2;
      }
      else{
        let index = -1;
        for(let i = 0;i < this.valueSelect.option.length;i++){
          if(value1 == this.valueSelect.option[i].detail){
            index = i;
          }
        }
        if(index != -1){
          this.valueSelect.currentOption = index;
          this.valueSelect.option[this.valueSelect.currentOption].status = true;
          this.valueSelect.word = this.valueSelect.option[this.valueSelect.currentOption].detail;
        }
        else{
          this.valueSelect.currentOption = -1;
          this.valueSelect.word = this.valueObject.word;
        }
      }
    }
  }

  getHint(): string {
    return this.hint;
  }

  selectItem(index: number ,isKey: boolean): void{
    if(isKey){
      for(let i = 0;i < this.keySelect.option.length;i++){
        if(i == index){
          this.keySelect.option[i].status = true;
          this.keySelect.currentOption = index;
          this.keySelect.word = this.keySelect.option[i].detail;
        }
        else{
          this.keySelect.option[i].status = false;
        }
      }
      this.keySelect.optionOpen = false;
    }
    else{
      for(let i = 0;i < this.valueSelect.option.length;i++){
        if(i == index){
          this.valueSelect.option[i].status = true;
          this.valueSelect.currentOption = index;
          this.valueSelect.word = this.valueSelect.option[i].detail;
        }
        else{
          this.valueSelect.option[i].status = false;
        }
      }
      this.valueSelect.optionOpen = false;
    }
  }
  
  getSubmitStatus(): boolean {
    if(this.showHint){
      return false;
    }
    else{
      if(this.isKeyRequired || this.isValueRequired){
        if(this.getKeyVal() && this.getValueVal()){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        if((!this.getKeyVal() && !this.getValueVal()) || (this.getKeyVal() && this.getValueVal())){
          return true;
        }
        else{
          return false;
        }
      }
    }
  }

  showServerInfo(serverInfo: string): void {
    this.showHint = true;
    this.hint = serverInfo;
  }

}
