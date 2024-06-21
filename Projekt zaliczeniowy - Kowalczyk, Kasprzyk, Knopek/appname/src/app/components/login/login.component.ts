import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserPanelService } from '../../services/user-panel.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userPanel: UserPanelService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {}

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      //wyslanie obiektu do bazy

      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodeToken();
          this.userPanel.setFullNameForService(tokenPayload.unique_name);
          this.userPanel.setRoleForService(tokenPayload.role);
          this.router.navigate(['dashboard']);
        },
        error: (err: any) => {
          alert('Błędne dane logowania!');
        },
      });
    } else {
      console.log('Form is not valid');
      this.validateAllFormFields(this.loginForm);
      alert('Formularz jest niepoprawny!');
    }
  }
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
