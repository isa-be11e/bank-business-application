import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'move-money',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './move-money.component.html',
})
export class MoveMoney implements OnInit {
  public accounts: Account[];
  public moveMoneyForm!: FormGroup;

  constructor (private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router) {
    this.initiateForm();
  };

  ngOnInit() {
    this.getAccounts();
  }

  initiateForm(): void {
    this.moveMoneyForm = this.formBuilder.group({
      fromAccount: ['', Validators.required],
      amount: ['', Validators.required],
      toAccount: ['', Validators.required]
    })
  }

  public getAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (response: Account[]) => {
        this.accounts = response;
        console.log(this.accounts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSubmit(): void {
    const fromAccount = this.accounts.find(({id}) => id == this.moveMoneyForm.value.fromAccount);
    if (this.moveMoneyForm.valid && fromAccount && fromAccount.amount-this.moveMoneyForm.value.amount >= 0) {
      this.moveMoney(this.moveMoneyForm);
    } else {
      this.moveMoneyForm.controls['amount'].setErrors({'too large': true});
    }
  }

  public moveMoney(moveMoneyForm: FormGroup): void {
    const transfer = {
      fromId: moveMoneyForm.value.fromAccount,
      toId: moveMoneyForm.value.toAccount,
      amount: moveMoneyForm.value.amount
    }
    console.log(transfer);
    this.accountService.transferBetweenAccount(transfer).subscribe(
      (response: Account[]) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message);
      }
    );
  }
}
