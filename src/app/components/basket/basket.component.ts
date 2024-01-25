import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  basket: IProducts[];
  basketSubscription: Subscription;


  ngOnInit() {
    this.basketSubscription = this.productService.getProductFromBasket().subscribe((data) => this.basket = data)
  }

  ngOnDestroy(){
    if(this.basketSubscription) this.basketSubscription.unsubscribe();
  }

}
