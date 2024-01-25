import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

public url: string = "http://localhost:3000/products"
public urlBasket: string = "http://localhost:3000/basket"

constructor(private http: HttpClient) { }

public getProducts()
{
  return this.http.get<IProducts[]>(this.url);
}

public getProduct(id: number)
{
  return this.http.get<IProducts>(`${this.url}/${id}`);
}

public postProduct(product: IProducts){
  return this.http.post<IProducts>(this.url, product)
}

public deleteProduct(id: number){
  return this.http.delete<any>(`${this.url}/${id}`);
}

public updateProduct(product: IProducts){
  return this.http.put<IProducts>(`${this.url}/${product.id}`, product);

}

public postProductToBasket(product: IProducts){
  return this.http.post<IProducts>(this.urlBasket, product)
}

public getProductFromBasket(){
  return this.http.get<IProducts[]>(this.urlBasket);

}

public updateProductToBasket(product: IProducts){
  return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);

}

}


