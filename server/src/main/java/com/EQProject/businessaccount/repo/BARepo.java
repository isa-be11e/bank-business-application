package com.EQProject.businessaccount.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.EQProject.businessaccount.model.Account;

import java.util.Optional;

public interface BARepo extends JpaRepository<Account, Long> {
  void deleteAccountById(Long id);

  Optional<Account> findAccountById(Long id);
}
