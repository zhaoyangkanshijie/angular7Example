import { Component, OnInit, Input, Output, EventEmitter,SimpleChange } from '@angular/core';

@Component({
  selector: 'select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {

  public word : string = '';
  public hint : string = '';
  public showHint : boolean = false;
  public optionOpen : boolean = false;
  public disabled : boolean = false;
  public option = [];
  public currentOption : number = -1;
  public submitStatus : boolean = false;

  @Input()
  time : boolean = false;
  @Input()
  defaultWord : string = '';
  @Input()
  defaultCheckboxValue : string = '';
  @Input()
  defaultHint : string = '';
  @Input()
  InitOption = [];
  @Input()
  defaultIndex : number = -1;

  @Output()
  selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.initial();
  }

  initial() {
    this.word = this.defaultWord;
    this.hint = this.defaultHint;
    this.option = this.InitOption;
    this.currentOption = -1;
    this.submitStatus = false;
    this.showHint = false;
    this.selectItem(-1);
    if(this.defaultIndex != -1){
      this.currentOption = this.defaultIndex;
      this.option[this.currentOption].status = true;
      this.word = this.option[this.currentOption].detail;
      this.submitStatus = true;
    }
  }

  ngAfterViewChecked(){
    //console.log("check:",this.InitOption)
    //this.option = this.InitOption;
  }

  ngOnChanges(changes: SimpleChange){
    //console.log(changes)
    this.initial();
  }

  boxClick(): void{
    if(this.disabled){
      this.optionOpen=false;
    }
    else{
      this.optionOpen=!this.optionOpen;
    }
    this.showHint=false;
  }

  selectItem(index: number): void{
    for(let i = 0;i < this.option.length;i++){
      if(i == index){
        this.option[i].status = true;
        this.currentOption = index;
        this.word = this.option[i].detail;
        this.submitStatus = true;
        this.selected.emit("selected");
      }
      else{
        this.option[i].status = false;
      }
    }
    this.optionOpen = false;
  }

  checkClick(): void {
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

  getShowVal(): string {
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

  getVal(): string {
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

  getHint(): string {
    return this.hint;
  }

  getSubmitStatus(): boolean {
    return this.submitStatus;
  }

  showServerInfo(serverHint: string): void {
    this.showHint = true;
    this.hint = serverHint;
  }

  hideOption(): void {
    this.optionOpen = false;
  }

  setOption(option): void{
    this.initial();
    this.option = option;
  }

  setVal(value: string): void{
    if(this.time && value == this.defaultCheckboxValue){
      this.disabled = true;
      this.word = value;
      this.submitStatus = true;
    }
    else{
      let index = -1;
      for(let i = 0;i < this.option.length;i++){
        this.option[i].status = false;
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
