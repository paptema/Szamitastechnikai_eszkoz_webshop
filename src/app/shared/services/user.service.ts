import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    role: string | null
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            role: null
          });
        }

        return from(this.fetchUserRole(authUser.uid));
      })
    );
  }

  private async fetchUserRole(userId: string): Promise<{
    user: User | null,
    role: string | null
  }> {
    try {
      const userDocRef = doc(this.firestore, `Users/${userId}`);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return {
          user: null,
          role: null
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      return {
        user,
        role: user.role
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        role: null
      };
    }
  }
}