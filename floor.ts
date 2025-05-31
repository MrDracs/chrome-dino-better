export interface FloorSegment {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class FloorManager {
    segments: FloorSegment[];
    speed: number;
    segmentWidth: number; // Default width for new segments
    canvasWidth: number;
    floorY: number; // y-coordinate of the top of the floor
    segmentHeight: number;
    groundPattern: CanvasPattern | null = null; // Store the pattern

    constructor(ctx: CanvasRenderingContext2D, canvasWidth: number, floorY: number, segmentHeight: number, initialSpeed: number, segmentWidth: number = 500) {
        this.canvasWidth = canvasWidth;
        this.floorY = floorY;
        this.segmentHeight = segmentHeight;
        this.speed = initialSpeed;
        this.segmentWidth = segmentWidth;
        this.segments = [];
        this.initPattern(ctx); // Call to initialize pattern
        this.populateInitialSegments();
    }

    initPattern(ctx: CanvasRenderingContext2D) {
        const groundImage = new Image();
        groundImage.src = 'ground.png';
        groundImage.onload = () => {
            const pattern = ctx.createPattern(groundImage, 'repeat');
            if (pattern) {
                this.groundPattern = pattern;
            } else {
                console.error("Failed to create ground pattern. Using fallback color.");
            }
        };
        groundImage.onerror = () => {
            console.error("Failed to load ground.png. Using fallback color.");
        }
    }

    populateInitialSegments() {
        let currentX = 0;
        while (currentX < this.canvasWidth + this.segmentWidth) { // Ensure it covers beyond the right edge initially
            this.addSegment(currentX);
            currentX += this.segmentWidth;
        }
    }

    addSegment(x: number) {
        this.segments.push({
            x: x,
            y: this.floorY,
            width: this.segmentWidth,
            height: this.segmentHeight,
        });
    }

    update() {
        // Move existing segments
        for (let i = 0; i < this.segments.length; i++) {
            this.segments[i].x -= this.speed;
        }

        // Remove segments that are off-screen to the left
        this.segments = this.segments.filter(segment => segment.x + segment.width > 0);

        // Add new segments if needed
        let rightmostSegment = this.segments[this.segments.length - 1];
        if (rightmostSegment && rightmostSegment.x + rightmostSegment.width < this.canvasWidth) {
             // Add a new segment just to the right of the current rightmost one
            this.addSegment(rightmostSegment.x + rightmostSegment.width);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.groundPattern) {
            ctx.fillStyle = this.groundPattern;
        } else {
            ctx.fillStyle = 'gray'; // Fallback color
        }
        for (const segment of this.segments) {
            ctx.fillRect(segment.x, segment.y, segment.width, segment.height);
        }
    }

    getGroundY(): number {
        return this.floorY;
    }
}
