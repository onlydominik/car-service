import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserPanelService {
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  constructor() {}

  public getRoleFromService() {
    return this.role$.asObservable();
  }

  public setRoleForService(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromService() {
    return this.fullName$.asObservable();
  }

  public setFullNameForService(fullname: string) {
    this.fullName$.next(fullname);
  }
}
