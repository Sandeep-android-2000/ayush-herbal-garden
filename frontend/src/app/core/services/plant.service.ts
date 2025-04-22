import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private apiUrl = '/api/plants';  // Your backend API URL

  constructor(private http: HttpClient) { }

  // Get all plants
  getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl);
  }

  // Get featured plants (You can customize this part, depending on your backend)
  getFeaturedPlants(count: number = 3): Observable<Plant[]> {
    // Assuming you can fetch all plants and filter on the frontend
    return this.http.get<Plant[]>(this.apiUrl);
  }

  // Get plant by ID
  getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.apiUrl}/${id}`);
  }

  // Create new plant
  createPlant(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(this.apiUrl, plant);
  }

  // Update an existing plant (assuming you send the entire object)
  updatePlant(id: number, plant: Plant): Observable<Plant> {
    return this.http.put<Plant>(`${this.apiUrl}/${id}`, plant);
  }

  // Delete a plant by ID
  deletePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Search plants (using backend API if necessary)
  searchPlants(term: string): Observable<Plant[]> {
    const searchUrl = `${this.apiUrl}/search?term=${term}`;
    return this.http.get<Plant[]>(searchUrl);
  }

  // Filter plants by system (assuming backend supports filtering)
  filterPlantsBySystem(system: string): Observable<Plant[]> {
    const filterUrl = `${this.apiUrl}/filter?system=${system}`;
    return this.http.get<Plant[]>(filterUrl);
  }
}
