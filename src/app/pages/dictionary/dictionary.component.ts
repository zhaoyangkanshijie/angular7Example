import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  public name1 = {
    value: '',
    placeholder: '姓名',
    patternInfo: []
  }
  public phone1 = {
    value: '',
    placeholder: '电话',
    patternInfo: []
  }

  public name2 = {
    value: '',
    placeholder: '姓名',
    patternInfo: []
  }
  public phone2 = {
    word: '请选择',
    optionOpen: false,
    currentOption: -1,
    option: [
      {
        detail : '12345678901',
        status : false
      },
      {
        detail : '12345678902',
        status : false
      }
    ]
  }

  public name3 = {
    word: '请选择',
    optionOpen: false,
    currentOption: -1,
    option: [
      {
        detail : 'aaa',
        status : false
      },
      {
        detail : 'bbb',
        status : false
      }
    ]
  }
  public phone3 = {
    value: '',
    placeholder: '电话',
    patternInfo: []
  }

  public name4 = {
    word: '请选择',
    optionOpen: false,
    currentOption: -1,
    option: [
      {
        detail : '12345678901',
        status : false
      },
      {
        detail : '12345678902',
        status : false
      }
    ]
  }
  public phone4 = {
    word: '请选择',
    optionOpen: false,
    currentOption: -1,
    option: [
      {
        detail : '12345678903',
        status : false
      },
      {
        detail : '12345678904',
        status : false
      }
    ]
  }
  
  @ViewChild("child1") child1;
  @ViewChild("child2") child2;
  @ViewChild("child3") child3;
  @ViewChild("child4") child4;
  
  constructor() { }

  ngOnInit() {
  }

  

  showServerInfo(msg){
    this.child1.showServerInfo(msg);
    this.child2.showServerInfo(msg);
    this.child3.showServerInfo(msg);
    this.child4.showServerInfo(msg);
  }

}
