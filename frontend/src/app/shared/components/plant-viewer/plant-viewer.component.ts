import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PlantService } from '../../../core/services/plant.service';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

@Component({
  selector: 'app-plant-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-full">
      <!-- 3D Viewer Container -->
      <div #rendererContainer class="w-full h-full bg-gray-800"></div>
      
      <!-- Controls (only shown in full mode) -->
      <div *ngIf="!previewMode" class="viewer-controls">
        <button (click)="resetCamera()" class="viewer-control-btn" title="Reset View">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button (click)="zoomIn()" class="viewer-control-btn" title="Zoom In">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
        <button (click)="zoomOut()" class="viewer-control-btn" title="Zoom Out">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </button>
        <button (click)="toggleAutoRotate()" class="viewer-control-btn" [title]="autoRotate ? 'Stop Rotation' : 'Start Rotation'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <!-- Placeholder Notice (when no 3D model is available) -->
      <div *ngIf="showPlaceholder" class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white font-medium text-center p-4">
        <p>
          This is a placeholder for the 3D plant viewer. <br>
          No 3D model is available for this plant.
        </p>
      </div>
    </div>
  `,
})
export class PlantViewerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() plantId!: number;
  @Input() previewMode: boolean = false;
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private animationFrameId?: number;
  private plant3DObject?: THREE.Group;

  autoRotate: boolean = false;
  showPlaceholder: boolean = false;

  constructor(private plantService: PlantService) { }

  ngOnInit(): void {
    this.initScene();
    this.loadPlantModel();
    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plantId'] && !changes['plantId'].firstChange) {
      this.loadPlantModel();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.disposeScene();
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  private initScene(): void {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    // Create camera
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Add controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false;
    this.controls.maxPolarAngle = Math.PI / 1.5;
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    this.scene.add(hemisphereLight);
  }

  private loadPlantModel(): void {
    // Remove any existing plant model
    if (this.plant3DObject) {
      this.scene.remove(this.plant3DObject);
    }

    // Create a new group for the plant
    this.plant3DObject = new THREE.Group();
    this.scene.add(this.plant3DObject);

    // Try to get the plant data from service
    this.plantService.getPlantById(this.plantId).subscribe({
      next: (plant) => {
        if (plant?.modelUrl) {
          // We have a model URL, try to load it
          this.tryLoadModelFromUrl(plant.modelUrl);
        } else {
          // No model URL, show placeholder
          this.createPlaceholderModel();
          this.showPlaceholder = true;
        }
      },
      error: (error) => {
        console.error('Error fetching plant data:', error);
        this.createPlaceholderModel();
        this.showPlaceholder = true;
      }
    });

    // Reset camera and controls
    this.resetCamera();
  }

  private tryLoadModelFromUrl(modelUrl: string): void {
    const fileExtension = modelUrl.split('.').pop()?.toLowerCase();
    const fullPath = `./assets/models/${modelUrl}`;

    // Hide placeholder initially
    this.showPlaceholder = false;

    if (fileExtension === 'gltf' || fileExtension === 'glb') {
      const loader = new GLTFLoader();

      loader.load(
        fullPath,
        (gltf) => {
          if (this.plant3DObject) {
            this.plant3DObject.add(gltf.scene);
            this.centerAndScaleModel();
          }
        },
        undefined,
        (error) => {
          console.error('Error loading GLTF model:', error);
          this.createPlaceholderModel();
          this.showPlaceholder = true;
        }
      );
    } else if (fileExtension === 'obj') {
      const loader = new OBJLoader();

      loader.load(
        fullPath,
        (obj) => {
          if (this.plant3DObject) {
            this.plant3DObject.add(obj);
            this.centerAndScaleModel();
          }
        },
        undefined,
        (error) => {
          console.error('Error loading OBJ model:', error);
          this.createPlaceholderModel();
          this.showPlaceholder = true;
        }
      );
    } else {
      console.warn(`Unsupported model format: ${fileExtension}`);
      this.createPlaceholderModel();
      this.showPlaceholder = true;
    }
  }

  // private centerAndScaleModel(): void {
  //   if (!this.plant3DObject) return;

  //   // Compute bounding box of the model
  //   const boundingBox = new THREE.Box3().setFromObject(this.plant3DObject);

  //   const center = new THREE.Vector3();
  //   const size = new THREE.Vector3();

  //   boundingBox.getCenter(center);
  //   boundingBox.getSize(size);

  //   // Reposition the model to the center of the scene
  //   this.plant3DObject.position.sub(center); // recenters it to origin

  //   // Optional: Adjust the scale if the model is too big or small
  //   // console.log(size.x,size.y,size.z)
  //   const maxDim = Math.max(size.x, size.y, size.z);
  //   if (maxDim > 0) {
  //     const scale = 2 / maxDim; // or tweak the 2 to your liking
  //     this.plant3DObject.scale.setScalar(scale);
  //   }

  // }

  private centerAndScaleModel(): void {
    if (!this.plant3DObject) return;

    // Compute bounding box of the model
    const boundingBox = new THREE.Box3().setFromObject(this.plant3DObject);

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    boundingBox.getCenter(center);
    boundingBox.getSize(size);

    console.log('Original Center:', center);
    console.log('Original Size:', size);

    // Reposition the model to the center of the scene
    this.plant3DObject.position.sub(center); // recenters it to origin

    // Calculate scale based on the largest dimension
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      // Adjust this value to control the final size
      // Current: makes largest dimension = 2 units
      // For a smaller tree try 1, for larger try 5, etc.
      const targetSize = 8;
      const scale = targetSize / maxDim;

      this.plant3DObject.scale.setScalar(scale);

      console.log('Applied Scale:', scale);
      console.log('Resulting Size:',
        size.x * scale,
        size.y * scale,
        size.z * scale);
    }
  }

  // private centerAndScaleModel(): void {
  //   if (!this.plant3DObject) return;

  //   const boundingBox = new THREE.Box3().setFromObject(this.plant3DObject);
  //   const center = new THREE.Vector3();
  //   const size = new THREE.Vector3();

  //   boundingBox.getCenter(center);
  //   boundingBox.getSize(size);

  //   this.plant3DObject.position.sub(center); // Center the model

  //   const maxDim = Math.max(size.x, size.y, size.z);
  //   const desiredMaxSize = 5;
  //   const scaleFactor = desiredMaxSize / maxDim;

  //   // this.plant3DObject.scale.setScalar(scaleFactor);

  //   // Adjust camera
  //   const cameraDistance = desiredMaxSize * 1.5;
  //   this.camera.position.set(0, desiredMaxSize * 0.5, cameraDistance);
  //   this.controls.target.set(0, 0, 0);
  //   this.controls.update();
  // }

  private createPlaceholderModel(): void {
    if (!this.plant3DObject) return;

    // Clear any existing children
    while (this.plant3DObject.children.length > 0) {
      const child = this.plant3DObject.children[0];
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
      this.plant3DObject.remove(child);
    }

    // Create a placeholder geometry based on plantId to make them visually different
    const color = new THREE.Color(0x2D6A4F);

    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x5C4033 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0;
    this.plant3DObject.add(stem);

    // Leaves (adjust based on plantId to make them look different)
    const leafCount = 3 + (this.plantId % 5);
    const leafSize = 0.8 + (this.plantId % 3) * 0.2;

    for (let i = 0; i < leafCount; i++) {
      const leafGeometry = new THREE.SphereGeometry(leafSize, 8, 8);
      leafGeometry.scale(1, 0.2, 0.7);

      const leafMaterial = new THREE.MeshStandardMaterial({
        color: color,
        flatShading: true
      });

      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

      // Position leaves around the stem
      const angle = (i / leafCount) * Math.PI * 2;
      const height = -0.5 + i * (1.5 / leafCount);

      leaf.position.set(
        Math.cos(angle) * 0.8,
        height,
        Math.sin(angle) * 0.8
      );

      // Rotate the leaf to point outward
      leaf.rotation.x = Math.PI / 4;
      leaf.rotation.y = angle;

      this.plant3DObject.add(leaf);
    }
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Rotate the plant model if autoRotate is enabled
    if (this.autoRotate && this.plant3DObject) {
      this.plant3DObject.rotation.y += 0.005;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  private disposeScene(): void {
    this.rendererContainer.nativeElement.removeChild(this.renderer.domElement);

    // Dispose geometries and materials
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();

        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        } else if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        }
      }
    });
  }

  // Public methods for the controls
  resetCamera(): void {
    this.camera.position.set(0, 0, 5);
    this.controls.reset();
  }

  zoomIn(): void {
    this.camera.position.z -= 0.5;
    this.camera.updateProjectionMatrix();
  }

  zoomOut(): void {
    this.camera.position.z += 0.5;
    this.camera.updateProjectionMatrix();
  }

  toggleAutoRotate(): void {
    this.autoRotate = !this.autoRotate;
  }
}