import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-savepassword',
  templateUrl: './savepassword.component.html',
  styleUrls: ['./savepassword.component.css']
})
export class SavepasswordComponent {
 forgetForm!: FormGroup;
resettoken=this.activeroute.snapshot.params['reset']

  private unsubscribeAll: Subject<void> = new Subject();
  constructor(private authService:AuthService,private activeroute:ActivatedRoute, private formBuilder: FormBuilder,private route:Router) {}

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      newPassword: [
        '',
        [
          Validators.required,
       
          // Validators.pattern(patternEmail),
        ],
      ],
    },
 
    );
  }

 get f(){
  return this.forgetForm.controls;
}
  savepassword() {



    this.forgetForm.markAllAsTouched();
    this.forgetForm.markAsDirty();

    // if (this.forgetForm.invalid) {
    //   this.toastrService.error("Please complete all required information.")

    //   return;
    // }
 console.log("reset",this.resettoken)
 console.log("newpass",this.forgetForm.value.newPassword)

    this.authService
      .savepassword(this.forgetForm.value.newPassword,this.resettoken)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (res: any) => {
          // if (res.status === 200) {
            console.log("res",res)
            // this.toastrService.success('A password code has been sent to your email');
            alert("password update successfully");
            this.route.navigateByUrl("/")
            // this.forgetForm.reset()
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


