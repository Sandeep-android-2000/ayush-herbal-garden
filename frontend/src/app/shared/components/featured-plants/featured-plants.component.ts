import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PlantService } from '../../../core/services/plant.service';
import { Plant } from '../../../core/models/plant.model';

@Component({
  selector: 'app-featured-plants',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div *ngFor="let plant of featuredPlants" class="plant-card overflow-hidden">
        <div class="h-52 overflow-hidden rounded-t-lg">
          <img [src]="plant.image" [alt]="plant.name" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
        </div>
        <div class="p-6">
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-xl font-bold text-gray-900">{{ plant.name }}</h3>
            <span class="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">{{ plant.system[0] }}</span>
          </div>
          <p class="text-sm text-gray-500 italic mb-3">{{ plant.scientificName }}</p>
          <p class="text-gray-700 mb-4 line-clamp-3">{{ plant.description }}</p>
          <div class="flex justify-between items-center">
            <a [routerLink]="['/plants', plant.id]" class="text-primary-600 hover:text-primary-800 font-medium">View Details</a>
            <a [routerLink]="['/garden']" [queryParams]="{plant: plant.id}" class="text-accent-600 hover:text-accent-800 font-medium">View 3D Model</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FeaturedPlantsComponent implements OnInit {
  featuredPlants: Plant[] = [];

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.plantService.getFeaturedPlants(3).subscribe(plants => {
      this.featuredPlants = plants;
    });
  }
}