import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step2.html',
  styleUrl: './step2.css',
})
export class Step2 {

   

  
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/step1']);
  }

  goNext(q1: string, q2: string, q3: string, q4: string) {

    if (!q1.trim() || !q2.trim() || !q3.trim() || !q4.trim()) {
      alert('Please fill all the questions');
      return;
    }
     
     sessionStorage.setItem('step2', JSON.stringify({ q1, q2, q3, q4 }));
    this.router.navigate(['/step3']);
  }
  
  
}
