import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { authGuard } from './auth.guard';
import { StoresComponent } from './stores/stores.component';
import { OrderitemComponent } from './orderitem/orderitem.component';
import { StoredetailComponent } from './storedetail/storedetail.component';
import { StorecreateComponent } from './storecreate/storecreate.component';
import { StroeEditComponent } from './stroe-edit/stroe-edit.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { AdminComponent } from './admin/admin.component';
import { OrderListComponent } from './orderlist/orderlist.component';
import { OrdercreateComponent } from './ordercreate/ordercreate.component';
import { OrdereditComponent } from './orderedit/orderedit.component';
import { DeliverystaffComponent } from './deliverystaff/deliverystaff.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { TrackerComponent } from './tracker/tracker.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  // { path: '',   redirectTo: '/CompanyList', pathMatch: 'full' },\
  {
      path: '',
      component: ProductListComponent,
      canActivate: [authGuard] // Apply AuthGuard here
    },
    // {
    //   path: 'admin',
    //   component: AddEmployeeComponent,
    //   canActivate: [roleGuard], // Apply RoleGuard here
    //   data: { requiredRole: 'Admin' } // Pass the required role to RoleGuard
    // },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'products',
      component: ProductListComponent
    },
    {
      path: 'store',
      component: StoresComponent
    },
     {
      path: 'orderitem',
      component: OrderitemComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'order',
      component: OrderListComponent
    },
    {
      path: 'Delivery',
      component: DeliverystaffComponent
    },
    { path: 'store-details/:id', component: StoredetailComponent},
  { path: 'edit-store/:id', component: StroeEditComponent },
  { path: 'create-store', component: StorecreateComponent },
  { path: 'producttable', component: ProductTableComponent },
  
  { path: 'products-create', component: ProductaddComponent },
  { path: 'products-edit/:id', component: ProducteditComponent },
  { path: 'products-id/:id', component: ProductdetailComponent },
  { path: 'admin', component: AdminComponent },
{ path : 'ordercreate', component: OrdercreateComponent},
{ path : 'orderedit/:id', component: OrdereditComponent},
{ path : 'orderdetail/:id', component: OrdereditComponent},
{ path : 'customerlist', component: CustomerListComponent},
{ path : 'track', component: TrackerComponent},
// { path : 'cart', component: CartComponent}
    // {
    //   path: 'forbidden',
    //   component: ForbiddenComponent
    // },
  ];