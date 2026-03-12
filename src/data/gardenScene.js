import { flowerTypes } from './flowers';

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const FLOWER_SIZE = {
  small: [2.1, 2.7],
  medium: [2.8, 3.5],
  large: [3.6, 4.6],
};

const pickFlowerSizeTier = () => {
  const value = Math.random();
  if (value < 0.35) return 'small';
  if (value < 0.75) return 'medium';
  return 'large';
};

const createFlower = (index) => {
  const sizeTier = pickFlowerSizeTier();
  const [minSize, maxSize] = FLOWER_SIZE[sizeTier];

  return {
    id: index,
    type: flowerTypes[Math.floor(randomBetween(0, flowerTypes.length))],
    sizeTier,
    top: `${randomBetween(24, 89)}%`,
    left: `${randomBetween(5, 95)}%`,
    size: `${randomBetween(minSize, maxSize)}rem`,
    bloomDelay: `${index * 90}ms`,
    floatDuration: `${randomBetween(3.8, 7)}s`,
    floatDelay: `${randomBetween(0, 2.8)}s`,
    rotation: `${randomBetween(-14, 14)}deg`,
    zIndex: Math.round(randomBetween(2, 8)),
  };
};

const createPetal = (index) => ({
  id: index,
  left: `${randomBetween(0, 100)}%`,
  top: `${randomBetween(-18, 10)}%`,
  duration: `${randomBetween(8, 14)}s`,
  delay: `${randomBetween(0, 6)}s`,
  drift: `${randomBetween(-32, 32)}px`,
  scale: randomBetween(0.8, 1.25).toFixed(2),
});

const createStar = (index) => ({
  id: index,
  left: `${randomBetween(0, 100)}%`,
  top: `${randomBetween(4, 56)}%`,
  size: `${randomBetween(2, 5)}px`,
  delay: `${index * 0.25}s`,
});

const createRainDrop = (index) => ({
  id: index,
  left: `${randomBetween(0, 100)}%`,
  duration: `${randomBetween(0.85, 1.55)}s`,
  delay: `${randomBetween(0, 1.8)}s`,
  opacity: randomBetween(0.25, 0.75).toFixed(2),
});

export const initialFlowers = Array.from({ length: 20 }, (_, index) => createFlower(index));
export const initialPetals = Array.from({ length: 14 }, (_, index) => createPetal(index));
export const initialStars = Array.from({ length: 36 }, (_, index) => createStar(index));
export const initialRain = Array.from({ length: 54 }, (_, index) => createRainDrop(index));

export const HOUSE_POSITION = {
  left: '85%',
  top: '80%',
};

export const BOWL_POSITION = {
  left: '22%',
  top: '82%',
};

export const PLAY_BALL_HOME_POSITION = {
  left: '50%',
  top: '88%',
};

export const FEED_FOODS = ['🐟', '🍗', '🧀', '🍤', '🥛'];
