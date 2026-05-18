import { RouterModule, Routes } from '@angular/router';
import { Step1 } from './pages/step1/step1';
import { Step2 } from './pages/step2/step2';
import { Step3 } from './pages/step3/step3';  
import { NgModule } from '@angular/core';

export const routes: Routes = [

     { path: '', redirectTo: 'step1',
         pathMatch: 'full' },
         
  { path: 'step1', 
    component: Step1
 },
  { path: 'step2',
     component: Step2
    
  },
  { path: 'step3', 
    component: Step3
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
