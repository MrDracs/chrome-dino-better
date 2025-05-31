export class Dinosaur {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityY: number;
    isJumping: boolean;
    gravity: number;
    jumpStrength: number;
    floorY: number; // Renamed from groundY for clarity
    image: HTMLImageElement;

    constructor(x: number, y: number, width: number, height: number, floorY: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityY = 0;
        this.isJumping = false;
        this.gravity = 1;
        this.jumpStrength = -20;
        this.floorY = floorY; // Store the passed floorY
        this.image = new Image();
        this.image.src = 'dino.png';
        // Optional: Add onload handler for more robust loading
        // this.image.onload = () => { /* image loaded, maybe set a flag */ };
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = this.jumpStrength;
            this.isJumping = true;
        }
    }

    update() {
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        if (this.y + this.height > this.floorY) {
            this.y = this.floorY - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.image.complete) { // Only draw if image is loaded (or src is set)
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Fallback drawing if image not loaded yet
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
