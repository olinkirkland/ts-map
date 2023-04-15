import { WorldMap } from './map-generator';
import { Cell } from './map-operations/voronoi';

export default function drawMap(map: WorldMap, canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')!;
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawPoints(map, context);
  drawCells(map, context);
}

function drawPoints(map: WorldMap, context: CanvasRenderingContext2D) {
  const { points } = map;
  if (!points) return;

  console.log('Total points:', points.length);

  // Loop over the points array and draw each point
  points.forEach((point) => {
    context.beginPath();
    context.arc(point[0], point[1], 3, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
  });
}

function drawCells(map: WorldMap, context: CanvasRenderingContext2D) {
  const { cells } = map;
  if (!cells) return;

  console.log('Total cells:', cells.size);

  // Loop over the cells map and draw each cell
  cells.forEach((cell: Cell) => {
    context.beginPath();
    cell.vertices.forEach((vertex: any, i: number) => {
      if (i === 0) {
        context.moveTo(vertex[0], vertex[1]);
      } else {
        context.lineTo(vertex[0], vertex[1]);
      }
    });
    context.closePath();
    context.stroke();
  });
}
