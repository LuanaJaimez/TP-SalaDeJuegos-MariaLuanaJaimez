import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  @Output() formData: EventEmitter<{
    email: string;
    user: string;
    password: string;
    password2: string;
  }> = new EventEmitter();

  formReg!: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formReg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      user: ['', [Validators.required]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  get email() {
    return this.formReg.get('email');
  }

  get user() {
    return this.formReg.get('user');
  }

  get password() {
    return this.formReg.get('password');
  }

  get password2() {
    return this.formReg.get('password2');
  }
  
  onSubmit() {
    if(this.formReg.valid) {

      if(this.formReg.get('password')?.value !== this.formReg.get('password2')?.value) {
        this.toastr.error("Las contraseñas no coinciden");
        return;
      }

    this.formData.emit(this.formReg.value);
    }
  }
}
