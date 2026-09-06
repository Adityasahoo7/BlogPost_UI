import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  loading = false;

  errorMessage = '';

  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]

    });
  }


  register(): void {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }


    const password =
      this.registerForm.get('password')?.value;

    const confirmPassword =
      this.registerForm.get('confirmPassword')?.value;


    if (password !== confirmPassword) {

      this.errorMessage =
        'Password and Confirm Password do not match.';

      return;
    }


    this.loading = true;

    this.errorMessage = '';

    this.successMessage = '';


    this.authService
      .register(this.registerForm.value)
      .subscribe({

        next: () => {

          this.loading = false;

          this.successMessage =
            'Registration successful. Redirecting to login...';


          setTimeout(() => {

            this.router.navigate(['/login']);

          }, 1500);
        },


        error: (error) => {

          this.loading = false;

          console.error(error);

          this.errorMessage =
            error?.error?.message ||
            'Registration failed.';
        }

      });
  }
}