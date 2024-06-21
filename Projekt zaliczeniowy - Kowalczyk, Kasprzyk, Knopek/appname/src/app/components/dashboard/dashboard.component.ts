import { Component, OnInit } from '@angular/core';
import { UserPanelService } from '../../services/user-panel.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public fullName: string = '';
  public users: any = [];
  public products: any = [];
  public transactions: any = [];
  public role: string = '';
  addProductForm!: FormGroup;
  addTransactionForm!: FormGroup;
  totalcostTransactionForm!: FormGroup;
  constructor(
    private api: ApiService,
    private userPanel: UserPanelService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
    });

    this.api.getProducts().subscribe((res) => {
      this.products = res;
    });

    this.api.getTransactions().subscribe((res) => {
      this.transactions = res;
    });

    this.userPanel.getFullNameFromService().subscribe((val) => {
      const fullNameFromToken = this.auth.getfullNameFromToken();

      this.fullName = val || fullNameFromToken;
      console.log(fullNameFromToken);
    });

    this.userPanel.getRoleFromService().subscribe((val) => {
      const getRoleFromToken = this.auth.getRoleFromToken();
      this.role = val || getRoleFromToken;
    });

    //DO FORMULARZA DODAJ PRODUKT
    this.addProductForm = this.fb.group({
      Name: ['', Validators.required],
      Model: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', Validators.required],
      Quantity: ['', Validators.required],
    });

    this.addTransactionForm = this.fb.group({
      FirstName: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      car: ['', Validators.required],
      model: ['', Validators.required],
    });

    this.totalcostTransactionForm = this.fb.group({
      totalcost: ['', Validators.required],
    });
  }

  logout() {
    this.auth.signOut();
  }

  newRoleUserCustomer(id: any) {
    var w = '';
    var role = 'klient';
    this.auth.newRoleSerwisantCustomer(w, role, id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }
  newRoleSerwisantCustomer(id: any) {
    var w = '';
    var role = 'serwisant';
    this.auth.newRoleSerwisantCustomer(w, role, id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }

  newRoleMagazynierCustomer(id: any) {
    var w = '';
    var role = 'magazynier';
    this.auth.newRoleMagazynierCustomer(w, role, id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }

  totalcostTransaction(id: any) {
    var margin = (<HTMLInputElement>document.getElementById('margin')).value;
    var marginInt = +margin;

    console.log(marginInt);
    var value = (<HTMLInputElement>document.getElementById('totalcostValue'))
      .value;

    var w = '';

    this.auth.totalcostTransaction(w, value, id, marginInt).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }

  declineTransaction(id: any) {
    var w = '';
    this.auth.declineTransaction(w, id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }

  deleteTransaction(id: any) {
    this.auth.deleteTransaction(id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }

  onAddTransaction() {
    if (this.addTransactionForm.valid) {
      console.log(this.addTransactionForm.value);
      this.auth.addTransaction(this.addTransactionForm.value).subscribe({
        next: (res: any) => {
          alert(res.message);
          window.location.reload();
          this.router.navigate(['dashboard']);
        },
        error: (err: any) => {
          alert(err?.error.message);
        },
      });
    } else {
      console.log('Form is not valid');
      this.validateAllFormFields(this.addTransactionForm);
      alert('Formularz jest niepoprawny!');
    }
  }

  onAddProduct() {
    if (this.addProductForm.valid) {
      console.log(this.addProductForm.value);
      this.auth.addProduct(this.addProductForm.value).subscribe({
        next: (res: any) => {
          alert(res.message);
          window.location.reload();
          this.router.navigate(['dashboard']);
        },
        error: (err: any) => {
          alert('W polu ilość podaj wartość liczbową!');
        },
      });
    } else {
      console.log('Form is not valid  ed');
      this.validateAllFormFields(this.addProductForm);
      alert('Formularz jest niepoprawny!');
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  deleteCustomer(id: any) {
    this.auth.deleteCustomer(id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }

  deleteAllProducts(id: any) {
    this.auth.deleteAllProducts(id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }

  addQuantityProduct(id: any) {
    var quantity = (<HTMLInputElement>document.getElementById('quantityToAdd'))
      .value;
    var w = '';
    console.log(quantity);
    this.auth.addQuantityProduct(w, quantity, id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }

  deleteQuantityProduct(id: any) {
    var quantity = (<HTMLInputElement>document.getElementById('quantityToAdd'))
      .value;
    var w = '';
    console.log(quantity);
    this.auth.deleteQuantityProduct(w, quantity, id).subscribe({
      next: (res: any) => {
        window.location.reload();
        this.router.navigate(['dashboard']);
      },
      error: (err: any) => {
        alert(err?.error.message);
      },
    });
  }
}
