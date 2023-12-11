import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  
  @ViewChild("formDirective") formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;
  constructor() { }
  ngOnInit(): void {
    this.form = this.createFormGroup();

  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(5)]),
      body: new FormControl("", [Validators.required, Validators.minLength(10),
      ]),
    });
  }
  onSubmit(formData: Pick<Post, "title" | "body">): void {
    console.log(formData);
    this.create.emit(null);
    this.form.reset(); 
    this.formDirective.resetForm(); 
  }
}