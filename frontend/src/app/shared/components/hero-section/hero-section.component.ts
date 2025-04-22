import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative min-h-screen-75 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603436362066-bde96f31e3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
        <div class="absolute inset-0 bg-primary-900/40 backdrop-filter"></div>
      </div>
      
      <!-- Content -->
      <div class="container-custom relative z-10 flex flex-col justify-center items-start h-full pt-32 pb-20">
        <div class="max-w-2xl text-white">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeUpEntrance">
            Explore the Healing Power of Medicinal Plants
          </h1>
          <p class="text-xl mb-8 text-white/90 animate-fadeUpEntrance delay-100">
            Discover the world of AYUSH medicinal plants through interactive 3D models and comprehensive information.
          </p>
          <div class="flex flex-wrap gap-4 animate-fadeUpEntrance delay-200">
            <a routerLink="/garden" class="btn-primary text-lg px-6 py-3">Explore Garden</a>
            <a routerLink="/plants" class="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 text-lg px-6 py-3">View Plants</a>
          </div>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  `,
  styles: [`
    @keyframes fadeUpEntrance {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fadeUpEntrance {
      animation: fadeUpEntrance 0.8s ease-out forwards;
    }
    
    .delay-100 {
      animation-delay: 0.1s;
    }
    
    .delay-200 {
      animation-delay: 0.2s;
    }
  `]
})
export class HeroSectionComponent {

}