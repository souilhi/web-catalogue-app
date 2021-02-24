import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import {ProductAddComponent} from './components/products/product-add/product-add.component';

const routes: Routes = [
{ path : 'products', component : ProductsComponent},
  { path : 'new-product', component : ProductAddComponent},
{ path : '', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
