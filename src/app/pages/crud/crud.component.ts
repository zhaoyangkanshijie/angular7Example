import { Component, OnInit, ViewChildren, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  public data = [];
  public status = [];

  @ViewChildren('children') children;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  add(){
    this.data.push('');
    this.status.push(0);
  }
  save(i){
    this.cd.detectChanges();//手动脏检查，使视图即时变化
    let childrenIndex = this.indexOfN(this.status,i);
    let flag = true;
    if(this.children._results[childrenIndex].getSubmitStatus()){
      this.data[i] = this.children._results[childrenIndex].getVal();
    }
    else{
      flag = false;
      this.children._results[childrenIndex].showServerInfo(this.children._results[childrenIndex].getHint());
    }
    if(flag){
      this.status.splice(i,1,1);
      //此处可发送请求与服务器同步数据
    }
    else{
      this.status.splice(i,1,0);
    }
  }
  edit(i){
    this.status.splice(i,1,0);
    this.cd.detectChanges();
    let childrenIndex = this.indexOfN(this.status,i);
    this.children._results[childrenIndex].setVal(this.data[i]);
  }
  delete(i){
    this.data.splice(i,1);
    this.status.splice(i,1);
  }

  //受显示和隐藏影响，viewchilren数组并非和data、status数组的数据一一对应，因此需要找出它们的对应关系
  indexOfN(arr,index){
    let count = -1;
    arr.slice(0,index+1).forEach(item => {
      if(item == arr[index]){
        count++;
      }
    });
    return count;
  }

  //适用于编辑dateSelector
  formatEditDate(dateString){
    if(dateString == "至今"){
      return "至今";
    }
    else{
      let date = dateString;
      let dateArray = date.split(/[年月日]/).filter(d=>d).map(Number);
      return dateArray[0]+'-'+dateArray[1]+'-'+dateArray[2];
    }
  }

  //适用于保存dateSelector
  formatSaveDate(dateString){
    if(dateString == "至今"){
      return "至今";
    }
    else{
      let date = dateString;
      let dateArray = date.split('-');
      return dateArray[0]+'年'+dateArray[1]+'月'+dateArray[2]+'日';
    }
  }

  //如果data里面的数据为对象，可预定义空对象模板，然后深克隆添加数据
  deepClone(obj) {
    let copy;
    
    if (obj === null || typeof obj !== 'object'){
      return obj;
    }
    
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepClone(obj[i]);
      }
      return copy;
    }
    
    if (obj instanceof Function) {
      copy = function() {
        return obj.apply(this, this.arguemnts);
      }
      return copy;
    }
    
    if (obj instanceof Object) {
      copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)){ 
          copy[attr] = this.deepClone(obj[attr]);
        }
      }
      return copy;
    }
  }

}
