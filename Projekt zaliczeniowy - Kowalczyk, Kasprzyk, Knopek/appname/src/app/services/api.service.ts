import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private usersUrl: string = 'https://localhost:60977/api/Customer';
  private productsUrl: string = 'https://localhost:60977/api/Product';
  private TransactionsUrl: string = 'https://localhost:60977/api/Transaction';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any>(this.usersUrl);
  }

  getProducts() {
    return this.http.get<any>(this.productsUrl);
  }

  getTransactions() {
    return this.http.get<any>(this.TransactionsUrl);
  }
}
