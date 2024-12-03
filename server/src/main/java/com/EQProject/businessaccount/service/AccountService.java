package com.EQProject.businessaccount.service;

import com.EQProject.businessaccount.repo.BARepo;
import com.EQProject.businessaccount.model.Account;
import com.EQProject.businessaccount.model.Transfer;
import exception.AccountNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class AccountService {
  private final BARepo baRepo;

  @Autowired
  public AccountService(BARepo baRepo) {
    this.baRepo = baRepo;
  }

  public Account addAccount(Account account) {
    return baRepo.save(account);
  }

  public List<Account> findAllAccounts() {
    return baRepo.findAll();
  }

  public Account updateAccount(Account account) {
    return baRepo.save(account);
  }

  public List<Account> transferBetweenAccount(Transfer transfer) {
    Account fromAccount = baRepo.findAccountById(transfer.getFromId())
            .orElseThrow(() -> new AccountNotFoundException("Account by id " + transfer.getFromId() + " was not found"));
    fromAccount.setAmount(fromAccount.getAmount()-transfer.getAmount());
    baRepo.save(fromAccount);
    Account toAccount = baRepo.findAccountById(transfer.getToId())
            .orElseThrow(() -> new AccountNotFoundException("Account by id " + transfer.getToId() + " was not found"));
    toAccount.setAmount(toAccount.getAmount()+transfer.getAmount());

    return Arrays.asList(fromAccount, toAccount);
  }

  public Account findAccountById(Long id) {
    return baRepo.findAccountById(id)
            .orElseThrow(() -> new AccountNotFoundException("Account by id " + id + " was not found"));
  }

  public void deleteAccount(Long id) {
    baRepo.deleteAccountById(id);
  }
}
