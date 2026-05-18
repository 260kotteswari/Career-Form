import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step1.html',
  styleUrl: './step1.css',
})
export class Step1 {

     step1Form = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z ]+$/) 
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10,}$/) 
    ]),

    dob: new FormControl('', [
      Validators.required
    ]),

    location: new FormControl('' ),

    about:new FormControl('')
  });

  constructor(private router: Router) {}

  next() {
    if (this.step1Form.valid) {

      sessionStorage.setItem('step1', JSON.stringify(this.step1Form.value));
      this.router.navigate(['/step2']);
    } else {
      this.step1Form.markAllAsTouched();
    }
  }
     
}



