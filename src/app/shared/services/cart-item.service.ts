import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CartItem } from '../models/CartItem';

@Injectable({ providedIn: 'root' })
export class CartItemService {
  constructor(private firestore: Firestore) {}

  getCartItems(userId: string): Observable<CartItem[]> {
    const cartRef = collection(this.firestore, 'CartItems');
    return collectionData(cartRef, { idField: 'id' }) as Observable<CartItem[]>;
  }

  addCartItem(cartItem: Omit<CartItem, 'id'>): Promise<void> {
    const cartRef = collection(this.firestore, 'CartItems');
    return addDoc(cartRef, cartItem).then(() => {});
  }

  updateCartItem(id: string, data: Partial<CartItem>): Promise<void> {
    const cartDoc = doc(this.firestore, `CartItems/${id}`);
    return updateDoc(cartDoc, data);
  }

  deleteCartItem(id: string): Promise<void> {
    const cartDoc = doc(this.firestore, `CartItems/${id}`);
    return deleteDoc(cartDoc);
  }
}