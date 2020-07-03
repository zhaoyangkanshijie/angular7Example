import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'radio-box',
  templateUrl: './radio-box.component.html',
  styleUrls: ['./radio-box.component.scss']
})
export class RadioBoxComponent implements OnInit {

  public option = [];
  public hint : string = "";
  public showHint : boolean = false;
  public currentOption : number = -1;
  public submitStatus : boolean = false;

  @Input()
  defaultIndex: number = -1;
  @Input()
  defaultHint : string = '';
  @Input()
  InitOption = [];

  constructor() { }

  ngOnInit() {
    this.currentOption =  this.defaultIndex;
    this.hint =  this.defaultHint;
    this.option =  this.InitOption;
  }

  getVal(): string {
    return this.option[this.currentOption].detail;
  }

  getHint(): string {
    return this.hint;
  }

  selectItem(index: number): void{
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
  
  getSubmitStatus(): boolean {
    return this.submitStatus;
  }

  showServerInfo(serverInfo: string): void {
    this.showHint = true;
    this.hint = serverInfo;
  }

  setVal(value: string): void{
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
