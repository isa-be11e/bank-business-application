import { Component, NgModule, OnInit, inject } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { AccountTable } from '../account-table/account-table.component'
import { MenuTile } from '../menu-tile/menu-tile.component'
import { AddAccountForm } from '../add-account-form/add-account-form.component'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'business-accounts',
  standalone: true,
  imports: [CommonModule, AccountTable, MenuTile, AddAccountForm],
  templateUrl: './business-accounts.component.html',
})
export class BusinessAccounts implements OnInit {
  public accounts: Account[];
  private modalService = inject(NgbModal);

  constructor(private accountService: AccountService){}

  ngOnInit() {
    this.getAccounts();
  }

  public getAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.accounts = response;
        console.log(this.accounts);
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
      }
    );
  }

  public addAccount(accountForm: FormGroup): void {
    this.accountService.addAccount(accountForm.value).subscribe(
      (response: Account) => {
        console.log(response);
        this.getAccounts();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        console.log(error.message);
      }
    );
  }

  public editAccount(account: Account): void {
    console.log('edit');
    this.accountService.updateAccount(account).subscribe(
      (response: Account) => {
        console.log(response);
        //this.getAccounts();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        console.log(error.message);
      }
    );
  }

  public deleteAccount(account: Account): void {
    console.log('delete');
    this.accountService.deleteAccount(account.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAccounts();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        console.log(error.message);
      }
    );
  }

  public openAccountForm(): void {
    const modalRef = this.modalService.open(AddAccountForm);
    modalRef.componentInstance.addAccount.subscribe(($event: FormGroup) => this.addAccount($event));
  }
}
