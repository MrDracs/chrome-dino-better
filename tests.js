// Wait for game.js to load and initialize the game environment (like canvas ctx)
// For simplicity, using a small timeout. A more robust way would be a custom event or callback.
window.onload = () => {
    // Ensure canvas and context are ready (similar to game.ts)
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error("Test setup failed: Canvas not found.");
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Test setup failed: Could not get 2D context for test canvas.");
        return;
    }

    const resultsDiv = document.getElementById('testResults');

    function assert(condition, message) {
        const p = document.createElement('p');
        if (condition) {
            p.style.color = 'green';
            p.textContent = 'PASS: ' + message;
        } else {
            p.style.color = 'red';
            p.textContent = 'FAIL: ' + message;
        }
        resultsDiv.appendChild(p);
    }

    // --- Test Suite ---
    resultsDiv.innerHTML += '<h2>Testing Dinosaur Class</h2>';

    // Mock floorY for Dinosaur tests
    const mockFloorY = 550; // canvas.height (600) - floorHeight (50)
    const dinoInitialY = mockFloorY - 50; // Standard starting position

    let dino = new Dinosaur(50, dinoInitialY, 50, 50, mockFloorY);

    assert(dino.y === dinoInitialY, `Dinosaur initial Y position should be ${dinoInitialY}`);
    assert(dino.velocityY === 0, 'Dinosaur initial velocityY should be 0.');
    assert(dino.isJumping === false, 'Dinosaur initial isJumping should be false.');
    assert(dino.image.src.includes('dino.png'), 'Dinosaur image source should be dino.png');


    dino.jump();
    assert(dino.velocityY === dino.jumpStrength, `Dinosaur velocityY after jump should be ${dino.jumpStrength}.`);
    assert(dino.isJumping === true, 'Dinosaur isJumping should be true after jump.');

    // Test that can't double jump
    const velocityAfterFirstJump = dino.velocityY;
    dino.jump(); // Attempt another jump
    assert(dino.velocityY === velocityAfterFirstJump, 'Dinosaur velocityY should not change if jump is called while already jumping.');

    // Reset dino for gravity test
    dino = new Dinosaur(50, dinoInitialY, 50, 50, mockFloorY);
    const initialYForGravityTest = dino.y;
    dino.update(); // Apply gravity once
    assert(dino.y > initialYForGravityTest, 'Dinosaur Y should increase (move down) after update due to gravity.');
    assert(dino.velocityY === dino.gravity, `Dinosaur velocityY after one update should be ${dino.gravity}.`);

    // Test landing
    dino = new Dinosaur(50, mockFloorY - 51, 50, 50, mockFloorY); // Position 1px above ground
    dino.velocityY = 5; // Moving downwards
    dino.isJumping = true;
    dino.update();
    assert(dino.y === mockFloorY - dino.height, `Dinosaur should land exactly at floorY - height. Expected ${mockFloorY - dino.height}, got ${dino.y}`);
    assert(dino.velocityY === 0, 'Dinosaur velocityY should be 0 after landing.');
    assert(dino.isJumping === false, 'Dinosaur isJumping should be false after landing.');


    resultsDiv.innerHTML += '<h2>Testing FloorManager Class</h2>';
    // FloorManager(ctx, canvasWidth, floorY, segmentHeight, initialSpeed, segmentWidth)
    const fmCanvasWidth = 800;
    const fmFloorY = 550;
    const fmSegmentHeight = 50;
    const fmSpeed = 5;
    const fmSegmentWidth = 200;

    // FloorManager needs ctx for pattern creation.
    const floorManager = new FloorManager(ctx, fmCanvasWidth, fmFloorY, fmSegmentHeight, fmSpeed, fmSegmentWidth);

    assert(floorManager.segments.length > 0, 'FloorManager should create initial segments.');
    assert(floorManager.getGroundY() === fmFloorY, `FloorManager getGroundY() should return ${fmFloorY}`);
    if (floorManager.segments.length > 0) {
        const firstSegmentInitialX = floorManager.segments[0].x;
        floorManager.update();
        assert(floorManager.segments[0].x === firstSegmentInitialX - fmSpeed, `First segment X should decrease by speed (${fmSpeed}) after update.`);
    } else {
        assert(false, "Cannot run segment scroll test because no segments were created.");
    }

    // Test segment regeneration (simplified)
    // Create a new manager to ensure clean state for this test
    const testRegenFloorManager = new FloorManager(ctx, fmCanvasWidth, fmFloorY, fmSegmentHeight, fmSpeed, fmSegmentWidth);
    const initialSegmentCount = testRegenFloorManager.segments.length;
    assert(initialSegmentCount > 0, "Initial segments should exist for regeneration test.");

    // Calculate updates needed for one segment to move off screen
    // One segment width (fmSegmentWidth) divided by speed (fmSpeed)
    const updatesToScrollOneSegment = Math.ceil(fmSegmentWidth / fmSpeed) + 1;
    let lastSegmentXBefore = 0;
    if(testRegenFloorManager.segments.length > 0) {
      lastSegmentXBefore = testRegenFloorManager.segments[testRegenFloorManager.segments.length -1].x;
    }

    for (let i = 0; i < updatesToScrollOneSegment * 2 && testRegenFloorManager.segments.length > 0 ; i++) { // *2 for good measure
        testRegenFloorManager.update();
    }

    assert(testRegenFloorManager.segments.length > 0, "Segments should still exist after scrolling some off-screen.");
    if(testRegenFloorManager.segments.length > 0 && initialSegmentCount > 0) {
        const lastSegment = testRegenFloorManager.segments[testRegenFloorManager.segments.length - 1];
        // Check if the last segment's right edge is near or beyond the canvas width, indicating new ones are being added.
        assert(lastSegment.x + lastSegment.width > fmCanvasWidth - fmSegmentWidth, 'New segments should be added to keep the floor continuous.');
    }


    resultsDiv.innerHTML += '<h3>Testing FloorManager Pattern Creation (Manual Check Required)</h3>';
    if (floorManager.groundPattern) {
        assert(true, "FloorManager groundPattern is created. Check console for errors if ground.png was missing.");
    } else {
        assert(false, "FloorManager groundPattern was NOT created. Check console for errors (e.g. ground.png missing or failed to load). Fallback color should be used.");
    }


    console.log("Tests completed. Check the test.html page for results.");
};
