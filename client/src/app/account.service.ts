import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';
import { Transfer } from './transfer';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/account/all`);
  }

  public addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiServerUrl}/account/add`, account);
  }

  public updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiServerUrl}/account/update`, account);
  }

  public transferBetweenAccount(transfer: Transfer): Observable<Account[]> {
    return this.http.put<Account[]>(`${this.apiServerUrl}/account/transfer`, transfer);
  }

  public deleteAccount(accountId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/account/delete/${accountId}`);
  }
}
