import seedrandom from 'seedrandom';

export default class RandomNumberGenerator {
  private static instance: RandomNumberGenerator;
  private rng: () => number;

  private constructor(seed: string) {
    this.rng = seedrandom(seed);
  }

  public static getInstance(seed?: string): RandomNumberGenerator {
    if (!RandomNumberGenerator.instance) {
      RandomNumberGenerator.instance = new RandomNumberGenerator(seed);
    }

    return RandomNumberGenerator.instance;
  }

  public next(): number {
    return this.rng();
  }
}

export function rng(): number {
  return RandomNumberGenerator.getInstance().next();
}
