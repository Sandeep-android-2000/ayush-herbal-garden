import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToursService } from '../../core/services/tours.service';
import { Tour } from '../../core/models/tour.model';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fade-in">
      <!-- Hero Section -->
      <section class="relative bg-secondary-700 text-white py-16">
        <div class="container-custom">
          <h1 class="text-4xl font-bold mb-4">Virtual Garden Tours</h1>
          <p class="text-xl max-w-2xl mb-8">
            Experience guided virtual tours through themed collections of medicinal plants.
            Learn about plants grouped by their health benefits and traditional uses.
          </p>
        </div>
      </section>
      
      <!-- Tours Grid -->
      <section class="section bg-gray-50">
        <div class="container-custom">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div *ngFor="let tour of tours" class="card overflow-hidden">
              <div class="h-48 overflow-hidden">
                <img [src]="tour.image" [alt]="tour.title" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
              </div>
              <div class="p-6">
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-xl font-bold text-gray-900">{{ tour.title }}</h3>
                  <div class="flex space-x-2">
                    <span class="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">{{ tour.duration }}</span>
                    <span class="px-2 py-1 text-xs font-semibold bg-accent-100 text-accent-800 rounded-full">{{ tour.level }}</span>
                  </div>
                </div>
                <p class="text-gray-700 mb-6">{{ tour.description }}</p>
                <a [routerLink]="['/tours', tour.id]" class="btn-primary">Start Tour</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="py-16 bg-secondary-600 text-white">
        <div class="container-custom text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Create Your Own Virtual Tour</h2>
          <p class="text-xl mb-8 max-w-2xl mx-auto">
            Coming soon: The ability to create and share your own custom medicinal plant tours!
          </p>
          <button class="btn bg-white text-secondary-700 hover:bg-gray-100 cursor-not-allowed opacity-70">
            Coming Soon
          </button>
        </div>
      </section>
    </div>
  `,
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];

  constructor(private toursService: ToursService) {}

  ngOnInit(): void {
    this.toursService.getAllTours().subscribe(tours => {
      this.tours = tours;
    });
  }
}