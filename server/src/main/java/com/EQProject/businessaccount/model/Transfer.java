package com.EQProject.businessaccount.model;

public class Transfer {
  private Long fromId;
  private Long toId;
  private Double amount;

  public Transfer() {}

  public Transfer(Long fromId, Long toId, Double amount) {
    this.fromId = fromId;
    this.toId = toId;
    this.amount = amount;
  }

  public Long getFromId() {
    return fromId;
  }

  public void setFromId(Long fromId) {
    this.fromId = fromId;
  }

  public Long getToId() {
    return toId;
  }

  public void setToId(Long toId) {
    this.toId = toId;
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
            "fromId=" + fromId +
            ", toId='" + toId + '\'' +
            ", amount=" + amount +
            '}';
  }
}
