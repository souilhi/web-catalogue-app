import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/products.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  // @ts-ignore
  productId: number;
  // @ts-ignore
  productFormGroup:FormGroup
  submitted:boolean=false;
  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductService,
              private fb: FormBuilder) {
    this.productId = activatedRoute.snapshot.params.id
  }

  ngOnInit(): void {
    this.productService.getProducts(this.productId)
      .subscribe(product=>{
        this.productFormGroup = this.fb.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.name,Validators.required],
          available:[product.name,Validators.required]
        })
      })
  }

  updateProduct() {
    console.log("update product",this.productFormGroup.value)
    this.productService.updateProducts(this.productFormGroup.value)
      .subscribe(data=>{
        alert("Product Successfuly Updated")
      })
  }
}
