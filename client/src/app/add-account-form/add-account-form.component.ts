import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-account-form',
  standalone: true,
  templateUrl: './add-account-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class AddAccountForm {
  @Output()
  addAccount = new EventEmitter<FormGroup>();

  activeModal = inject(NgbActiveModal);
  accountForm!: FormGroup;
  constructor (private formBuilder: FormBuilder) {
    this.initiateForm();
  };

  initiateForm(): void {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.activeModal.close('Submit click')
      this.addAccount.emit(this.accountForm);
      console.log('valid');
    } else {
      console.log('invalid');
    }
    this.accountForm.reset();
  }
}
