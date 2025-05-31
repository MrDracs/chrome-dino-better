import { Dinosaur } from './dinosaur';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
    throw new Error("Failed to get 2D context");
}

// Set canvas dimensions (you might want to make this dynamic or configurable)
import { Dinosaur } from './dinosaur';
import { FloorManager } from './floor'; // Import FloorManager

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
    throw new Error("Failed to get 2D context");
}

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Floor Manager setup
const gameSpeed = 5;
const floorHeight = 50;
const gameFloorY = canvas.height - floorHeight; // Y position of the top of the floor
const floorManager = new FloorManager(ctx, canvas.width, gameFloorY, floorHeight, gameSpeed, canvas.width / 2); // Pass ctx

// Dinosaur setup
const dinosaurX = 100; // Dinosaur's fixed X position
const dinosaur = new Dinosaur(dinosaurX, gameFloorY - 50, 50, 50, gameFloorY); // Pass gameFloorY

function gameLoop() {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    floorManager.update();
    floorManager.draw(ctx);

    dinosaur.update();
    dinosaur.draw(ctx);

    // Keep dinosaur at a fixed X position if it's not part of its class logic
    dinosaur.x = dinosaurX;

    requestAnimationFrame(gameLoop);
}

// Event listener for keyboard input
window.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.key === 'ArrowUp') {
        dinosaur.jump();
        // event.preventDefault(); // Optional: uncomment if space causes page scroll issues
    }
});

gameLoop();
