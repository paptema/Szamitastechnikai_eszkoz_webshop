import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Input() userName: string | null = null;

  @Output() logoutEvent = new EventEmitter<void>();
  @Output() profileClicked = new EventEmitter<void>();
  @Output() menuClosed = new EventEmitter<void>();
  @Output() menuOpened = new EventEmitter<void>();

  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {
    console.log("constructor called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
    if (this.sidenav) {
      this.sidenav.closedStart.subscribe(() => this.menuClosed.emit());
      this.sidenav.openedStart.subscribe(() => this.menuOpened.emit());
    }
  }

  onProfileClick() {
    this.profileClicked.emit();
    this.closeMenu();
  }

  closeMenu() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  logout() {
    this.authService.signOut().then(() => {
      this.logoutEvent.emit();
      this.closeMenu();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}