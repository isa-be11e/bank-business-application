package com.EQProject.businessaccount.resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.EQProject.businessaccount.model.Account;
import com.EQProject.businessaccount.model.Transfer;
import com.EQProject.businessaccount.service.AccountService;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountResource {
  private final AccountService accountService;

  public AccountResource(AccountService accountService) {
    this.accountService = accountService;
  }

  @GetMapping("/all")
  public ResponseEntity<List<Account>> getAllAccounts () {
    List<Account> accounts = accountService.findAllAccounts();
    return new ResponseEntity<>(accounts, HttpStatus.OK);
  }

  @GetMapping("/find/{id}")
  public ResponseEntity<Account> getAccountById (@PathVariable("id") Long id) {
    Account account = accountService.findAccountById(id);
    return new ResponseEntity<>(account, HttpStatus.OK);
  }

  @PostMapping("/add")
  public ResponseEntity<Account> addAccount(@RequestBody Account account) {
    Account newAccount = accountService.addAccount(account);
    return new ResponseEntity<>(newAccount, HttpStatus.CREATED);
  }

  @PutMapping("/update")
  public ResponseEntity<Account> updateAccount(@RequestBody Account account) {
    Account updatedAccounts = accountService.updateAccount(account);
    return new ResponseEntity<>(updatedAccounts, HttpStatus.OK);
  }

  @PutMapping("/transfer")
  public ResponseEntity<List<Account>> transferBetweenAccount(@RequestBody Transfer transfer) {
    List<Account> accounts = accountService.transferBetweenAccount(transfer);
    return new ResponseEntity<>(accounts, HttpStatus.OK);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> deleteAccount(@PathVariable("id") Long id) {
    accountService.deleteAccount(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}