import { AuthService } from './../../auth/auth.service';
import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss'],
})
export class SiginComponent {
  loginForm = new FormGroup({
    username: new FormControl('admin', Validators.required),
    password: new FormControl('123456789', Validators.required),
    rememberMe: new FormControl(false),
  });
  loginObj: any = {};
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private _router: Router,
    private el: ElementRef
  ) {}
  login() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.loginObj = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    if (this.loginForm.invalid) {
      for (const key of Object.keys(this.loginForm.controls)) {
        // if (this.loginForm.controls[key].invalid) {
        //   const invalidControl = this.el.nativeElement.querySelector(
        //     '[formcontrolname="' + key + '"]'
        //   );
        //   invalidControl.focus();
        //   break;
        // }
      }
    }
    this.authService.login(this.loginObj).subscribe((response) => {
      const token = response.token;
      this.authService.setAuthToken(token);
      console.log('login', token);
      this._router.navigate(['dashboard']);
      this.isLoading = false;
    });
  }
  signInWithHNUEID() {
    let oserver = {
      next: (data: any) => {
        console.log('data: ', data);
      },
      error: (error: any) => {
        console.log('error: ', error);
      },
      completed: () => {
        console.log('completed');
      },
    };
    this.authService.signInWithHUNEID()?.subscribe(oserver);
  }
  chuyen() {
    this._router.navigate(['dashboard']);
  }
}
