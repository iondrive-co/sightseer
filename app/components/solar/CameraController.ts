import * as THREE from 'three';

export class CameraController {
    private camera: THREE.PerspectiveCamera;
    private domElement: HTMLElement;
    private isDragging = false;
    private previousMouseX = 0;
    private previousMouseY = 0;
    private currentPolarAngle: number;
    private currentAzimuthAngle: number;
    private cameraDistance: number;
    private readonly minPolarAngle = 0;
    private readonly maxPolarAngle = Math.PI / 2;
    private readonly minDistance = 100;
    private readonly maxDistance = 1000;
    private readonly zoomSpeed = 0.1;
    private touchStartDistance = 0;

    constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.cameraDistance = this.calculateDistance();
        this.currentPolarAngle = Math.PI / 4;
        this.currentAzimuthAngle = Math.PI / 4;

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
        const x = this.cameraDistance * Math.sin(this.currentPolarAngle) * Math.cos(this.currentAzimuthAngle);
        const y = this.cameraDistance * Math.cos(this.currentPolarAngle);
        const z = this.cameraDistance * Math.sin(this.currentPolarAngle) * Math.sin(this.currentAzimuthAngle);

        this.camera.position.set(x, y, z);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        if (this.onPositionUpdate) {
            this.onPositionUpdate({ x, y, z });
        }
    }

    private onPositionUpdate: ((position: { x: number; y: number; z: number }) => void) | null = null;

    setPositionUpdateCallback(callback: (position: { x: number; y: number; z: number }) => void): void {
        this.onPositionUpdate = callback;
        this.updateCameraPosition();
    }

    private handleMouseDown = (event: MouseEvent): void => {
        this.isDragging = true;
        this.previousMouseX = event.clientX;
        this.previousMouseY = event.clientY;
    };

    private handleMouseMove = (event: MouseEvent): void => {
        if (!this.isDragging) return;

        const deltaX = event.clientX - this.previousMouseX;
        const deltaY = event.clientY - this.previousMouseY;
        this.previousMouseX = event.clientX;
        this.previousMouseY = event.clientY;

        // Vertical movement affects polar angle
        this.currentPolarAngle = Math.max(
            this.minPolarAngle,
            Math.min(this.maxPolarAngle, this.currentPolarAngle - deltaY * 0.01)
        );

        // Horizontal movement affects azimuth angle
        this.currentAzimuthAngle += deltaX * 0.01;

        this.updateCameraPosition();
    };

    private handleMouseUp = (): void => {
        this.isDragging = false;
    };

    private handleWheel = (event: WheelEvent): void => {
        event.preventDefault();
        this.zoom(event.deltaY > 0 ? 1 : -1);
    };

    private zoom(direction: number): void {
        const newDistance = Math.max(
            this.minDistance,
            Math.min(this.maxDistance, this.cameraDistance * (1 + (direction > 0 ? this.zoomSpeed : -this.zoomSpeed)))
        );

        this.cameraDistance = newDistance;
        this.updateCameraPosition();
    }

    private getTouchDistance(touches: TouchList): number {
        return Math.hypot(
            touches[0].pageX - touches[1].pageX,
            touches[0].pageY - touches[1].pageY
        );
    }

    private handleTouchStart = (event: TouchEvent): void => {
        event.preventDefault();

        if (event.touches.length === 2) {
            this.touchStartDistance = this.getTouchDistance(event.touches);
        } else if (event.touches.length === 1) {
            this.isDragging = true;
            this.previousMouseX = event.touches[0].pageX;
            this.previousMouseY = event.touches[0].pageY;
        }
    };

    private handleTouchMove = (event: TouchEvent): void => {
        event.preventDefault();

        if (event.touches.length === 2) {
            // Pinch to zoom
            const currentDistance = this.getTouchDistance(event.touches);
            const delta = this.touchStartDistance - currentDistance;
            this.zoom(delta > 0 ? 1 : -1);
            this.touchStartDistance = currentDistance;
        } else if (event.touches.length === 1 && this.isDragging) {
            const touch = event.touches[0];
            const deltaX = touch.pageX - this.previousMouseX;
            const deltaY = touch.pageY - this.previousMouseY;

            // Update angles
            this.currentPolarAngle = Math.max(
                this.minPolarAngle,
                Math.min(this.maxPolarAngle, this.currentPolarAngle - deltaY * 0.01)
            );
            this.currentAzimuthAngle += deltaX * 0.01;

            this.previousMouseX = touch.pageX;
            this.previousMouseY = touch.pageY;

            this.updateCameraPosition();
        }
    };

    private handleTouchEnd = (event: TouchEvent): void => {
        event.preventDefault();
        this.isDragging = false;
    };

    private handleResize = (): void => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    };

    private setupEventListeners(): void {
        // Mouse events
        this.domElement.addEventListener('mousedown', this.handleMouseDown);
        this.domElement.addEventListener('mousemove', this.handleMouseMove);
        this.domElement.addEventListener('mouseup', this.handleMouseUp);
        this.domElement.addEventListener('mouseleave', this.handleMouseUp);
        this.domElement.addEventListener('wheel', this.handleWheel);

        // Touch events
        this.domElement.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        this.domElement.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        this.domElement.addEventListener('touchend', this.handleTouchEnd, { passive: false });
        this.domElement.addEventListener('touchcancel', this.handleTouchEnd, { passive: false });

        window.addEventListener('resize', this.handleResize);
    }

    dispose(): void {
        // Mouse events
        this.domElement.removeEventListener('mousedown', this.handleMouseDown);
        this.domElement.removeEventListener('mousemove', this.handleMouseMove);
        this.domElement.removeEventListener('mouseup', this.handleMouseUp);
        this.domElement.removeEventListener('mouseleave', this.handleMouseUp);
        this.domElement.removeEventListener('wheel', this.handleWheel);

        // Touch events
        this.domElement.removeEventListener('touchstart', this.handleTouchStart);
        this.domElement.removeEventListener('touchmove', this.handleTouchMove);
        this.domElement.removeEventListener('touchend', this.handleTouchEnd);
        this.domElement.removeEventListener('touchcancel', this.handleTouchEnd);

        window.removeEventListener('resize', this.handleResize);
    }
}