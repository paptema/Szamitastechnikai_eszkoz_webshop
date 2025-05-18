import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "szamtech-eszkoz-webshop", appId: "1:921808328994:web:aceb233299168e5b116d7b", storageBucket: "szamtech-eszkoz-webshop.firebasestorage.app", apiKey: "AIzaSyCUP7AckrH6VfoHQ39g5zhGiH8m1zifbDs", authDomain: "szamtech-eszkoz-webshop.firebaseapp.com", messagingSenderId: "921808328994" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
