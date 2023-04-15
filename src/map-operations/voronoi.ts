import * as d3 from 'd3';
import { WorldMap } from '../map-generator';
import { Point } from './points';

export default function generateVoronoi(map: WorldMap) {
  const { width, height, offset } = map.options;
  const { points, tree } = map;

  // Create a Delaunay triangulation from the quadtree
  const delaunay = d3.Delaunay.from(
    points?.map((point) => [point[0], point[1]])!
  );

  // Create a Voronoi diagram from the Delaunay triangulation
  const voronoi = delaunay.voronoi([
    offset,
    offset,
    width + offset,
    height + offset
  ]);

  // Create cells from the Voronoi diagram
  const cells: Map<Point, Cell> = new Map();
  points!.forEach((point, i) => {
    const vertices = voronoi.cellPolygon(i);
    // const edges = voronoi.

    cells.set(point, {
      vertices
      // edges
    });
  });

  // Return the updated map object with the Voronoi diagram
  return {
    ...map,
    cells
  };
}

export type Cell = {
  vertices: Point[];
};
