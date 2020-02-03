import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8), this.oneNumber, this.oneUppercase, this.oneSpecial]],
    });
  }

  oneNumber = (control: AbstractControl): ValidationErrors | null => {
    const valid = /\d/.test(control.value);
    if (valid) {
      return null;
    }
    return { error: true };
  }

  oneUppercase = (control: AbstractControl): ValidationErrors | null => {
    const valid = /[A-Z]/.test(control.value);
    if (valid) {
      return null;
    }
    return { error: true };
  }

  oneSpecial = (control: AbstractControl): ValidationErrors | null => {
    const valid = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(control.value);
    if (valid) {
      return null;
    }
    return { error: true };
  }

  submitForm(): void {
    this.form.updateValueAndValidity();
  }
}
