import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlantViewerComponent } from '../../shared/components/plant-viewer/plant-viewer.component';
import { PlantService } from '../../core/services/plant.service';
import { Plant } from '../../core/models/plant.model';

@Component({
  selector: 'app-garden',
  standalone: true,
  imports: [CommonModule, PlantViewerComponent],
  template: `
    <div class="flex flex-col lg:flex-row h-screen">
      <!-- 3D Viewer Area -->
      <div class="lg:w-3/4 h-[60vh] lg:h-screen bg-gray-900 relative flex flex-col">
        <!-- Plant Viewer -->
        <div class="flex-grow">
          <app-plant-viewer [plantId]="selectedPlantId"></app-plant-viewer>
        </div>
      </div>
      
      <!-- Plant Selection Sidebar -->
      <div class="lg:w-1/4 bg-white overflow-y-auto">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-6">Virtual Garden</h2>
          <p class="text-gray-600 mb-6">
            Explore 3D models of medicinal plants used in AYUSH systems. 
            Select a plant to view its interactive 3D model.
          </p>
          
          <!-- Plant List -->
          <div class="space-y-4">
            <div 
              *ngFor="let plant of plants" 
              (click)="selectPlant(plant.id)"
              [class.bg-primary-50]="selectedPlantId === plant.id"
              [class.border-primary-500]="selectedPlantId === plant.id"
              class="cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div class="flex items-center p-3">
                <div class="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                  <img [src]="plant.image" [alt]="plant.name" class="w-full h-full object-cover">
                </div>
                <div>
                  <h3 class="font-bold text-[1.5rem]">{{ plant.name }}</h3>
                  <p class="text-sm text-gray-600 italic">{{ plant.scientificName }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class GardenComponent implements OnInit {
  plants: Plant[] = [];
  selectedPlantId: number = 1;

  constructor(
    private plantService: PlantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe(plants => {
      this.plants = plants;
      
      // Check if a specific plant was requested in the URL
      this.route.queryParamMap.subscribe(params => {
        const plantId = Number(params.get('plant'));
        if (!isNaN(plantId) && plantId > 0) {
          this.selectedPlantId = plantId;
        } else if (this.plants.length > 0) {
          this.selectedPlantId = this.plants[0].id;
        }
      });
    });
  }

  selectPlant(plantId: number): void {
    this.selectedPlantId = plantId;
  }
}