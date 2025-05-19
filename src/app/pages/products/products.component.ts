import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/Product';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { CurrencyHufPipe } from '../../shared/pipes/currency-huf.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, CurrencyHufPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  getImagePath(imageUrl?: string): string {
    return imageUrl ? `products/${imageUrl}` : 'products/default.jpg';
  }
}
