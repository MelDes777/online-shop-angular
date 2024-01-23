import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

public url: string = "http://localhost:3000/products"

constructor(private http: HttpClient) { }

public getProducts()
{
  return this.http.get<IProducts[]>(this.url);
}

public getProduct(id: number)
{
  return this.http.get<IProducts>(`${this.url}/${id}`);
}

}


