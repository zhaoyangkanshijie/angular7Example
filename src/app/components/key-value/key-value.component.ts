import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'key-value',
  templateUrl: './key-value.component.html',
  styleUrls: ['./key-value.component.scss']
})
export class KeyValueComponent implements OnInit {

  private keyInput : any = {
    value: '',
    placeholder: '',
    patternInfo: []
  };
  private keySelect : any = {
    word: '',
    optionOpen: false,
    currentOption: -1,
    option: []
  };
  private valueInput : any = {
    value: '',
    placeholder: '',
    patternInfo: []
  };
  private valueSelect : any = {
    word: '',
    optionOpen: false,
    currentOption: -1,
    option: []
  };
  private isKeyRequired : Boolean = false;
  private isValueRequired : Boolean = false;
  private hint : String = '';
  private showHint : boolean = false;
  private val : String = '';
  private submitStatus : boolean = false;

  @Input()
  keyType : String = 'input';
  @Input()
  valueType : String = 'input';
  @Input()
  keyObject : any = {};
  @Input()
  valueObject : any = {};
  @Input()
  defaultKeyRequired : Boolean = false;
  @Input()
  defaultValueRequired : Boolean = false;
  @Input()
  defaultHint : String = '';

  constructor() { }

  ngOnInit() {
    this.initFillData();
    this.hint = this.defaultHint;
  }

  initFillData() {
    if(this.keyType == 'input'){
      this.keyInput = this.keyObject;
    }
    else{
      this.keySelect = this.keyObject;
    }
    if(this.valueType == 'input'){
      this.valueInput = this.valueObject;
    }
    else{
      this.valueSelect = this.valueObject;
    }
    this.isKeyRequired = this.defaultKeyRequired;
    this.isValueRequired = this.defaultValueRequired;
  }

  focusAction(){
    this.showHint = false;
  }

  blurAction(isKey){
    let patternInfo = [];
    if(isKey){
      patternInfo = this.keyInput.patternInfo;
    }
    else{
      patternInfo = this.valueInput.patternInfo;
    }
    // 循环匹配每项规则是否正确
    if(patternInfo != null){
      for(let i = 0;i < patternInfo.length;i++){
        // 匹配到正则表达式，则显示错误
        if(typeof patternInfo[i].pattern == 'object'){
          if(!patternInfo[i].pattern.test(this.val)){
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
              if(this.val == patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
            //不等显示错误
            else{
              if(this.val != patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
          }
          //默认不等显示错误
          else{
            if(this.val != patternInfo[i].pattern){
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
              if(this.val.length > patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
            //等于指定长度
            else if(patternInfo[i].option == '='){
              if(this.val.length == patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
            //小于指定长度
            else{
              if(this.val.length < patternInfo[i].pattern){
                this.showHint = true;
                this.hint = patternInfo[i].info;
                break;
              }
            }
          }
          //默认小于指定长度
          else{
            if(this.val.length < patternInfo[i].pattern){
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

  boxClick(isKey){
    if(isKey){
      this.keySelect.optionOpen = !this.keySelect.optionOpen;
    }
    else{
      this.valueSelect.optionOpen = !this.valueSelect.optionOpen;
    }
    this.showHint = false;
  }

  trimKey(e){
    this.keyInput.value = e.trim();
  }

  trimValue(e){
    this.valueInput.value = e.trim();
  }

  getVal() {
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
      return '(' + val1 + ')' + val2;
    }
  }

  setVal(value){
    let valueSum = value;
    let valueArr = valueSum.replace('(','').split(')');
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
        this.keySelect.word = '';
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
        this.valueSelect.word = '';
      }
    }
  }

  getHint() {
    return this.hint;
  }

  selectItem(index,isKey){
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
  
  getSubmitStatus() {
    if(this.showHint){
      return false;
    }
    else{
      if(this.isKeyRequired){
        if(this.keyType == 'select'){
          if(this.keySelect.currentOption == -1){
            return false;
          }
        }
        else{
          if(this.keyInput.value == ''){
            return false;
          }
        }
      }
      if(this.isValueRequired){
        if(this.valueType == 'select'){
          if(this.valueSelect.currentOption == -1){
            return false;
          }
        }
        else{
          if(this.valueInput.value == ''){
            return false;
          }
        }
      }
    }
    return true;
  }

  showServerInfo(serverInfo) {
    this.showHint = true;
    this.hint = serverInfo;
  }

}
