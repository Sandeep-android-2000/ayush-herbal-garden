import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FeaturedPlantsComponent } from '../../shared/components/featured-plants/featured-plants.component';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FeaturedPlantsComponent, HeroSectionComponent],
  template: `
    <div class="fade-in">
      <!-- Hero Section -->
      <app-hero-section></app-hero-section>
      
      <!-- Features Section -->
      <section class="section bg-white">
        <div class="container-custom">
          <h2 class="text-3xl md:text-4xl text-center font-bold mb-12">Explore the Virtual Herbal Garden</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="card text-center grow-animation">
              <div class="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 text-primary-600 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Interactive 3D Models</h3>
              <p class="text-gray-600 mb-4">Explore medicinal plants from every angle with our detailed, interactive 3D models.</p>
              <a routerLink="/garden" class="text-primary-600 hover:text-primary-800 font-medium">Explore Garden →</a>
            </div>
            
            <!-- Feature 2 -->
            <div class="card text-center grow-animation">
              <div class="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 text-primary-600 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Medicinal Knowledge</h3>
              <p class="text-gray-600 mb-4">Access detailed information about each plant's medicinal properties and traditional uses.</p>
              <a routerLink="/plants" class="text-primary-600 hover:text-primary-800 font-medium">View Plants →</a>
            </div>
            
            <!-- Feature 3 -->
            <div class="card text-center grow-animation">
              <div class="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 text-primary-600 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Virtual Tours</h3>
              <p class="text-gray-600 mb-4">Take guided virtual tours through themed collections of plants for specific health benefits.</p>
              <a routerLink="/tours" class="text-primary-600 hover:text-primary-800 font-medium">Join Tours →</a>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Featured Plants Section -->
      <section class="section bg-gray-50">
        <div class="container-custom">
          <div class="flex justify-between items-center mb-10">
            <h2 class="text-3xl font-bold">Featured Medicinal Plants</h2>
            <a routerLink="/plants" class="btn-primary">View All Plants</a>
          </div>
          
          <app-featured-plants></app-featured-plants>
        </div>
      </section>
      
      <!-- AYUSH Systems Section -->
      <section class="section bg-white">
        <div class="container-custom">
          <h2 class="text-3xl md:text-4xl text-center font-bold mb-12">AYUSH Medical Systems</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <!-- Ayurveda -->
            <div class="card bg-accent-50 text-center">
              <h3 class="text-xl font-bold mb-3 text-secondary-700">Ayurveda</h3>
              <p class="text-gray-700">Ancient Indian system of natural healing focused on balance.</p>
            </div>
            
            <!-- Yoga -->
            <div class="card bg-accent-50 text-center">
              <h3 class="text-xl font-bold mb-3 text-secondary-700">Yoga</h3>
              <p class="text-gray-700">Physical, mental, and spiritual practices for holistic health.</p>
            </div>
            
            <!-- Unani -->
            <div class="card bg-accent-50 text-center">
              <h3 class="text-xl font-bold mb-3 text-secondary-700">Unani</h3>
              <p class="text-gray-700">Traditional Persian medicine system based on four humors.</p>
            </div>
            
            <!-- Siddha -->
            <div class="card bg-accent-50 text-center">
              <h3 class="text-xl font-bold mb-3 text-secondary-700">Siddha</h3>
              <p class="text-gray-700">Ancient Tamil system focusing on spiritual and physical wellness.</p>
            </div>
            
            <!-- Homeopathy -->
            <div class="card bg-accent-50 text-center">
              <h3 class="text-xl font-bold mb-3 text-secondary-700">Homeopathy</h3>
              <p class="text-gray-700">Alternative medicine based on the principle of similars.</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="py-16 bg-primary-600 text-white">
        <div class="container-custom text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Explore the Virtual Garden?</h2>
          <p class="text-xl mb-8 max-w-2xl mx-auto">Discover the healing properties of medicinal plants through interactive 3D models and comprehensive information.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/garden" class="btn bg-white text-primary-700 hover:bg-gray-100">Explore the Garden</a>
            <a routerLink="/plants" class="btn border-2 border-white text-white hover:bg-white hover:text-primary-700">Browse Plants</a>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {
  
}