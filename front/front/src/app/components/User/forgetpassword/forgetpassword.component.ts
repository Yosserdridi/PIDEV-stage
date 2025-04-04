import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  forgetForm!: FormGroup;


  private unsubscribeAll: Subject<void> = new Subject();
  constructor(private authService:AuthService, private formBuilder: FormBuilder,private route:Router) {}

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          // Validators.pattern(patternEmail),
        ],
      ],
    },
 
    );
  }

 get f(){
  return this.forgetForm.controls;
}
  forgetpassword() {

    // console.log('form', this.forgetForm.value);
    let email=this.forgetForm.value.email
    // this.localStorageService.saveData('email',JSON.stringify(email));

    this.forgetForm.markAllAsTouched();
    this.forgetForm.markAsDirty();

    // if (this.forgetForm.invalid) {
    //   this.toastrService.error("Please complete all required information.")

    //   return;
    // }
 
    this.authService
      .forgetpassword(this.forgetForm.value.email)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (res: any) => {
          // if (res.status === 200) {
            console.log("res",res)
            // this.toastrService.success('A password code has been sent to your email');
            alert("user found and email is send");
            this.forgetForm.reset()
            // this.route.navigateByUrl("/auth/verification-code")
            // routerLink="/auth/confirm-password"
           
          // }
        },
        error: (err: any) => {
          console.log('error', err);
          if(err.error.message){
            // this.toastrService.error(err.error.message);
          }
        },
      });
   }
}
