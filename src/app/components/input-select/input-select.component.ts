import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  public hint : string = '';
  public showHint : boolean = false;
  public val : string = '';
  public optionOpen : boolean = false;
  public option = [];
  public currentOption : number = -1;
  public submitStatus : boolean = false;

  @Input()
  defaultWord : string = '';
  @Input()
  defaultValue: string = '';
  @Input()
  defaultHint : string = '';
  @Input()
  InitOption = [];

  constructor() { }

  ngOnInit() {
    this.val = this.defaultValue.trim();
    this.hint = this.defaultHint;
    this.option = this.InitOption;
  }

  boxClick(): void {
    this.optionOpen=!this.optionOpen;
    this.showHint=false;
  }

  valtrim(e): void{
    this.val = e.trim();
    if(this.val != ""){
      this.submitStatus = true;
    }
    else{
      this.submitStatus = false;
    }
  }

  getVal(): string {
    return this.val.trim();
  }

  selectItem(index: number): void {
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
  
  getSubmitStatus(): boolean {
    return this.submitStatus;
  }

  showServerInfo(serverInfo: string): void {
    this.showHint = true;
    this.hint = serverInfo;
  }

}
