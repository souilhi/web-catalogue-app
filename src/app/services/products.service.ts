import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ProductModel} from '../model/product.model';


@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(private http: HttpClient) {
  }
  getAllProducts(): Observable<ProductModel[]>{
    const host = environment.host;
    return this.http.get<ProductModel[]>(host + 'products');
  }
  getSelectedProducts(): Observable<ProductModel[]>{
    const host = environment.host;
    return this.http.get<ProductModel[]>(host + 'products?selected=true');
  }
  getAvailableProducts(): Observable<ProductModel[]>{
    const host = environment.host;
    return this.http.get<ProductModel[]>(host + 'products?available=true');
  }
  searchProducts(keyword: string): Observable<ProductModel[]>{
    const host = environment.host;
    return this.http.get<ProductModel[]>(host + 'products?name_like=' + keyword);
  }
  select(selectedProduct: ProductModel): Observable<ProductModel>{
    const host = environment.host;
    selectedProduct.selected = !selectedProduct.selected;
    return this.http.put<ProductModel>(host + 'products/' + selectedProduct.id, selectedProduct);
  }
  deleteProduct(selectedProduct: ProductModel): Observable<void>{
    const host = environment.host;
    selectedProduct.selected = !selectedProduct.selected;
    return this.http.delete<void>(host + 'products/' + selectedProduct.id);
  }
  save(Product: ProductModel): Observable<ProductModel>{
    const host = environment.host;
    return this.http.post<ProductModel>(host + 'products', Product);
  }
  getProducts(id:number): Observable<ProductModel>{
    const host = environment.host;
    return this.http.get<ProductModel>(host + 'products/'+id);
  }
  updateProducts(product:ProductModel): Observable<ProductModel>{
    const host = environment.host;
    return this.http.put<ProductModel>(host + 'products/'+product.id,product);
  }
}
