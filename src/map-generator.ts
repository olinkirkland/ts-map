import { getRandomCode } from './utils';
import generatePoints, { Point } from './map-operations/points';
import RandomNumberGenerator from './random-number-generator';
import { Quadtree } from 'd3';
import generateVoronoi, { Cell } from './map-operations/voronoi';

export default function generateMap(setOutput: (output: string) => void) {
  let map: WorldMap = {
    options: {
      seed: getRandomCode(),
      width: 600,
      height: 600,
      spacing: 20,
      precision: 20,
      offset: 20
    }
  };

  // Seed the random number generator
  RandomNumberGenerator.getInstance(map.options.seed);
  setOutput('Seed: ' + map.options.seed);
  console.log('Seed: ' + map.options.seed);

  console.log(map);
  map = generatePoints(map);
  console.log(map);
  map = generateVoronoi(map);
  console.log(map);
  // map = generateLithosphere(map);
  // console.log(map);

  return map;
}

export type WorldMap = {
  options: WorldMapOptions;
  points?: Point[];
  tree?: Quadtree<Point>;
  cells?: Map<Point, Cell>;
  lithosphere?: any;
};

export type WorldMapOptions = {
  seed: string;
  width: number;
  height: number;
  spacing: number;
  precision: number;
  offset: number;
};
