import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from '../account';

@Component({
  selector: 'delete-account-confirm',
  standalone: true,
  templateUrl: './delete-account-confirm.component.html',
  imports: [CommonModule]
})
export class DeleteAccountConfirm {
  @Input() account: Account;
  @Output() deleteAccount = new EventEmitter<Account>();

  activeModal = inject(NgbActiveModal);

  onCancelClick(): void {
    this.activeModal.close('Cancel click');
  }

  onDeleteClick(): void {
    this.activeModal.close('Delete click');
    this.deleteAccount.emit(this.account);
  }
}
