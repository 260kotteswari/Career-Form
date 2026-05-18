import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [],
  templateUrl: './step3.html',
  styleUrls: ['./step3.css']
})
export class Step3 {

  constructor(private router: Router) {}

  // ✅ store selected resume
  selectedFile!: File;

  goBack() {
    this.router.navigate(['/step2']);
  }

  // ✅ file select event
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    // PDF validation
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed');
      event.target.value = '';
      return;
    }

    this.selectedFile = file;
    console.log('Selected file:', this.selectedFile);
  }

  // ✅ submit form
  async submitForm(
    role: string,
    salary: string,
    joinDate: string,
    message: string
  ) {

    // validation
    if (!role || !salary || !joinDate || !this.selectedFile) {
      alert('Please fill all required fields');
      return;
    }

    if (!confirm('Are you sure you want to submit the form?')) {
      return;
    }

    // get previous steps
    const step1 = JSON.parse(sessionStorage.getItem('step1') || '{}');
    const step2 = JSON.parse(sessionStorage.getItem('step2') || '{}');

    const formData = new FormData();

    // Step 1 data
    formData.append('fullname', step1.fullname);
    formData.append('email', step1.email);
    formData.append('phone', step1.phone);
    formData.append('dob', step1.dob);
    formData.append('location', step1.location);
    formData.append('about', step1.about);

    // Step 2 data
    formData.append('q1', step2.q1);
    formData.append('q2', step2.q2);
    formData.append('q3', step2.q3);
    formData.append('q4', step2.q4);

    // Step 3 data
    formData.append('role', role);
    formData.append('salary', salary);
    formData.append('joinDate', joinDate);
    formData.append('message', message);

    // ✅ resume file
    formData.append('resume', this.selectedFile);

    try {
      const response = await fetch('http://localhost:3000/submit-form', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        sessionStorage.clear();
      } else {
        alert('Submission failed');
      }

    } catch (error) {
      console.error(error);
      alert('Backend server error');
    }
  }
}
