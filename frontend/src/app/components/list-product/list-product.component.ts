import { Component, Input, OnInit  } from '@angular/core';
import {ProductsRepositoryService} from '../../services/products-repository.service'
import { ProductEntity } from '../../entities/ProductEntity';
import {FilterService} from "../../services/filter.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  availableProducts: ProductEntity[] = [];
  products: ProductEntity[] = [];
  isLoadingProducts: boolean = false;
  constructor(private httpService: ProductsRepositoryService, private filterService: FilterService) {
  }
  title = 'TP3';

  ngOnInit() {
    this.isLoadingProducts = true;

    this.httpService.getData().then((data:any)=>{
      data.map((d:any)=>{
        this.products.push(new ProductEntity(d.title,d.price))
        this.availableProducts.push(new ProductEntity(d.title,d.price))
      })
    }).then(()=>{
      this.isLoadingProducts = false;
    })
  }

  filter() {
    this.products = this.availableProducts.filter(product =>
      (product.price <= this.filterService.filterPrice || this.filterService.filterPrice === 0) &&
      (product.title.toLowerCase().includes(this.filterService.filterName.toLowerCase()) || this.filterService.filterName === "")
    )

    console.log("this.products", this.products);
  }
}
