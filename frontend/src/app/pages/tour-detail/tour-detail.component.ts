import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToursService } from '../../core/services/tours.service';
import { PlantService } from '../../core/services/plant.service';
import { Tour } from '../../core/models/tour.model';
import { Plant } from '../../core/models/plant.model';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="tour" class="fade-in">
      <!-- Hero Section -->
      <section class="relative min-h-[40vh] bg-secondary-800 text-white flex items-center">
        <div class="absolute inset-0 opacity-20" style="background-image: url('{{ tour.image }}'); background-size: cover; background-position: center;"></div>
        <div class="container-custom relative z-10 py-16">
          <div class="flex items-center space-x-2 mb-4">
            <a routerLink="/tours" class="text-secondary-300 hover:text-white transition-colors">
              Tours
            </a>
            <span class="text-secondary-300">›</span>
            <span class="text-white">{{ tour.title }}</span>
          </div>
          
          <div class="max-w-2xl">
            <div class="flex space-x-3 mb-4">
              <span class="px-3 py-1 text-sm font-medium bg-secondary-700 text-white rounded-full">{{ tour.duration }}</span>
              <span class="px-3 py-1 text-sm font-medium bg-secondary-700 text-white rounded-full">{{ tour.level }}</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-6">{{ tour.title }}</h1>
            <p class="text-xl mb-8">{{ tour.description }}</p>
            <button (click)="startTour()" class="btn-accent">Begin Virtual Tour</button>
          </div>
        </div>
      </section>
      
      <!-- Tour Plants -->
      <section class="section bg-gray-50">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-10">Plants in This Tour</h2>
          
          <div class="space-y-8">
            <div *ngFor="let plant of tourPlants; let i = index" class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/3 h-64 md:h-auto">
                  <img [src]="plant.image" [alt]="plant.name" class="w-full h-full object-cover">
                </div>
                <div class="md:w-2/3 p-6">
                  <div class="flex justify-between items-start mb-3">
                    <div>
                      <div class="flex gap-2 mb-2">
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary-500 text-white font-bold">{{ i + 1 }}</span>
                        <span *ngFor="let system of plant.system" class="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">{{ system }}</span>
                      </div>
                      <h3 class="text-2xl font-bold text-gray-900">{{ plant.name }}</h3>
                      <p class="text-gray-500 italic">{{ plant.scientificName }}</p>
                    </div>
                  </div>
                  <p class="text-gray-700 mb-6">{{ plant.description | slice:0:200 }}...</p>
                  <div class="flex flex-wrap gap-4">
                    <a [routerLink]="['/plants', plant.id]" class="btn-primary">View Details</a>
                    <a [routerLink]="['/garden']" [queryParams]="{plant: plant.id}" class="btn bg-accent-500 text-white hover:bg-accent-600">View 3D Model</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Related Tours -->
      <section class="section bg-white">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-8">You May Also Like</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div *ngFor="let relatedTour of relatedTours" class="card overflow-hidden">
              <div class="h-40 overflow-hidden">
                <img [src]="relatedTour.image" [alt]="relatedTour.title" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-900 mb-1">{{ relatedTour.title }}</h3>
                <div class="flex space-x-2 mb-3">
                  <span class="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">{{ relatedTour.duration }}</span>
                </div>
                <a [routerLink]="['/tours', relatedTour.id]" class="text-primary-600 hover:text-primary-800 font-medium">View Tour</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Loading State -->
    <div *ngIf="!tour" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-500 mb-4"></div>
        <p class="text-secondary-600 font-medium">Loading tour information...</p>
      </div>
    </div>
  `,
})
export class TourDetailComponent implements OnInit {
  tour?: Tour;
  tourPlants: Plant[] = [];
  relatedTours: Tour[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toursService: ToursService,
    private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (isNaN(id)) {
        this.router.navigate(['/tours']);
        return;
      }
      
      this.toursService.getTourById(id).subscribe(tour => {
        if (!tour) {
          this.router.navigate(['/tours']);
          return;
        }
        
        this.tour = tour;
        document.title = `${tour.title} | Virtual Herbal Garden`;
        
        // Get plants for this tour
        this.loadTourPlants(tour.plantIds);
        
        // Get related tours
        this.toursService.getAllTours().subscribe(tours => {
          this.relatedTours = tours
            .filter(t => t.id !== tour.id)
            .slice(0, 3);
        });
      });
    });
  }

  loadTourPlants(plantIds: number[]): void {
    this.tourPlants = [];
    
    plantIds.forEach(id => {
      this.plantService.getPlantById(id).subscribe(plant => {
        if (plant) {
          this.tourPlants.push(plant);
        }
      });
    });
  }

  startTour(): void {
    if (this.tour && this.tourPlants.length > 0) {
      this.router.navigate(['/garden'], { queryParams: { plant: this.tourPlants[0].id } });
    }
  }
}