import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlantService } from '../../core/services/plant.service';
import { Plant } from '../../core/models/plant.model';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="fade-in">
      <!-- Hero Section -->
      <section class="relative bg-primary-800 text-white py-16">
        <div class="container-custom">
          <h1 class="text-4xl font-bold mb-4">Medicinal Plant Library</h1>
          <p class="text-xl max-w-2xl mb-8">
            Explore our extensive collection of medicinal plants used in AYUSH systems.
            Learn about their properties, uses, and cultivation methods.
          </p>
          
          <!-- Search and Filter -->
          <div class="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div class="flex-grow">
              <input 
                type="text" 
                [(ngModel)]="searchTerm"
                (input)="search()"
                placeholder="Search plants by name or properties..." 
                class="w-full px-4 py-2 rounded-md bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
            </div>
            
            <div>
              <select 
                [(ngModel)]="selectedSystem"
                (change)="filterBySystem()"
                class="w-full px-4 py-2 rounded-md bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Systems</option>
                <option value="Ayurveda">Ayurveda</option>
                <option value="Yoga">Yoga & Naturopathy</option>
                <option value="Unani">Unani</option>
                <option value="Siddha">Siddha</option>
                <option value="Homeopathy">Homeopathy</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Plants Grid -->
      <section class="section bg-gray-50">
        <div class="container-custom">
          <!-- Results count -->
          <div class="mb-8">
            <p class="text-gray-700">Showing {{ plants.length }} medicinal plants</p>
          </div>
          
          <!-- Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let plant of plants" class="plant-card overflow-hidden">
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
          
          <!-- Empty State -->
          <div *ngIf="plants.length === 0" class="text-center py-20">
            <div class="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gray-200 text-gray-500 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">No plants found</h3>
            <p class="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button (click)="resetFilters()" class="btn-primary">Show All Plants</button>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class PlantsComponent implements OnInit {
  plants: Plant[] = [];
  allPlants: Plant[] = [];
  searchTerm: string = '';
  selectedSystem: string = '';

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe(plants => {
      this.plants = plants;
      this.allPlants = plants;
    });
  }

  search(): void {
    if (this.searchTerm.trim() === '') {
      this.resetSearch();
    } else {
      this.plantService.searchPlants(this.searchTerm).subscribe(plants => {
        this.plants = plants;
        if (this.selectedSystem) {
          this.plants = this.plants.filter(plant => 
            plant.system.includes(this.selectedSystem)
          );
        }
      });
    }
  }

  filterBySystem(): void {
    if (this.selectedSystem === '') {
      this.resetFilters();
      if (this.searchTerm.trim() !== '') {
        this.search();
      }
    } else {
      this.plantService.filterPlantsBySystem(this.selectedSystem).subscribe(plants => {
        this.plants = plants;
        if (this.searchTerm.trim() !== '') {
          this.plants = this.plants.filter(plant => 
            plant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
            plant.scientificName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            plant.description.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
      });
    }
  }

  resetSearch(): void {
    this.searchTerm = '';
    if (this.selectedSystem) {
      this.filterBySystem();
    } else {
      this.plants = this.allPlants;
    }
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedSystem = '';
    this.plants = this.allPlants;
  }
}