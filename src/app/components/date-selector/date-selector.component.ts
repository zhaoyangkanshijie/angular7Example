import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  public hint : string = '';
  public showHint : boolean = false;
  public val : string = '';
  public year = [];
  public month = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
  public week = ["日","一","二","三","四","五","六"];
  public day = new Array(42);
  public selectedYear : number = -1;
  public selectedMonth : number = -1;
  public selectedDay : number = -1;
  public yearOpen : boolean = false;
  public monthOpen : boolean = false;
  public dayOpen : boolean = false;
  public yearOffsetTop : string = '0px';
  public monthOffsetTop : string = '0px';
  public disabled : boolean = false;
  public submitStatus : boolean = false;
  public timer = null;
  public timeout : number = 0;

  @Input()
  toNow : boolean = false;
  @Input()
  startYear : number;
  @Input()
  endYear : number;
  @Input()
  defaultCheckboxValue : string = '';
  @Input()
  defaultValue: string = '';
  @Input()
  defaultHint : string = '';
  @Input()
  hoverTime : number = 0;

  @Output()
  selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.val = this.defaultValue.trim();
    this.hint = this.defaultHint;
    this.timeout = this.hoverTime;
    this.fillYear();
  }

  boxClick(): void {
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

  checkClick(): void {
    this.disabled = !this.disabled;
    if(this.disabled){
      this.val = this.defaultCheckboxValue.trim();
      this.submitStatus = true;
      this.selected.emit("selected");
    }
    else if(this.selectedDay > 0){
      this.val = this.selectedYear+'-'+(this.selectedMonth<10?'0'+this.selectedMonth:this.selectedMonth)+'-'+(this.selectedDay<10?'0'+this.selectedDay:this.selectedDay);
      this.submitStatus = true;
      this.selected.emit("selected");
    }
    else{
      this.val = this.defaultValue.trim();
      this.submitStatus = false;
    }
    this.yearOpen=false;
    this.monthOpen=false;
    this.dayOpen=false;
    this.showHint=false;
  }

  mouseEnterProxy(time,item,e): void {
    if(this.timer){
      this.clearTimer();
    }
    if(this.timeout == 0){
      time == 'year' ? this.yearClick(item,e) : this.monthClick(item,e);
    }
    else{
      this.timer = setTimeout(() => {
        time == 'year' ? this.yearClick(item,e) : this.monthClick(item,e);
      }, this.timeout);
    }
  }

  clearTimer(): void {
    clearTimeout(this.timer);
    this.timer = null;
  }

  yearEnter(): void {
    this.dayOpen=false;
  }

  yearClass(yearItem): boolean {
    return this.selectedYear == yearItem;
  }

  yearClick(yearItem,e): void {
    if(this.selectedYear != yearItem){
      this.selectedYear = yearItem;
      this.selectedMonth = -1;
      this.selectedDay = -1;
    }
    this.yearOffsetTop = e.target.offsetTop-e.target.parentNode.scrollTop+'px';
    this.monthOpen = true;
  }

  monthEnter(): void {
    
  }

  monthClass(monthItem): boolean{
    return this.selectedMonth == parseInt(monthItem);
  }

  monthClick(monthItem,e): void {
    if(this.selectedMonth != parseInt(monthItem)){
      this.selectedMonth = parseInt(monthItem);
      this.fillDay();
    }
    this.monthOffsetTop = parseInt(this.yearOffsetTop)+e.target.offsetTop-e.target.parentNode.scrollTop+'px';
    this.dayOpen = true;
  }

  dayClass(dayItem): boolean {
    return dayItem.canSelect && dayItem.dayNumber == this.selectedDay;
  }

  dayClick(dayItem): void{
    if(this.selectedDay != dayItem.dayNumber && dayItem.canSelect){
      this.selectedDay = dayItem.dayNumber;
      this.val = dayItem.date;
      this.yearOpen=false;
      this.monthOpen=false;
      this.dayOpen=false;
      this.submitStatus = true;
      this.selected.emit("selected");
    }
  }

  fillYear(): void {
    for(let i = this.startYear;i <= this.endYear;i++){
      this.year.push(i);
    }
  }

  fillDay(): void {
    let nowDate;
    //兼容ie
    if(this.selectedMonth < 10){
      nowDate = this.selectedYear+'-0'+this.selectedMonth+'-01';
    }
    else{
      nowDate = this.selectedYear+'-'+this.selectedMonth+'-01';
    }
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

  setYear(year: number): void {
    this.selectedYear = year;
  }

  setMonth(month: number): void {
    this.selectedMonth = month;
  }

  setDay(day: number): void {
    this.selectedDay = day;
  }

  // 根据给定日期算出星期几
  getDay(date: number): number {
    return new Date(date).getDay();
  }

  // 获取某月的天数
  getMonthNumber(): number {
    let d = new Date(this.selectedYear,this.selectedMonth,0);
    let num = d.getDate();
    return num;
  }

  // 获取某一天的昨天和明天
  // date 代表指定的日期，格式：2018-09-27
  // day 传-1表始前一天，传1表始后一天
  getNextDate(date: number, day: number): string {  
    let dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    let d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
  }

  // 获取日历中某一天的昨天和明天的数字
  getNextDayNumber(date: number, day: number): number {
    let dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    let d = dd.getDate();
    return d;
  }

  getVal(): string {
    //this.val = this.selectedYear+'年'+this.selectedMonth+'月'+this.selectedDay+'日';
    //return this.selectedYear+'年'+this.selectedMonth+'月'+this.selectedDay+'日';
    return this.val.trim();
  }

  getHint(): string {
    return this.hint;
  }

  getSubmitStatus(): boolean {
    return this.submitStatus;
  }

  showServerInfo(serverInfo: string): void {
    this.showHint = true;
    this.hint = serverInfo;
  }

  clearServerInfo(): void {
    this.showHint = false;
  }

  setVal(value: string): void {
    if(value == "至今"){
      this.val = value;
      this.disabled = true;
      this.submitStatus = true;
    }
    else{
      let date = new Date(value);
      if(date.toString() == "Invalid Date"){
        if(value.includes("年")&&value.includes("月")&&value.includes("日")){
          let arr = value.split(/[年月日]/).filter(d=>d).map(Number);
          if(arr.length == 3 && typeof arr[0] == 'number' && typeof arr[1] == 'number' && typeof arr[2] == 'number' && arr[0] >= this.startYear && arr[0] <= this.endYear){
            this.selectedYear = arr[0];
            this.selectedMonth = arr[1];
            this.selectedDay = arr[2];
            this.fillDay();
            this.val = arr[0] + '-' + (arr[1] < 10 ? '0' + arr[1].toString() : arr[1].toString()) + '-' + (arr[2] < 10 ? '0' + arr[2].toString() : arr[2].toString());
            //this.val = arr[0] + '-' + arr[1].toString().padStart(2, '0') + '-' + arr[2].toString().padStart(2, '0');
            this.submitStatus = true;
          }
          else{
            this.submitStatus = false;
          }
        }
        else if(value.includes("-")){
          let arr = value.split("-").filter(d=>d).map(Number);
          if(arr.length == 3 && typeof arr[0] == 'number' && typeof arr[1] == 'number' && typeof arr[2] == 'number' && arr[0] >= this.startYear && arr[0] <= this.endYear){
            this.selectedYear = arr[0];
            this.selectedMonth = arr[1];
            this.selectedDay = arr[2];
            this.fillDay();
            this.val = arr[0] + '-' + (arr[1] < 10 ? '0' + arr[1].toString() : arr[1].toString()) + '-' + (arr[2] < 10 ? '0' + arr[2].toString() : arr[2].toString());
            this.submitStatus = true;
          }
          else{
            this.submitStatus = false;
          }
        }
        else{
          this.submitStatus = false;
        }
      }
      else{
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        this.selectedYear = year;
        this.selectedMonth = month;
        this.selectedDay = day;
        this.fillDay();
        this.val = year + '-' + (month < 10 ? '0' + month.toString() : month.toString()) + '-' + (day < 10 ? '0' + day.toString() : day.toString());
        //this.val = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
        this.submitStatus = true;
      }
    }
  }

}
