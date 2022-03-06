import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountDetailComponent } from './components/accounts/detail/account-detail/account-detail.component';
import { FormsComponent } from './components/accounts/forms/forms.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { RegisterComponent } from './components/auth/register/register/register.component';
import { UpdatePasswordComponent } from './components/auth/update-password/update-password.component';
import { FormBuildingComponent } from './components/building/form-building/form-building.component';
import { ListBuildingComponent } from './components/building/list-building/list-building.component';
import { FormHospitalComponent } from './components/hospitals/form-hospital/form-hospital.component';
import { ListHospitalsComponent } from './components/hospitals/list-hospitals/list-hospitals.component';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { ProductsComponent } from './components/products/products/products.component';
import { EmptyStockComponent } from './components/stats/empty-stock/empty-stock.component';
import { ReadsComponent } from './components/stats/reads/reads.component';
import { StatsComponent } from './components/stats/stats.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { FormWarehouseProductComponent } from './components/warehouse-product/form-warehouse-product/form-warehouse-product/form-warehouse-product.component';
import { RepositionWarehouseComponent } from './components/warehouse-product/reposition-warehouse/reposition-warehouse.component';
import { WarehouseProductComponent } from './components/warehouse-product/warehouse-product/warehouse-product.component';
import { FormWarehouseComponent } from './components/warehouse/form-warehouse/form-warehouse.component';
import { ListWarehouseComponent } from './components/warehouse/list-warehouse/list-warehouse.component';
import { RoleGuardService } from './guards/role-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'index', component: IndexComponent},
  {path: 'index/:id', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'accounts', component: AccountsComponent, canActivate: [RoleGuardService], data:{expectedRole:'ROLE_ADMIN'}},
  {path: 'accounts/add', component: FormsComponent, canActivate: [RoleGuardService], data:{expectedRole:'ROLE_ADMIN'}},
  {path: 'accounts/add/:id', component: FormsComponent, canActivate: [RoleGuardService], data:{expectedRole:'ROLE_ADMIN'}},
  {path: 'accounts/detail/:id', component: AccountDetailComponent, canActivate: [RoleGuardService], data:{expectedRole:'ROLE_ADMIN'}},
  {path: 'users/add', component: RegisterComponent, canActivate: [RoleGuardService], data:{expectedRole:'ROLE_ADMIN'}},
  {path: 'users', component: ListUsersComponent, canActivate: [RoleGuardService], data:{expectedRole:'ROLE_ADMIN'}},
  {path: 'users/:id', component: ListUsersComponent, canActivate: [RoleGuardService], data:{expectedRole:'ROLE_GESTOR'}},
  {path: 'users/add/:id', component: RegisterComponent, canActivate: [RoleGuardService], data:{expectedRole:'ROLE_GESTOR'}},
  {path: 'products', component: ProductsComponent},
  {path: 'products/all', component: ListProductComponent},
  {path: 'products/:id', component: ProductsComponent},
  {path: 'hospitals', component: ListHospitalsComponent},
  {path: 'hospitals/add', component: FormHospitalComponent},
  {path: 'hospitals/:id', component: FormHospitalComponent},
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
  {path: 'warehouse-reposition/:id', component: RepositionWarehouseComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'empty-stock', component: EmptyStockComponent},
  {path: 'reads', component: ReadsComponent},
  {path: '**', component: NotFoundComponent }


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
