import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from '../account';

@Component({
  selector: 'edit-account-form',
  standalone: true,
  templateUrl: './edit-account-form.component.html',
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class EditAccountForm {
  @Input() account: Account;
  @Output() editAccount = new EventEmitter<Account>();

  activeModal = inject(NgbActiveModal);
  accountForm!: FormGroup;
  constructor (private formBuilder: FormBuilder) {
    this.initiateForm();
  };

  initiateForm(): void {
    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.accountForm.valid && this.accountForm.value.name !== this.account.name) {
      this.activeModal.close('Submit click')
      this.account.name = this.accountForm.value.name;
      this.editAccount.emit(this.account);
      console.log('valid');
      this.accountForm.reset();
    } else {
      console.log('invalid');
      this.accountForm.controls['name'].setErrors({'same name': true});
    }
  }
}
