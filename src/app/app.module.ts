import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login/login.component';
import { RegisterComponent } from './components/auth/register/register/register.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsComponent } from './components/accounts/forms/forms.component';
import { interceptorProvider } from './services/interceptors.service';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderPipe } from 'ngx-order-pipe';
import { AccountDetailComponent } from './components/accounts/detail/account-detail/account-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UserPipe } from './pipes/user.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/index/index.component';
import { ProductsComponent } from './components/products/products/products.component';
import { AccountPipe } from './pipes/account.pipe';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { ProductPipe } from './pipes/product.pipe';
import { ListHospitalsComponent } from './components/hospitals/list-hospitals/list-hospitals.component';
import { FormHospitalComponent } from './components/hospitals/form-hospital/form-hospital.component';
import { HospitalPipe } from './pipes/hospital.pipe';
import { ListBuildingComponent } from './components/building/list-building/list-building.component';
import { FormBuildingComponent } from './components/building/form-building/form-building.component';
import { BuildingPipe } from './pipes/building.pipe';
import { ListWarehouseComponent } from './components/warehouse/list-warehouse/list-warehouse.component';
import { FormWarehouseComponent } from './components/warehouse/form-warehouse/form-warehouse.component';
import { WarehousePipe } from './pipes/warehouse.pipe';
import { UpdatePasswordComponent } from './components/auth/update-password/update-password.component';
import { ListWarehouseProductComponent } from './components/warehouse-product/list-warehouse-product/list-warehouse-product/list-warehouse-product.component';
import { FormWarehouseProductComponent } from './components/warehouse-product/form-warehouse-product/form-warehouse-product/form-warehouse-product.component';
import { WarehouseProductComponent } from './components/warehouse-product/warehouse-product/warehouse-product.component';
import { RepositionWarehouseComponent } from './components/warehouse-product/reposition-warehouse/reposition-warehouse.component';
import { StatsComponent } from './components/stats/stats.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    IndexComponent,
    AccountsComponent,
    FormsComponent,
    FilterPipe,
    AccountDetailComponent,
    SidenavComponent,
    ListUsersComponent,
    UserPipe,
    ProductsComponent,
    AccountPipe,
    ListProductComponent,
    ProductPipe,
    ListHospitalsComponent,
    FormHospitalComponent,
    HospitalPipe,
    ListBuildingComponent,
    FormBuildingComponent,
    BuildingPipe,
    ListWarehouseComponent,
    FormWarehouseComponent,
    UpdatePasswordComponent,
    WarehousePipe,
    ListWarehouseProductComponent,
    FormWarehouseProductComponent,
    WarehouseProductComponent,
    RepositionWarehouseComponent,
    StatsComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FontAwesomeModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
