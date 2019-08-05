import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 


import { Product } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productsDoc: AngularFirestoreDocument<Product>;

 

  constructor(public db: AngularFirestore) {
    //this.products = this.db.collection('products').valueChanges();
    this.productsCollection = this.db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => { 
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      })
    }));

  }

    getProducts(){
      return this.products;
    }

    addProducts(product: Product){
      this.productsCollection.add(product);
    }
  }
