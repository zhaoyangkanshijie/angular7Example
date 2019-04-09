import { Component, OnInit, ViewChild } from '@angular/core';
import { InputBoxComponent } from '../../components/input-box/input-box.component';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public canSeeRegisterModal : boolean = false;
  public phonePatternInfo = [
    {
      pattern: /1\d{10}/,
      info: '手机号格式不正确'
    }
  ];
  public passwordPatternInfo = [
    {
      pattern: /\w{6,32}/,
      info: '请输入6-32位字符的密码'
    }
  ];
  public password2PatternInfo = [
    {
      pattern: /\w{6,32}/,
      info: '请输入6-32位字符的密码'
    },
    {
      pattern: false as any,
      info: '两次密码不一致，请重新输入'
    }
  ];
  public codePatternInfo = [
    {
      pattern: /\w{4}/,
      info: '验证码不正确'
    }
  ];
  public messageWord : String = "发送验证码";
  public messageDisabled : boolean = true;
  public agree : boolean = false;
  public agreeError : boolean = false;
  public registerSubmitDisabled : boolean = false;

  @ViewChild("phone")
  account: InputBoxComponent;

  @ViewChild("password")
  password: InputBoxComponent;

  @ViewChild("password2")
  password2: InputBoxComponent;

  @ViewChild("code")
  code: InputBoxComponent;

  @ViewChild("message")
  message: InputBoxComponent;

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    if(!this.messageDisabled){
      console.log('发送验证码')
    }
  }

  registerSubmitData() {
    if(!this.registerSubmitDisabled){
      this.registerSubmitDisabled = true;
      if(this.registerValidateData()){
        this.registerServer(this.account.getVal(),this.password.getVal(),this.password2.getVal(),this.code.getVal(),this.message.getVal());
      }
      else{
        this.account.blurAction();
        this.password.blurAction();
        this.password2.blurAction();
        this.code.blurAction();
        this.message.blurAction();
        this.registerSubmitDisabled = false;
      }
    }
  }

  registerValidateData() {
    if(this.account.getSubmitState() && this.password.getSubmitState() && this.password2.getSubmitState() && this.code.getSubmitState() && this.message.getSubmitState()){
      if(!this.agree){
        this.agreeError = true;
        return false;
      }
      else{
        return true;
      }
    }
    else{
      if(!this.agree){
        this.agreeError = true;
      }
      return false;
    }
  }

  registerServer(account,password,password2,code,message) {
    console.log("submit:",account,password,password2,code,message);
  }

  syncPassword() {
    this.password2PatternInfo[1].pattern = this.password.getVal();
  }

}
