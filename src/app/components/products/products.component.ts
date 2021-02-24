import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/products.service';
import {ProductModel} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/product.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // products: ProductModel[] | null=null;
  products$: Observable<AppDataState<ProductModel[]>>|null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productsService: ProductService, private router: Router ) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data})),
          startWith({dataState: DataStateEnum.LOADING}),
          catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
      );
      /*this.productsService.getAllProducts().subscribe(data=>{
        this.products = data;
        console.log(this.products)
      },error => {
        console.log(error)
      })*/
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(error => of({dataState: DataStateEnum.ERROR, errorMessage: error.message}))
    );
  }

  onSelect(p: ProductModel) {
    console.log('p 1 ', p);
    this.productsService.select(p).subscribe(data => {
      p.selected = data.selected;
    });

    console.log('p 3', p);
  }

  onDelete(p: ProductModel) {
    const v = confirm('etez vous sur suprimer ce produit !');
    if (v == true) {
    this.productsService.deleteProduct(p).subscribe(data => {
      this.onGetAllProducts();
    });
    }
  }

  edit(p: ProductModel) {
    console.log('edit');
  }

  onAddProductProducts() {
    this.router.navigateByUrl('/new-product');
  }
}
