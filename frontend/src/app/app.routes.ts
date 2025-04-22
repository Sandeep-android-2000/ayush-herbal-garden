import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Virtual Herbal Garden | AYUSH'
  },
  {
    path: 'garden',
    loadComponent: () => import('./pages/garden/garden.component').then(m => m.GardenComponent),
    title: 'Explore the Garden | Virtual Herbal Garden'
  },
  {
    path: 'plants',
    loadComponent: () => import('./pages/plants/plants.component').then(m => m.PlantsComponent),
    title: 'Plant Library | Virtual Herbal Garden'
  },
  {
    path: 'plants/:id',
    loadComponent: () => import('./pages/plant-detail/plant-detail.component').then(m => m.PlantDetailComponent)
  },
  {
    path: 'tours',
    loadComponent: () => import('./pages/tours/tours.component').then(m => m.ToursComponent),
    title: 'Virtual Tours | Virtual Herbal Garden'
  },
  {
    path: 'tours/:id',
    loadComponent: () => import('./pages/tour-detail/tour-detail.component').then(m => m.TourDetailComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About | Virtual Herbal Garden'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found | Virtual Herbal Garden'
  }
];