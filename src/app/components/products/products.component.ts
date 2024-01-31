import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  
  constructor(
    private ProductsService: ProductsService,
    public dialog: MatDialog
    ) {}
    
    products: IProducts[];
    productsSubscription: Subscription;

    basket: IProducts[];
    basketSubscribe: Subscription;

    canEdit: boolean = false;
    canView: boolean = false;

  ngOnInit(): void {
    // .. Запрос информации доступа

    this.canEdit = true;

    this.productsSubscription = this.ProductsService.getProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );

    this.basketSubscribe = this.ProductsService.getProductFromBasket().subscribe((data) =>
    this.basket = data)
  }

  public addToBasket(product: IProducts){
    product.quantity = 1;
    
    let findItem;

    if(this.basket.length > 0){
      findItem = this.basket.find((item)=> item.id === product.id)
      if(findItem){
        this.updateToBasket(findItem)
      }
      else{
        this.postToBasket(product)
      }

    }else{
      this.postToBasket(product);
    }
  }

  public postToBasket(product: IProducts){
    this.ProductsService.postProductToBasket(product).subscribe((data) => 
    this.basket.push(data));
  }

  public updateToBasket(product: IProducts){
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data)=>
    {
      product = data;

    })
  }

  public deleteItem(id: number) {
    console.log(id);
    this.ProductsService.deleteProduct(id).subscribe(() =>
      this.products.find((item) => {
        if (id === item.id) {
          const idx = this.products.findIndex((data) => data.id === id);
          this.products.splice(idx, 1);
        }
      })
    );
  }

  openDialog(product?: IProducts): void {
    /* Это 1-ый способ
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '700px',
      data: 123
    });
    */

    // Это 2-ой способ
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data && data.id) {
          this.updateData(data);
        } else {
          this.postData(data);
        }
      }
    });
  }

  public postData(data: IProducts) {
    this.ProductsService.postProduct(data).subscribe((data) =>
      this.products.push(data)
    );
  }

  public updateData(product: IProducts) {
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((product) => {
        if (product.id === data.id) return data;
        else return product;
      });
    });
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    if (this.basketSubscribe) {
      this.basketSubscribe.unsubscribe();
    }
  }
}
