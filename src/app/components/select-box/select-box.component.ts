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
  private option = [];
  private currentOption : number = -1;

  @Input()
  defaultWord : String = '';
  @Input()
  defaultHint : String = '';
  @Input()
  InitOption = [];

  constructor() { }

  ngOnInit() {
    this.word = this.defaultWord;
    this.hint = this.defaultHint;
    this.option = this.InitOption;
  }

  selectItem(index){
    for(let i = 0;i < this.option.length;i++){
      if(i == index){
        this.option[i].status = true;
        this.currentOption = index;
        this.word = this.option[i].detail;
      }
      else{
        this.option[i].status = false;
      }
    }
    this.optionOpen = false;
  }

  getVal() {
    for(let i = 0;i < this.option.length;i++){
      if(this.option[i].status){
        return this.option[i].detail;
      }
    }
  }

  showServerHint(serverHint) {
    this.showHint = true;
    this.hint = serverHint;
  }

  hideOption(){
    this.optionOpen = false;
  }

}
