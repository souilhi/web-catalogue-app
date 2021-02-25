import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

   // @ts-ignore
  productFormGroup: FormGroup;
  submitted:boolean=false;
  constructor(private fb: FormBuilder, private product:ProductService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    });
  }
/*

* */
  saveProduct() {
    this.submitted = true;
    if (this.productFormGroup.invalid) return;
    this.product.save(this.productFormGroup.value).subscribe(data =>{
      alert("succes savaing product")
    })
    console.log(this.productFormGroup.value)
  }
}
