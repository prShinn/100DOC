import { Component, ViewChild } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild('signUpNgForm') signUpNgForm: NgForm | any;

  signUpForm: UntypedFormGroup | any;
  showAlert: boolean = false;

  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      company: [''],
      agreements: ['', Validators.requiredTrue],
    });
  }
  signUp(){}
}
