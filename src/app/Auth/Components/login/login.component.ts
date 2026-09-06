import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
  username: ['', [Validators.required]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});
  }

  login(): void {

   if (this.loginForm.invalid) {
  this.loginForm.markAllAsTouched();
  this.errorMessage = 'Please fill all fields correctly.';
  return;
}

    this.loading = true;
    this.errorMessage = '';

    this.authService
      .login(this.loginForm.value)
      .subscribe({

        next: (response) => {

          this.loading = false;

          console.log('Login successful', response);

          this.router.navigate(['/home']);
        },

        error: (error) => {

          this.loading = false;

          console.error(error);

          this.errorMessage =
            error?.error?.message ||
            'Invalid email or password.';
        }
      });
  }
}