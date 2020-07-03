import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { InputBoxComponent } from '../../components/input-box/input-box.component';
import axios from 'axios';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public canSeeRegisterModal: boolean = false;
  public phonePatternInfo = [
    {
      pattern: /^1[3456789]\d{9}$/,
      info: '手机号格式不正确'
    }
  ];
  public forgetPassword: boolean = false;
  public moreHelp: boolean = false;
  public showMoreHelpModal: boolean = false;
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
  public codeSrc: string = '';
  public codePatternInfo = [
    {
      pattern: /.{4}/,
      info: '验证码不正确'
    }
  ];
  public captchaId: string = '';
  public currentInstanceId: string = '';
  public messageTimer: number = 0;
  public messageDisabled: boolean = true;
  public agree: boolean = true;
  public agreeError: boolean = false;
  public registerSubmitDisabled: boolean = false;

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

  @Output()
  changeModal = new EventEmitter<string>();
  @Output()
  changeAccount = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.getCaptcha();
  }

  checkPhone(): void {
    //console.log(this.account.getVal());
    if(!this.account.getSubmitStatus()){
      this.forgetPassword = true;
      this.moreHelp = true;
      this.messageDisabled = true;
    }
    else{
      this.messageDisabled = false;
      // let params = {
      //   'tel': this.account.getVal()
      // }
      // let config = {
      //   headers: {'Content-Type': 'application/json; charset=utf-8'}
      // };
      // axios.post('/api/v1/account/signup',params,config)
      // .then(response => {
      //   if(response.data.errorCode == -202005){
      //     this.messageDisabled = true;
      //   }
      //   else{
      //     this.messageDisabled = false;
      //   }
      // })
      // .catch(response => {
      //   this.registerSubmitDisabled = false;
      //   this.getCaptcha();
      // });
    }
  }

  findPassword(): void {
    this.showMoreHelpModal = false;
    this.forgetPassword = false;
    this.moreHelp = false;
    this.changeModal.emit("findPassword");
  }

  getCaptcha(): void {
    axios.get('/api/v1/global/captcha/get')
    .then(response => {
      this.codeSrc = response.data.result;
      this.captchaId = this.GetQuerystring('c', response.data.result);
      this.currentInstanceId = this.GetQuerystring('t', response.data.result);
    })
    .catch(response => {
      
    });
  }

  GetQuerystring(name: string, url: string): string|null
  {
      let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      let r = url.match(reg);
      if(r!=null)return unescape(r[2]); return null;
  }

  sendMessage(): void {
    if (!this.account.getSubmitStatus()) {
      this.account.blurAction();
    }
    else if (!this.code.getSubmitStatus()) {
      this.code.blurAction();
    }
    else{
      //console.log('发送验证码')
      let params = {
        'tel': this.account.getVal(),
        'captchaId': this.captchaId,
        'captchaCode': this.code.getVal(),
        'currentInstanceId': this.currentInstanceId,
        'templateId': 1
      }
      let config = {
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      };
      axios.post('/api/v1/global/sms/get-code',params,config)
      .then(response => {
        if(response.data.errorCode == 0){
          this.resetPhoneCodeTimer();
        }
        else if(response.data.errorCode == -202013){
          this.account.showServerInfo(response.data.message);
        }
        else{
          this.code.showServerInfo(response.data.message);
          this.getCaptcha();
        }
      })
      .catch(response => {
        this.code.showServerInfo(response.data.message);
        this.getCaptcha();
      });
    }
  }

  resetPhoneCodeTimer(): void {
    this.messageTimer = 60;
    let timer = setInterval(()=>{
      this.messageTimer--;
      if(this.messageTimer == 0){
        clearInterval(timer);
      }
    }, 1000);
  }

  jumpToLogin(): void {
    this.showMoreHelpModal = false;
    this.forgetPassword = false;
    this.moreHelp = false;
    this.changeModal.emit("login");
  }

  registerSubmitData(): void {
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

  registerValidateData(): boolean {
    if(this.account.getSubmitStatus() && this.password.getSubmitStatus() && this.password2.getSubmitStatus() && this.code.getSubmitStatus() && this.message.getSubmitStatus()){
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

  registerServer(account: string ,password: string ,password2: string ,code: string ,message: string ): void {
    //console.log("submit:",account,password,password2,code,message);
    let params = {
      'tel': account,
      'password': password,
      'captchaId': this.captchaId,
      'captchaCode': code,
      'code': message,
      'currentInstanceId': this.currentInstanceId
    }
    let config = {
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    };
    axios.post('/api/v1/account/signup',params,config)
    .then(response => {
      this.registerSubmitDisabled = false;
      if(response.data.errorCode == 0){
        localStorage.setItem("authJWT", response.headers['Authorization'] || response.headers['authorization']);
        localStorage.setItem("campusAccount", account);
        localStorage.setItem('userId', response.data.result.entity.Id);
        this.canSeeRegisterModal = false;
        this.changeAccount.emit(account);
      }
      else if(response.data.errorCode == -202005){
        this.account.showServerInfo(response.data.message);
        this.getCaptcha();
      }
      else if(response.data.errorCode == -202003){
        this.code.showServerInfo(response.data.message);
        this.getCaptcha();
      }
      else if(response.data.errorCode == -202012){
        this.message.showServerInfo(response.data.message);
        this.getCaptcha();
      }
      else{
        this.getCaptcha();
      }
    })
    .catch(response => {
      this.registerSubmitDisabled = false;
      this.getCaptcha();
    });
  }

  syncPassword(): void {
    this.password2PatternInfo[1].pattern = this.password.getVal();
  }

}
