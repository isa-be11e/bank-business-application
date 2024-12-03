package com.EQProject.businessaccount.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Account implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(nullable = false, updatable = false)
  private Long id;
  private String name;
  private Double amount;

  public Account() {}

  public Account(Long id, String name, Double amount) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }

  @Override
  public String toString() {
    return "Account{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", amount=" + amount +
            '}';
  }
}
