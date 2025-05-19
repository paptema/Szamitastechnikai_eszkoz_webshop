import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private firestore: Firestore) {}

  getCategories(): Observable<Category[]> {
    const categoriesRef = collection(this.firestore, 'Categories');
    return collectionData(categoriesRef, { idField: 'id' }) as Observable<Category[]>;
  }
}
