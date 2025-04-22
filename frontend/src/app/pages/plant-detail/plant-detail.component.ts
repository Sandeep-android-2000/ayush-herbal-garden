import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { PlantService } from '../../core/services/plant.service';
import { Plant } from '../../core/models/plant.model';
import { PlantViewerComponent } from '../../shared/components/plant-viewer/plant-viewer.component';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, PlantViewerComponent],
  template: `
    <div *ngIf="plant" class="fade-in pb-20">
      <!-- Hero Section -->
      <section class="relative bg-primary-900 text-white py-20">
        <div class="absolute inset-0 opacity-20" style="background-image: url('{{ plant.image }}'); background-size: cover; background-position: center;"></div>
        <div class="container-custom relative z-10">
          <div class="flex items-center space-x-2 mb-4">
            <a routerLink="/plants" class="text-primary-300 hover:text-white transition-colors">
              Plants
            </a>
            <span class="text-primary-300">›</span>
            <span class="text-white">{{ plant.name }}</span>
          </div>
          
          <div class="flex flex-col md:flex-row gap-10">
            <div class="md:w-1/2">
              <div class="flex gap-3 mb-4">
                <span *ngFor="let system of plant.system" class="px-3 py-1 text-sm font-medium bg-primary-700 text-white rounded-full">{{ system }}</span>
              </div>
              <h1 class="text-4xl md:text-5xl font-bold mb-2">{{ plant.name }}</h1>
              <p class="text-xl text-primary-200 italic mb-6">{{ plant.scientificName }}</p>
              <p class="text-lg mb-8">{{ plant.description }}</p>
              <div class="flex gap-4">
                <a [routerLink]="['/garden']" [queryParams]="{plant: plant.id}" class="btn-primary">View 3D Model</a>
                <button (click)="scrollToSection('medicinal-uses')" class="btn bg-white/10 hover:bg-white/20 backdrop-blur-sm">Learn About Uses</button>
              </div>
            </div>
            
            <div class="md:w-1/2 overflow-hidden rounded-lg shadow-lg">
              <img [src]="plant.image" [alt]="plant.name" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </section>
      
      <!-- 3D Viewer Preview -->
      <section class="bg-gray-900 py-16">
        <div class="container-custom">
          <h2 class="text-3xl font-bold text-white mb-8">Interactive 3D Model</h2>
          <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-80 md:h-96 relative">
            <app-plant-viewer [plantId]="plant.id" [previewMode]="true"></app-plant-viewer>
            <div class="absolute inset-0 flex items-center justify-center">
              <a [routerLink]="['/garden']" [queryParams]="{plant: plant.id}" class="btn-primary text-lg">
                Open Full 3D Viewer
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Medicinal Uses -->
      <section id="medicinal-uses" class="section bg-white">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-10">Medicinal Uses</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div *ngFor="let use of plant.medicinalUses" class="flex items-start p-6 bg-primary-50 rounded-lg">
              <div class="text-primary-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-gray-800">{{ use }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Plant Information -->
      <section class="section bg-gray-50">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-10">Plant Information</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <!-- Parts Used -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4 text-primary-700">Parts Used</h3>
              <div class="flex flex-wrap gap-3">
                <span *ngFor="let part of plant.partUsed" class="px-4 py-2 bg-primary-100 text-primary-800 rounded-full">{{ part }}</span>
              </div>
            </div>
            
            <!-- Cultivation Info -->
            <div class="card">
              <h3 class="text-xl font-bold mb-4 text-primary-700">Cultivation Information</h3>
              <p class="text-gray-700">{{ plant.cultivationInfo }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Related Plants -->
      <section class="section bg-white">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-10">Related Plants</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div *ngFor="let relatedPlant of relatedPlants" class="plant-card overflow-hidden">
              <div class="h-40 overflow-hidden rounded-t-lg">
                <img [src]="relatedPlant.image" [alt]="relatedPlant.name" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
              </div>
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-900 mb-1">{{ relatedPlant.name }}</h3>
                <p class="text-sm text-gray-500 italic mb-3">{{ relatedPlant.scientificName }}</p>
                <a [routerLink]="['/plants', relatedPlant.id]" class="text-primary-600 hover:text-primary-800 font-medium">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <!-- Loading State -->
    <div *ngIf="!plant" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
        <p class="text-primary-600 font-medium">Loading plant information...</p>
      </div>
    </div>
  `,
})
export class PlantDetailComponent implements OnInit {
  plant?: Plant;
  relatedPlants: Plant[] = [];
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private plantService = inject(PlantService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (isNaN(id)) {
        this.router.navigate(['/plants']);
        return;
      }
      
      this.plantService.getPlantById(id).subscribe(plant => {
        if (!plant) {
          this.router.navigate(['/plants']);
          return;
        }
        
        this.plant = plant;
        
        // Get related plants (from the same system)
        if (plant.system?.length > 0) {
          this.plantService.filterPlantsBySystem(plant.system[0]).subscribe(systemPlants => {
            this.relatedPlants = systemPlants
              .filter(p => p.id !== plant.id)
              .slice(0, 3);
          });
        }
        
        // Set page title
        document.title = `${plant.name} | Virtual Herbal Garden`;
      });
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}