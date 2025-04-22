import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav [class]="scrolled ? 'bg-white shadow-md' : 'bg-transparent'" 
         class="fixed w-full top-0 z-50 transition-all duration-300">
      <div class="container-custom py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center space-x-2">
            <span class="text-primary-600 text-2xl font-serif font-bold">Virtual Herbal Garden</span>
          </a>
          
          <!-- Desktop Menu -->
          <div class="hidden md:flex space-x-8">
            <a routerLink="/" 
               routerLinkActive="text-primary-600 font-medium"
               [routerLinkActiveOptions]="{exact: true}" 
               class="text-gray-700 hover:text-primary-500 transition-colors">Home</a>
            <a routerLink="/garden" 
               routerLinkActive="text-primary-600 font-medium" 
               class="text-gray-700 hover:text-primary-500 transition-colors">Garden</a>
            <a routerLink="/plants" 
               routerLinkActive="text-primary-600 font-medium" 
               class="text-gray-700 hover:text-primary-500 transition-colors">Plants</a>
            <a routerLink="/tours" 
               routerLinkActive="text-primary-600 font-medium" 
               class="text-gray-700 hover:text-primary-500 transition-colors">Tours</a>
            <a routerLink="/about" 
               routerLinkActive="text-primary-600 font-medium" 
               class="text-gray-700 hover:text-primary-500 transition-colors">About</a>
          </div>
          
          <!-- Mobile Menu Button -->
          <button (click)="toggleMenu()" class="md:hidden text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path *ngIf="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path *ngIf="menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div *ngIf="menuOpen" class="md:hidden mt-4 pb-4">
          <div class="flex flex-col space-y-4">
            <a routerLink="/" 
               (click)="toggleMenu()"
               routerLinkActive="text-primary-600 font-medium"
               [routerLinkActiveOptions]="{exact: true}" 
               class="text-gray-700 hover:text-primary-500 transition-colors">Home</a>
            <a routerLink="/garden" 
               (click)="toggleMenu()"
               routerLinkActive="text-primary-600 font-medium" 
               class="text-gray-700 hover:text-primary-500 transition-colors">Garden</a>
            <a routerLink="/plants" 
               (click)="toggleMenu()"
               routerLinkActive="text-primary-600 font-medium" 
               class="text-gray-700 hover:text-primary-500 transition-colors">Plants</a>
            <a routerLink="/tours" 
               (click)="toggleMenu()"
               routerLinkActive="text-primary-600 font-medium" 
               class="text-gray-700 hover:text-primary-500 transition-colors">Tours</a>
            <a routerLink="/about" 
               (click)="toggleMenu()"
               routerLinkActive="text-primary-600 font-medium" 
               class="text-gray-700 hover:text-primary-500 transition-colors">About</a>
          </div>
        </div>
      </div>
    </nav>
    <!-- Spacer to prevent content from being hidden under fixed navbar -->
    <div class="h-20"></div>
  `,
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}