import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  public hint : string = '';
  public showHint : boolean = false;
  public val : string = '';
  public year = [];
  public month = ["1","2","3","4","5","6","7","8","9","10","11","12"];
  public day = [];
  public selectedYear : number = -1;
  public selectedMonth : number = -1;
  public selectedDay : number = -1;
  public yearOpen : boolean = false;
  public monthOpen : boolean = false;
  public dayOpen : boolean = false;
  public showDay : boolean = true;
  public yearWord : string = '选择年份';
  public monthWord : string = '选择月份';
  public dayWord : string = '选择日期';
  public submitStatus : boolean = false;

  @Input()
  startYear : number;
  @Input()
  endYear : number;
  @Input()
  hasDay : boolean;
  @Input()
  defaultYearWord: string = '';
  @Input()
  defaultMonthWord: string = '';
  @Input()
  defaultDayWord: string = '';
  @Input()
  defaultHint : string = '';

  @Output()
  selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.yearWord = this.defaultYearWord || '选择年份';
    this.monthWord = this.defaultMonthWord || '选择月份';
    this.dayWord = this.defaultDayWord || '选择日期';
    this.hint = this.defaultHint;
    this.showDay = this.hasDay;
    this.fillYear();
  }

  isNumber(str): boolean {
    // tslint:disable-next-line: radix
    return !isNaN(parseInt(str));
  }

  fillYear(): void {
    for(let i = this.startYear;i <= this.endYear;i++){
      this.year.push(i);
    }
  }

  fillDay(): void {
    let day = [];
    for(let i = 1;i <= this.getMonthNumber();i++){
      day.push(i);
    }
    this.day = day;
  }

  // 获取某月的天数
  getMonthNumber(): number {
    const d = new Date(this.selectedYear, this.selectedMonth, 0);
    const num = d.getDate();
    return num;
  }

  yearBoxClick(): void {
    this.clearServerInfo();
    this.yearOpen = !this.yearOpen;
    this.monthOpen = false;
    this.dayOpen = false;
  }

  monthBoxClick(): void {
    this.clearServerInfo();
    this.monthOpen = !this.monthOpen;
    this.yearOpen = false;
    this.dayOpen = false;
  }

  dayBoxClick(): void {
    this.clearServerInfo();
    if(this.day.length > 0){
      this.dayOpen = !this.dayOpen;
    }
    else{
      this.showServerInfo('请选择年份');
    }
    this.yearOpen = false;
    this.monthOpen = false;
  }

  yearClick(yearItem: number): void {
    this.clearServerInfo();
    this.selectedYear = yearItem;
    this.yearOpen = false;
    this.yearWord = yearItem.toString();
    this.setMonthVal(1);
    this.setDayVal(1);
    this.fillDay();
    this.setVal(this.selectedYear + '/' + this.selectedMonth + '/' + this.selectedDay);
    this.selected.emit("selected");
  }

  monthClick(monthItem: number): void {
    this.clearServerInfo();
    this.selectedMonth = monthItem;
    this.monthOpen = false;
    this.monthWord = monthItem.toString();
    this.setDayVal(1);
    this.fillDay();
    this.setVal(this.selectedYear + '/' + this.selectedMonth + '/' + this.selectedDay);
    this.selected.emit("selected");
  }

  dayClick(dayItem: number): void {
    this.clearServerInfo();
    this.selectedDay = dayItem;
    this.dayOpen = false;
    this.dayWord = dayItem.toString();
    this.setVal(this.selectedYear + '/' + this.selectedMonth + '/' + this.selectedDay);
    this.selected.emit("selected");
  }

  setYearVal(yearVal: number): void {
    this.selectedYear = yearVal;
    this.yearWord = yearVal.toString();
  }

  setMonthVal(monthVal: number): void {
    this.selectedMonth = monthVal;
    this.monthWord = monthVal.toString();
  }

  setDayVal(dayVal: number): void {
    this.selectedDay = dayVal;
    this.dayWord = dayVal.toString();
  }

  showServerInfo(serverInfo: string): void {
    this.showHint = true;
    this.hint = serverInfo;
  }

  clearServerInfo(): void {
    this.showHint = false;
  }

  getSubmitStatus(): boolean {
    return this.val !== '';
  }

  getHint(): string {
    return this.hint;
  }

  getVal(): string {
    //console.log('getval:',this.val)
    return this.val.trim();
  }

  setVal(value: string): void {
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
          //this.submitStatus = true;
        }
        else{
          //this.submitStatus = false;
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
          //this.submitStatus = true;
        }
        else{
          //this.submitStatus = false;
        }
      }
      else{
        //this.submitStatus = false;
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
      //this.submitStatus = true;
    }
    //console.log('setval:',this.val)
    if(this.selectedYear > 0){
      this.yearWord = this.selectedYear.toString();
    }
    if(this.selectedMonth > 0){
      this.monthWord = this.selectedMonth.toString();
    }
    if(this.selectedDay > 0){
      this.dayWord = this.selectedDay.toString();
    }
  }

}
