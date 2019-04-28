import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  private hint : String = '';
  private showHint : boolean = false;
  private val : String = '';
  private year = [];
  private month = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
  private week = ["日","一","二","三","四","五","六"];
  private day = new Array(42);
  private selectedYear : number = -1;
  private selectedMonth : number = -1;
  private selectedDay : number = -1;
  private yearOpen : boolean = false;
  private monthOpen : boolean = false;
  private dayOpen : boolean = false;
  private yearOffsetTop : string = '0px';
  private monthOffsetTop : string = '0px';
  private disabled : boolean = false;
  private submitStatus : boolean = false;

  @Input()
  toNow : boolean = false;
  @Input()
  startYear : number;
  @Input()
  endYear : number;
  @Input()
  defaultCheckboxValue : String = '';
  @Input()
  defaultValue: String = '';
  @Input()
  defaultHint : String = '';

  constructor() { }

  ngOnInit() {
    this.val = this.defaultValue.trim();
    this.hint = this.defaultHint;
    this.fillYear();
  }

  boxClick(){
    if(this.disabled){
      this.yearOpen=false;
    }
    else{
      this.yearOpen=!this.yearOpen;
    }
    this.monthOpen=false;
    this.dayOpen=false;
    this.showHint=false;
  }

  checkClick(){
    this.disabled=!this.disabled;
    if(this.disabled){
      this.val = this.defaultCheckboxValue.trim();
      this.submitStatus = true;
    }
    else if(this.selectedDay > 0){
      this.val = this.selectedYear+'-'+(this.selectedMonth<10?'0'+this.selectedMonth:this.selectedMonth)+'-'+(this.selectedDay<10?'0'+this.selectedDay:this.selectedDay);
      this.submitStatus = true;
    }
    else{
      this.submitStatus = false;
    }
    this.yearOpen=false;
    this.monthOpen=false;
    this.dayOpen=false;
    this.showHint=false;
  }

  yearEnter(){
    this.dayOpen=false;
  }

  yearClass(yearItem){
    return this.selectedYear == yearItem;
  }

  yearClick(yearItem,e){
    if(this.selectedYear != yearItem){
      this.selectedYear = yearItem;
      this.selectedMonth = -1;
      this.selectedDay = -1;
    }
    this.yearOffsetTop = e.target.offsetTop-e.target.parentNode.scrollTop+'px';
    this.monthOpen = true;
  }

  monthEnter(){
    
  }

  monthClass(monthItem){
    return this.selectedMonth == parseInt(monthItem);
  }

  monthClick(monthItem,e){
    if(this.selectedMonth != parseInt(monthItem)){
      this.selectedMonth = parseInt(monthItem);
      this.fillDay();
    }
    this.monthOffsetTop = parseInt(this.yearOffsetTop)+e.target.offsetTop-e.target.parentNode.scrollTop+'px';
    this.dayOpen = true;
  }

  dayClass(dayItem){
    return dayItem.canSelect && dayItem.dayNumber == this.selectedDay;
  }

  dayClick(dayItem){
    if(this.selectedDay != dayItem.dayNumber && dayItem.canSelect){
      this.selectedDay = dayItem.dayNumber;
      this.val = dayItem.date;
      this.yearOpen=false;
      this.monthOpen=false;
      this.dayOpen=false;
    }
  }

  fillYear(){
    for(let i = this.startYear;i <= this.endYear;i++){
      this.year.push(i);
    }
  }

  fillDay(){
    let nowDate = this.selectedYear+'-'+this.selectedMonth+'-01';
    let offset = this.getDay(nowDate);
    let now = 1;
    nowDate = this.getNextDate(nowDate,-1);
    for(let i = offset;i < offset+this.getMonthNumber();i++){
      let dayObj = {
        date : this.getNextDate(nowDate,now),
        dayNumber : now,
        canSelect : true
      };
      this.day[i] = dayObj;
      now++;
    }
    nowDate = this.getNextDate(nowDate,1);
    for(let j = offset-1;j >= 0;j--){
      let jdate = this.getNextDate(nowDate,j-offset);
      let dayObj = {
        date : jdate,
        dayNumber : jdate.slice(-2),
        canSelect : false
      };
      this.day[j] = dayObj;
    }
    nowDate = this.getNextDate(nowDate,this.getMonthNumber()-1);
    now=1;
    for(let k = offset+this.getMonthNumber();k < 42;k++){
      let dayObj = {
        date : this.getNextDate(nowDate,now),
        dayNumber : now,
        canSelect : false
      };
      this.day[k] = dayObj;
      now++;
    }
  }

  setYear(year){
    this.selectedYear = year;
  }

  setMonth(month){
    this.selectedMonth = month;
  }

  setDay(day){
    this.selectedDay = day;
  }

  // 根据给定日期算出星期
  getDay(date){
    return new Date(date).getDay();
  }

  // 获取某月的天数
  getMonthNumber(){
    let d = new Date(this.selectedYear,this.selectedMonth,0);
    let num = d.getDate();
    return num;
  }

  // 获取某一天的昨天和明天
  // date 代表指定的日期，格式：2018-09-27
  // day 传-1表始前一天，传1表始后一天
  getNextDate(date,day) {  
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
  }

  // 获取日历中某一天的昨天和明天的数字
  getNextDayNumber(date,day){
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    var d = dd.getDate();
    return d;
  }

  getVal() {
    return this.val.trim();
  }

  getSubmitState() {
    return this.submitStatus;
  }

  showServerInfo(serverInfo) {
    this.showHint = true;
    this.hint = serverInfo;
  }

}
