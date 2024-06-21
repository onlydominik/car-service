import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:60977/api/Customer/';
  private baseUrlProduct: string = 'https://localhost:60977/api/Product/';
  private baseUrlTransaction: string =
    'https://localhost:60977/api/Transaction/';
  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }

  newRoleUserCustomer(customerObj: any, role: any, id: any) {
    return this.http.put<any>(`${this.baseUrl}${role}/${id}`, customerObj);
  }

  newRoleSerwisantCustomer(customerObj: any, role: any, id: any) {
    return this.http.put<any>(`${this.baseUrl}${role}/${id}`, customerObj);
  }

  newRoleMagazynierCustomer(customerObj: any, role: any, id: any) {
    return this.http.put<any>(`${this.baseUrl}${role}/${id}`, customerObj);
  }

  totalcostTransaction(productObj: any, cost: any, id: any, margin: any) {
    return this.http.put<any>(
      `${this.baseUrlTransaction}${margin}/${cost}/${id}`,
      productObj
    );
  }

  declineTransaction(transactionObj: any, id: any) {
    this.router.navigate(['dashboard']);
    return this.http.post<any>(
      `${this.baseUrlTransaction}decline/${id}`,
      transactionObj
    );
  }

  deleteTransaction(transactionObj: any) {
    this.router.navigate(['dashboard']);
    return this.http.delete<any>(
      `${this.baseUrlTransaction}?id=${transactionObj}`
    );
  }

  addTransaction(transactionObj: any) {
    return this.http.post<any>(
      `${this.baseUrlTransaction}addTransaction`,
      transactionObj
    );
  }

  addQuantityProduct(productObj: any, quantity: any, id: any) {
    return this.http.put<any>(
      `${this.baseUrlProduct}${quantity}/${id}`,
      productObj
    );
  }

  deleteQuantityProduct(productObj: any, quantity: any, id: any) {
    return this.http.delete<any>(
      `${this.baseUrlProduct}delete/${quantity}/${id}`,
      productObj
    );
  }

  addProduct(productObj: any) {
    return this.http.post<any>(`${this.baseUrlProduct}addProduct`, productObj);
  }

  deleteAllProducts(productObj: any) {
    this.router.navigate(['dashboard']);
    return this.http.delete<any>(`${this.baseUrlProduct}?id=${productObj}`);
  }

  deleteCustomer(customerObj: any) {
    this.router.navigate(['dashboard']);
    return this.http.delete<any>(`${this.baseUrl}?id=${customerObj}`);
  }

  signUp(customerObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, customerObj);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(token);
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken() {
    if (this.userPayload) return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.role;
  }
}
