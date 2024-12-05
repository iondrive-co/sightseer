import * as THREE from 'three';

export class CameraController {
    private camera: THREE.PerspectiveCamera;
    private domElement: HTMLElement;
    private isDragging = false;
    private previousMouseY = 0;
    private currentPolarAngle: number;
    private cameraDistance: number;
    private readonly minPolarAngle = 0;
    private readonly maxPolarAngle = Math.PI / 2;
    private readonly minDistance = 100;
    private readonly maxDistance = 1000;
    private readonly zoomSpeed = 0.1;

    constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.cameraDistance = this.calculateDistance();
        this.currentPolarAngle = Math.PI / 4;

        this.setupEventListeners();
    }

    private calculateDistance(): number {
        return Math.sqrt(
            Math.pow(this.camera.position.x, 2) +
            Math.pow(this.camera.position.y, 2) +
            Math.pow(this.camera.position.z, 2)
        );
    }

    private updateCameraPosition(): void {
        const x = this.cameraDistance * Math.sin(this.currentPolarAngle) * Math.cos(Math.PI / 4);
        const y = this.cameraDistance * Math.cos(this.currentPolarAngle);
        const z = this.cameraDistance * Math.sin(this.currentPolarAngle) * Math.sin(Math.PI / 4);

        this.camera.position.set(x, y, z);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        if (this.onPositionUpdate) {
            this.onPositionUpdate({ x, y, z });
        }
    }

    private onPositionUpdate: ((position: { x: number; y: number; z: number }) => void) | null = null;

    setPositionUpdateCallback(callback: (position: { x: number; y: number; z: number }) => void): void {
        this.onPositionUpdate = callback;
        // Initial position update
        this.updateCameraPosition();
    }

    private handleMouseDown = (event: MouseEvent): void => {
        this.isDragging = true;
        this.previousMouseY = event.clientY;
    };

    private handleMouseMove = (event: MouseEvent): void => {
        if (!this.isDragging) return;

        const deltaY = event.clientY - this.previousMouseY;
        this.previousMouseY = event.clientY;

        // Reversed direction: negative deltaY for upward movement
        this.currentPolarAngle = Math.max(
            this.minPolarAngle,
            Math.min(this.maxPolarAngle, this.currentPolarAngle - deltaY * 0.01)
        );

        this.updateCameraPosition();
    };

    private handleMouseUp = (): void => {
        this.isDragging = false;
    };

    private handleWheel = (event: WheelEvent): void => {
        event.preventDefault();

        const delta = event.deltaY;
        const newDistance = Math.max(
            this.minDistance,
            Math.min(this.maxDistance, this.cameraDistance * (1 + (delta > 0 ? this.zoomSpeed : -this.zoomSpeed)))
        );

        this.cameraDistance = newDistance;
        this.updateCameraPosition();
    };

    private handleResize = (): void => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    };

    private setupEventListeners(): void {
        this.domElement.addEventListener('mousedown', this.handleMouseDown);
        this.domElement.addEventListener('mousemove', this.handleMouseMove);
        this.domElement.addEventListener('mouseup', this.handleMouseUp);
        this.domElement.addEventListener('mouseleave', this.handleMouseUp);
        this.domElement.addEventListener('wheel', this.handleWheel);
        window.addEventListener('resize', this.handleResize);
    }

    dispose(): void {
        this.domElement.removeEventListener('mousedown', this.handleMouseDown);
        this.domElement.removeEventListener('mousemove', this.handleMouseMove);
        this.domElement.removeEventListener('mouseup', this.handleMouseUp);
        this.domElement.removeEventListener('mouseleave', this.handleMouseUp);
        this.domElement.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('resize', this.handleResize);
    }
}