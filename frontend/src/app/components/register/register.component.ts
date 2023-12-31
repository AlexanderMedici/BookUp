import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // added the ! operator to fix an error test to make sure it works
  registerForm!: FormGroup;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {

     this.registerForm = this.createFormGroup();
  }
  createFormGroup():FormGroup {
    return new FormGroup({
      password: new FormControl("", [Validators.required, Validators.minLength(7)] ),
      email: new FormControl("", [Validators.required, Validators.email] ),
      name: new FormControl("", [Validators.required, Validators.minLength(2)] ),
     
    })
  }
  register(): void {
    //console.log(this.registerForm.value)
    this.authService.register(this.registerForm.value).subscribe((msg)=> console.log(msg));
  }
}
