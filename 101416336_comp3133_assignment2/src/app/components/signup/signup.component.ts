import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-signup', templateUrl: './signup.component.html' })
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) return;
    const { username, email, password } = this.signupForm.value;
    this.auth.signup(username, email, password).subscribe(token => {
      localStorage.setItem('token', token);
      this.router.navigate(['/employees']);
    });
  }
}