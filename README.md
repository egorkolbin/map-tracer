
# Map Tracer

A simple and flexible library for drawing animated SVG lines based on an array of points. This library allows you to create smooth animations with options for both continuous and dashed lines, customizable colors, and dynamic SVG dimensions based on the given points.

## Installation

You can install the library using npm:

```bash
npm install map-tracer
```

## Usage

```typescript
import { mapTracer, NodePoint } from 'map-tracer';

// Example array of points
const points: NodePoint[] = [
  { x: 10, y: 10 },
  { x: 100, y: 50 },
  { x: 200, y: 150 },
  { x: 300, y: 300 },
];

// Calling the function with all parameters
mapTracer({
  dataArray: points,
  mapWidth: 400, // SVG width (optional)
  mapHeight: 400, // SVG height (optional)
  dashAnimate: true, // Enable dashed line animation (optional)
  pathColor: '#ff5733', // Line color (optional)
  parentNode: '.map-container', // Parent element selector for SVG (optional)
  runAnimate: true, // Animate a running icon (optional)
  runColor: '#ff0000', // Color for the running icon (optional)
  drawSpeed: 3, // Speed of drawing the line in seconds (optional)
  strokeDasharray: '10, 10', // Custom dash pattern for dashed lines (optional)
  strokeWidth: 2, // Path stroke width (optional)
});
```

# Parameters

## `mapTracer(options: DrawSvgLinesOptions)`

The function `mapTracer` accepts an object with the following properties:

- **dataArray** (NodePoint[] - required):  
  An array of points that define the path of the SVG line. Each point is an object with `x` and `y` properties.  
  **Example**: `[{ x: 10, y: 10 }, { x: 100, y: 50 }, { x: 200, y: 150 }]`

- **mapWidth** (number - optional):  
  The width of the SVG. If not specified, the width will be calculated based on the maximum `x` coordinate from `dataArray`.

- **mapHeight** (number - optional):  
  The height of the SVG. If not specified, the height will be calculated based on the maximum `y` coordinate from `dataArray`.

- **dashAnimate** (boolean - optional):  
  A boolean flag to enable dashed line animation.  
  - If `true`, the line will animate as a dashed line.  
  - If `false` or not specified, the line will animate as a smooth, continuous path.

- **pathColor** (string - optional):  
  The color of the line. You can use any valid CSS color format (e.g., `#ff5733`, `rgb(255, 87, 51)`, `blue`).  
  **Default**: `#000000` (black)

- **strokeDasharray** (string - optional):  
  Custom dash pattern for dashed lines.  
  **Example**: `'5, 5'` will create a dashed line with 5px dashes and 5px gaps.  
  **Default**: `'10, 10'`

- **parentNode** (string - optional):  
  A CSS selector for the parent element where the SVG should be appended.  
  - If specified, the SVG will be inserted into the element matching the selector.  
  - If not specified, the SVG will be appended to the `body` of the document.  
  **Example**: `'.map-container'`

- **runAnimate** (boolean | string - optional):  
  Specifies if a running icon should be animated along the path.  
  - If `true`, a default running icon will be used.  
  - If a string is provided, it should be a URL or path to a custom icon.

- **runColor** (string - optional):  
  The color of the default running icon.  
  **Default**: `#000000` (black)

- **drawSpeed** (number - optional):  
  The speed of the line drawing animation in seconds.  
  **Default**: `2`

- **strokeWidth** (number - optional):  
  The width of the line.  
  **Default**: `2`

# How It Works

### Creating the SVG
The function generates an SVG element and calculates the path using the provided `dataArray`. The path is drawn using `M` and `L` commands for moving and drawing lines between points.

### Automatic Dimension Calculation
If `mapWidth` and `mapHeight` are not provided, the function calculates these values using the maximum `x` and `y` coordinates from `dataArray`.

### Path Animation
- If `dashAnimate` is set to `true`, the line animates with a dashed pattern using the specified `strokeDasharray`.
- If `dashAnimate` is `false` or not specified, the line smoothly animates from start to finish as a continuous path.

### Running Icon Animation
- If `runAnimate` is `true`, a default running icon will animate along the path.
- If `runAnimate` is a string, a custom icon at the provided URL will animate along the path.
- The `runColor` parameter allows customization of the default running icon's color.

### Customizable Line Color
You can specify a custom color for the path using the `pathColor` parameter.

### Parent Node Insertion
The SVG is appended to the specified parent element using `document.querySelector`. If `parentNode` is not provided or the selector does not match any element, the SVG is appended to the `body`.

# Error Handling

- If `dataArray` is not provided or is an empty array, the function will throw an error.
- If `parentNode` is specified but does not match any element in the DOM, the function will throw an error.

# License

This library is open-source and distributed under the [MIT License](LICENSE).

