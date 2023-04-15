import { quadtree, Quadtree } from 'd3';
import { WorldMap } from '../map-generator';
import { rng } from '../random-number-generator';

export default function generatePoints(map: WorldMap) {
  const { width, height, spacing, precision, offset } = map.options;

  const tree: Quadtree<Point> = quadtree<Point>();

  const firstPoint: Point = [Math.floor(width / 2), Math.floor(height / 2)];
  const queue = [firstPoint];
  const points = [firstPoint];
  tree.add(firstPoint);

  while (queue.length > 0) {
    const point: Point = queue.pop()!;

    for (let i = 0; i < precision; i++) {
      const angle: number = rng() * Math.PI * 2;
      const radius: number = rng() * spacing + spacing;
      const candidate: [number, number] = [
        Math.floor(point[0] + Math.cos(angle) * radius),
        Math.floor(point[1] + Math.sin(angle) * radius)
      ];

      // If candidate is out of bounds, skip it
      if (
        candidate[0] < offset ||
        candidate[0] >= width + offset ||
        candidate[1] < offset ||
        candidate[1] >= height + offset
      ) {
        continue;
      }

      // If candidate is too close to another point, skip it
      const neighbor = tree.find(candidate[0], candidate[1], radius / 2);
      if (neighbor) {
        continue;
      }

      tree.add(candidate);
      queue.push(candidate);
      points.push(candidate);
    }

    if (queue.length > 10000) {
      console.error('Too many points');
      break;
    }
  }

  return {
    ...map,
    points,
    tree
  };
}

export interface Point {
  readonly 0: number;
  readonly 1: number;
}
