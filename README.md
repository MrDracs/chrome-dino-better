# Dino Run Story (Placeholder Name)

A 2D endless runner game where a dinosaur pursues a female dino, leading to an unexpected storyline. Built with TypeScript and HTML5 Canvas.

## Current Status

This project is in its initial development phase. Core mechanics like player movement (running, jumping), scrolling floor, and basic asset loading are implemented.

## Features (Planned & Implemented)

*   [x] Basic Dinosaur character with jump physics
*   [x] Infinitely scrolling floor
*   [x] Player input for jumping
*   [x] TypeScript compilation and project structure
*   [x] Basic placeholder graphics
*   [ ] Obstacle generation
*   [ ] Female dinosaur character and pursuit mechanic
*   [ ] Storyline elements and cutscenes
*   [ ] Scoring system
*   [ ] RPG and "end the world" finale
*   [ ] Sound effects and music

## Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm)

## Local Development

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build the TypeScript code:**
    This command compiles the TypeScript files from the root directory into the `dist/` folder.
    ```bash
    npm run build
    ```
    You can also run `npm run build -- --watch` or `tsc --watch` in a separate terminal to automatically recompile on changes during development.

4.  **Start the development server:**
    This command serves the project, including `index.html` and the compiled JavaScript in `dist/`. It also enables live reloading.
    ```bash
    npm start
    ```
    The game will typically be available at `http://localhost:3000` or a similar address shown in your terminal.

5.  **Run tests:**
    Open the `test.html` file in your browser to see the results of the basic unit tests. Ensure you have run `npm run build` at least once before opening `test.html` so that `dist/game.js` is up to date.

## Deployment

This project is configured for easy deployment to [Vercel](https://vercel.com/).

1.  **Install Vercel CLI (if not already done globally, or use npx):**
    ```bash
    npm install -g vercel
    ```
    Alternatively, you can link your GitHub/GitLab/Bitbucket repository directly to Vercel for automatic deployments.

2.  **Deploy from the command line:**
    Navigate to the project's root directory and run:
    ```bash
    vercel login  # If it's your first time
    vercel
    ```
    Follow the CLI prompts. Vercel will use the `vercel.json` configuration and the build script from `package.json`.

## Project Structure

*   `index.html`: Main HTML file for the game.
*   `*.ts`: TypeScript source files (e.g., `game.ts`, `dinosaur.ts`, `floor.ts`).
*   `dist/`: Compiled JavaScript files (output of `npm run build`).
*   `assets/`: Placeholder for game assets (e.g., `dino.png`, `ground.png`). (Note: current assets are in root, might move later)
*   `test.html`: HTML file for running basic tests.
*   `tests.js`: JavaScript file containing test logic.
*   `package.json`: npm project metadata and scripts.
*   `tsconfig.json`: TypeScript compiler configuration.
*   `vercel.json`: Vercel deployment configuration.
*   `.gitignore`: Specifies intentionally untracked files that Git should ignore.

## Contributing

Contributions are welcome! Please feel free to fork the repository, make changes, and submit a pull request.
