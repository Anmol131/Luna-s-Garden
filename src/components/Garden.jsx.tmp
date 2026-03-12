import React, { useCallback, useEffect, useRef, useState } from 'react';
import Flower from './Flower';
import CatLuna from './CatLuna';
import MessagePopup from './MessagePopup';
import { flowerTypes, romanticMessages, catMessages } from '../data/flowers';

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

const initialFlowers = Array.from({ length: 20 }, (_, index) => createFlower(index));
const initialPetals = Array.from({ length: 14 }, (_, index) => createPetal(index));
const initialStars = Array.from({ length: 36 }, (_, index) => createStar(index));
const initialRain = Array.from({ length: 54 }, (_, index) => createRainDrop(index));

const HOUSE_POSITION = {
  left: '85%',
  top: '80%',
};

const BOWL_POSITION = {
  left: '22%',
  top: '82%',
};

const BALL_POSITION = {
  left: '66%',
  top: '74%',
};

const Garden = () => {
  const [message, setMessage] = useState(null);
  const [uiMessage, setUiMessage] = useState('');
  const [flowers] = useState(initialFlowers);
  const [petals] = useState(initialPetals);
  const [stars] = useState(initialStars);
  const [rainDrops] = useState(initialRain);
  const [waterPulse, setWaterPulse] = useState(0);
  const [isNight, setIsNight] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [catVisible, setCatVisible] = useState(true);
  const [catSleeping, setCatSleeping] = useState(false);
  const [catAutoMove, setCatAutoMove] = useState(true);
  const [catTarget, setCatTarget] = useState(null);
  const [catTask, setCatTask] = useState(null);
  const [showBowl, setShowBowl] = useState(false);
  const [showBall, setShowBall] = useState(false);
  const [catMood, setCatMood] = useState('');
  const romanticMessageIndexRef = useRef(0);
  const catMessageIndexRef = useRef(0);

  useEffect(() => {
    if (!uiMessage) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setUiMessage('');
    }, 2400);

    return () => clearTimeout(timeout);
  }, [uiMessage]);

  useEffect(() => {
    if (!catMood) {
      return undefined;
    }

    const timeout = setTimeout(() => {
      setCatMood('');
    }, 1800);

    return () => clearTimeout(timeout);
  }, [catMood]);

  const handleFlowerClick = () => {
    setMessage(romanticMessages[romanticMessageIndexRef.current]);
    romanticMessageIndexRef.current = (romanticMessageIndexRef.current + 1) % romanticMessages.length;
  };

  const handleCatClick = () => {
    setMessage(catMessages[catMessageIndexRef.current]);
    catMessageIndexRef.current = (catMessageIndexRef.current + 1) % catMessages.length;
  };

  const handleCatReachTarget = useCallback((targetId) => {
    if (catTask === 'sleep' && targetId === 'house') {
      setCatSleeping(true);
      setCatVisible(false);
      setCatTarget(null);
      setCatTask(null);
      setCatMood('zzz');
      setUiMessage('Luna fell asleep inside her tiny house 😴');
      return;
    }

    if (catTask === 'feed' && targetId === 'bowl') {
      setCatTask(null);
      setCatTarget(null);
      setCatAutoMove(true);
      setCatMood('nom');
      setUiMessage('Luna is eating 😺');
      return;
    }

    if (catTask === 'play' && targetId === 'ball') {
      setCatTask(null);
      setCatTarget(null);
      setCatAutoMove(true);
      setCatMood('yay');
      setUiMessage('Luna is chasing the ball 🎾');
      return;
    }

    if (targetId === 'wake') {
      setCatTarget(null);
      setCatMood('awake');
    }
  }, [catTask]);

  const closePopup = () => {
    setMessage(null);
  };

  const waterGarden = () => {
    setWaterPulse((current) => Math.min(current + 1, 5));
    setUiMessage('The flowers are happily drinking 💧');
    setTimeout(() => {
      setWaterPulse((current) => Math.max(current - 1, 0));
    }, 2600);
  };

  const feedLuna = () => {
    setShowBowl(true);
    setShowBall(false);
    setCatSleeping(false);
    setCatVisible(true);
    setCatAutoMove(false);
    setCatTask('feed');
    setCatTarget({ ...BOWL_POSITION, id: 'bowl' });
    setUiMessage('Snack time for Luna 🍖');
  };

  const playWithLuna = () => {
    setShowBall(true);
    setShowBowl(false);
    setCatSleeping(false);
    setCatVisible(true);
    setCatAutoMove(false);
    setCatTask('play');
    setCatTarget({ ...BALL_POSITION, id: 'ball' });
    setUiMessage('Play time started 🎾');
  };

  const petLuna = () => {
    setUiMessage('Luna: purrr 😽');
    setCatMood('purr');
  };

  const sleepLuna = () => {
    setShowBall(false);
    setShowBowl(false);
    setCatVisible(true);
    setCatAutoMove(false);
    setCatTask('sleep');
    setCatTarget({ ...HOUSE_POSITION, id: 'house' });
    setUiMessage('Luna is heading to her house...');
  };

  const wakeLuna = () => {
    setCatSleeping(false);
    setCatVisible(true);
    setCatTask(null);
    setCatTarget({ left: '80%', top: '76%', id: 'wake' });
    setCatAutoMove(true);
    setUiMessage('Good morning, Luna 🌞');
  };

  const toggleDayNight = () => {
    setIsNight((current) => !current);
  };

  const toggleRain = () => {
    setIsRaining((current) => !current);
    setUiMessage((prev) => (prev === 'Rain started 🌧' ? 'Rain stopped ☀️' : 'Rain started 🌧'));
  };

  const flowerWaterScale = 1 + waterPulse * 0.05;

  return (
    <main className={`garden ${isNight ? 'garden--night' : ''} ${isRaining ? 'garden--rain' : ''}`}>
      <div className="garden__sky" aria-hidden="true" />
      <div className="garden__grass" aria-hidden="true" />
      <div className="garden__moon" aria-hidden="true" />

      <div className="garden__stars" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="garden__star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="garden__rain" aria-hidden="true">
        {rainDrops.map((drop) => (
          <span
            key={drop.id}
            className="garden__drop"
            style={{
              left: drop.left,
              animationDuration: drop.duration,
              animationDelay: drop.delay,
              opacity: drop.opacity,
            }}
          />
        ))}
      </div>

      <div className="garden__petals" aria-hidden="true">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="garden__petal"
            style={{
              left: petal.left,
              top: petal.top,
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              '--petal-drift': petal.drift,
              '--petal-scale': petal.scale,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <header className="garden__header">
        <h1 className="garden__title">Luna&apos;s Garden 🌸</h1>
      </header>

      <section className="garden__field" aria-label="Flower garden">
        {flowers.map((flower) => (
          <Flower
            key={flower.id}
            type={flower.type}
            top={flower.top}
            left={flower.left}
            size={flower.size}
            bloomDelay={flower.bloomDelay}
            floatDuration={flower.floatDuration}
            floatDelay={flower.floatDelay}
            rotation={flower.rotation}
            zIndex={flower.zIndex}
            waterScale={flowerWaterScale}
            isRaining={isRaining}
            onClick={handleFlowerClick}
          />
        ))}

        <div className="luna-house" style={{ left: HOUSE_POSITION.left, top: HOUSE_POSITION.top }} aria-hidden="true">
          <div className="luna-house__roof" />
          <div className="luna-house__body" />
          <div className="luna-house__door" />
          {catSleeping && <div className="luna-house__sleep">zzz</div>}
        </div>

        {showBowl && <div className="garden-item garden-item--bowl" style={{ left: BOWL_POSITION.left, top: BOWL_POSITION.top }}>🥣</div>}
        {showBall && <div className="garden-item garden-item--ball" style={{ left: BALL_POSITION.left, top: BALL_POSITION.top }}>🎾</div>}

        <CatLuna
          onCatClick={handleCatClick}
          autoMove={catAutoMove}
          targetPosition={catTarget}
          onReachTarget={handleCatReachTarget}
          visible={catVisible}
          mood={catMood}
        />
      </section>

      <aside className="garden-controls" aria-label="Garden control panel">
        <button type="button" onClick={waterGarden}>Water Garden 💧</button>
        <button type="button" onClick={feedLuna}>Feed Luna 🍖</button>
        <button type="button" onClick={playWithLuna}>Play With Luna 🎾</button>
        <button type="button" onClick={petLuna}>Pet Luna ❤️</button>
        <button type="button" onClick={sleepLuna}>Sleep 😴</button>
        <button type="button" onClick={wakeLuna}>Wake 🌞</button>
        <button type="button" onClick={toggleDayNight}>Day / Night 🌙</button>
        <button type="button" onClick={toggleRain}>Rain 🌧</button>
      </aside>

      {uiMessage && <div className="garden-toast">{uiMessage}</div>}

      {message && <MessagePopup message={message} onClose={closePopup} />}
    </main>
  );
};

export default Garden;
