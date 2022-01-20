import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountDetailComponent } from './components/accounts/detail/account-detail/account-detail.component';
import { FormsComponent } from './components/accounts/forms/forms.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { RegisterComponent } from './components/auth/register/register/register.component';
import { UpdatePasswordComponent } from './components/auth/update-password/update-password.component';
import { FormBuildingComponent } from './components/building/form-building/form-building.component';
import { ListBuildingComponent } from './components/building/list-building/list-building.component';
import { FormHospitalComponent } from './components/hospitals/form-hospital/form-hospital.component';
import { ListHospitalsComponent } from './components/hospitals/list-hospitals/list-hospitals.component';
import { IndexComponent } from './components/index/index.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { ProductsComponent } from './components/products/products/products.component';
import { StatsComponent } from './components/stats/stats.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { FormWarehouseProductComponent } from './components/warehouse-product/form-warehouse-product/form-warehouse-product/form-warehouse-product.component';
import { RepositionWarehouseComponent } from './components/warehouse-product/reposition-warehouse/reposition-warehouse.component';
import { WarehouseProductComponent } from './components/warehouse-product/warehouse-product/warehouse-product.component';
import { FormWarehouseComponent } from './components/warehouse/form-warehouse/form-warehouse.component';
import { ListWarehouseComponent } from './components/warehouse/list-warehouse/list-warehouse.component';
import { AdminGuardService } from './guards/admin-guard.service';
import { GestorGuardService } from './guards/gestor-guard.service';
import { RepoGuardService } from './guards/repo-guard.service';
import { TabletGuardService } from './guards/tablet-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'index', component: IndexComponent, canActivate: [GestorGuardService], canActivateChild: [AdminGuardService]},
  {path: 'index/:id', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'accounts', component: AccountsComponent, canActivate: [AdminGuardService]},
  {path: 'accounts/add', component: FormsComponent, canActivate: [AdminGuardService]},
  {path: 'accounts/add/:id', component: FormsComponent, canActivate: [AdminGuardService]},
  {path: 'accounts/detail/:id', component: AccountDetailComponent},
  {path: 'users/add', component: RegisterComponent, canActivate: [AdminGuardService]},
  {path: 'users', component: ListUsersComponent, canActivate: [AdminGuardService]  },
  {path: 'users/:id', component: ListUsersComponent, canActivate: [GestorGuardService], canActivateChild: [AdminGuardService]},
  {path: 'users/add/:id', component: RegisterComponent, canActivate: [GestorGuardService], canActivateChild: [AdminGuardService]},
  {path: 'products', component: ProductsComponent, canActivate: [GestorGuardService], canActivateChild: [AdminGuardService]  },
  {path: 'products/all', component: ListProductComponent, canActivate: [GestorGuardService], canActivateChild: [AdminGuardService]  },
  {path: 'products/:id', component: ProductsComponent, canActivate: [AdminGuardService]  },
  {path: 'hospitals', component: ListHospitalsComponent, canActivate: [GestorGuardService], canActivateChild: [AdminGuardService]},
  {path: 'hospitals/add', component: FormHospitalComponent, canActivate: [GestorGuardService], canActivateChild: [AdminGuardService]},
  {path: 'hospitals/:id', component: FormHospitalComponent, canActivate: [GestorGuardService], canActivateChild: [AdminGuardService]},
  {path: 'buildings', component: ListBuildingComponent},
  {path: 'buildings/add', component: FormBuildingComponent},
  {path: 'buildings/:id', component: FormBuildingComponent},
  {path: 'updatePassword', component: UpdatePasswordComponent},
  {path: 'warehouses', component: ListWarehouseComponent},
  {path: 'warehouse/add', component: FormWarehouseComponent},
  {path: 'warehouse/:id', component: FormWarehouseComponent},
  {path: 'warehouse-product', component: WarehouseProductComponent},
  {path: 'warehouse-product/add', component: FormWarehouseProductComponent},
  {path: 'warehouse-product/:id', component: FormWarehouseProductComponent},
  {path: 'warehouse-reposition/:id', component: RepositionWarehouseComponent, canActivate: [GestorGuardService], canActivateChild: [RepoGuardService]},
  {path: 'stats', component: StatsComponent},


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
