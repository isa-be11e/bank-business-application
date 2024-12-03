import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, inject, EventEmitter } from '@angular/core';
import { Account } from '../account';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAccountForm } from '../edit-account-form/edit-account-form.component';
import { DeleteAccountConfirm } from '../delete-account-confirm/delete-account-confirm.component'

@Component({
  selector: 'account-table',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './account-table.component.html'
})
export class AccountTable implements OnChanges {
  @Input() accounts: Account[];
  public total: number;

  @Output() editAccount = new EventEmitter<Account>();
  @Output()deleteAccount = new EventEmitter<Account>();

  private modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accounts'].currentValue) {
      this.total = this.accounts.reduce((a,b) => a + b.amount,0);
    }
  }

  onEditClick(account: Account) {
    console.log('edit');
    const modalRef = this.modalService.open(EditAccountForm);
    modalRef.componentInstance.account = account;
    modalRef.componentInstance.editAccount.subscribe(($event: Account) => this.editAccount.emit($event));
  }

  onDeleteClick(account: Account) {
    console.log('delete');
    const modalRef = this.modalService.open(DeleteAccountConfirm);
    modalRef.componentInstance.account = account;
    modalRef.componentInstance.deleteAccount.subscribe(($event: Account) => this.deleteAccount.emit($event));
  }
}
