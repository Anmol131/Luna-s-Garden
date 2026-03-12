import React, { useCallback, useEffect, useRef, useState } from 'react';
import Flower from './Flower';
import CatLuna from './CatLuna';
import MessagePopup from './MessagePopup';
import { romanticMessages, catMessages } from '../data/flowers';
import {
  initialFlowers,
  initialPetals,
  initialStars,
  initialRain,
  HOUSE_POSITION,
  BOWL_POSITION,
  PLAY_BALL_HOME_POSITION,
  FEED_FOODS,
} from '../data/gardenScene';
import { usePlayThrow } from '../hooks/usePlayThrow';

const Garden = () => {
  const [message, setMessage] = useState(null);
  const [uiMessage, setUiMessage] = useState('');
  const [flowers] = useState(initialFlowers);
  const [petals] = useState(initialPetals);
  const [stars] = useState(initialStars);
  const [rainDrops] = useState(initialRain);
  const [isNight, setIsNight] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  const [catVisible, setCatVisible] = useState(true);
  const [catSleeping, setCatSleeping] = useState(false);
  const [catAutoMove, setCatAutoMove] = useState(true);
  const [catTarget, setCatTarget] = useState(null);
  const [catTask, setCatTask] = useState(null);
  const [showBowl, setShowBowl] = useState(false);
  const [currentFood, setCurrentFood] = useState(FEED_FOODS[0]);
  const [ballPosition, setBallPosition] = useState(null);
  const [isPlayMode, setIsPlayMode] = useState(false);
  const [playModeEndsAt, setPlayModeEndsAt] = useState(null);
  const [playTimeLeft, setPlayTimeLeft] = useState(0);
  const [throwFx, setThrowFx] = useState(null);
  const [catMood, setCatMood] = useState('');
  const romanticMessageIndexRef = useRef(0);
  const catMessageIndexRef = useRef(0);
  const feedTimeoutRef = useRef(null);
  const throwFxTimeoutRef = useRef(null);
  const throwResolveTimeoutRef = useRef(null);

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

  useEffect(() => {
    return () => {
      if (feedTimeoutRef.current) {
        clearTimeout(feedTimeoutRef.current);
      }

      if (throwFxTimeoutRef.current) {
        clearTimeout(throwFxTimeoutRef.current);
      }

      if (throwResolveTimeoutRef.current) {
        clearTimeout(throwResolveTimeoutRef.current);
      }
    };
  }, []);

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
      setCatTask('feeding');
      setCatTarget(null);
      setCatMood('NOM NOM');
      setUiMessage(`NOM NOM NOM! Luna is happily eating ${currentFood}`);

      if (feedTimeoutRef.current) {
        clearTimeout(feedTimeoutRef.current);
      }

      feedTimeoutRef.current = setTimeout(() => {
        setCatTask(null);
        setCatAutoMove(true);
        setShowBowl(false);
        feedTimeoutRef.current = null;
      }, 3200);
      return;
    }

    if (catTask === 'play-fetch' && targetId === 'ball') {
      setCatTask('play-return');
      setCatTarget({ ...PLAY_BALL_HOME_POSITION, id: 'ball-home' });
      setCatMood('got it');
      setBallPosition(null);
      setThrowFx(null);
      setUiMessage('Luna got the tennis ball and is bringing it back 🎾');
      return;
    }

    if (catTask === 'play-return' && targetId === 'ball-home') {
      setCatTask(null);
      setCatTarget(null);
      setCatMood('proud');
      setBallPosition({ ...PLAY_BALL_HOME_POSITION });
      setCatAutoMove(false);
      setIsPlayMode(true);
      setPlayModeEndsAt(Date.now() + 5000);
      setPlayTimeLeft(5);
      setUiMessage('Luna returned it! Throw again within 5 seconds 🎾');
      return;
    }

    if (targetId === 'wake') {
      setCatTarget(null);
      setCatMood('awake');
    }
  }, [catTask, currentFood]);

  const closePopup = () => {
    setMessage(null);
  };

  const feedLuna = () => {
    const nextFood = FEED_FOODS[Math.floor(Math.random() * FEED_FOODS.length)];
    setShowBowl(true);
    setCurrentFood(nextFood);
    setBallPosition(null);
    setThrowFx(null);
    setIsPlayMode(false);
    setPlayModeEndsAt(null);
    setPlayTimeLeft(0);
    setCatSleeping(false);
    setCatVisible(true);
    setCatAutoMove(false);
    setCatTask('feed');
    setCatTarget({ ...BOWL_POSITION, id: 'bowl' });
    setUiMessage(`Dinner is served: ${nextFood}. Come here, Luna 🥣`);
  };

  const playWithLuna = () => {
    const now = Date.now();
    setIsPlayMode(true);
    setShowBowl(false);
    setBallPosition({ ...PLAY_BALL_HOME_POSITION });
    setThrowFx(null);
    setPlayModeEndsAt(now + 10000);
    setPlayTimeLeft(10);
    setCatSleeping(false);
    setCatVisible(true);
    setCatAutoMove(false);
    setCatTask(null);
    setCatTarget(null);
    setUiMessage('Click anywhere to throw the tennis ball. You have 10 seconds 🎾');
  };

  const sleepLuna = () => {
    setShowBowl(false);
    setBallPosition(null);
    setThrowFx(null);
    setIsPlayMode(false);
    setPlayModeEndsAt(null);
    setPlayTimeLeft(0);
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

  const handlePlayThrow = useCallback(({ percentLeft, percentTop, clientX, clientY }) => {
    if (!isPlayMode) {
      return;
    }

    if (catTask === 'play-fetch' || catTask === 'play-return') {
      return;
    }

    setBallPosition({ ...PLAY_BALL_HOME_POSITION });
    setThrowFx({
      id: Date.now(),
      x: `${clientX}px`,
      y: `${clientY}px`,
    });

    if (throwFxTimeoutRef.current) {
      clearTimeout(throwFxTimeoutRef.current);
    }

    throwFxTimeoutRef.current = setTimeout(() => {
      setThrowFx(null);
      throwFxTimeoutRef.current = null;
    }, 550);

    if (throwResolveTimeoutRef.current) {
      clearTimeout(throwResolveTimeoutRef.current);
    }

    throwResolveTimeoutRef.current = setTimeout(() => {
      setBallPosition({ left: percentLeft, top: percentTop });
      setCatTask('play-fetch');
      setCatTarget({
        left: percentLeft,
        top: percentTop,
        id: 'ball',
      });
      throwResolveTimeoutRef.current = null;
    }, 420);

    setUiMessage('Luna is sprinting to fetch the tennis ball 🏃‍♀️');
  }, [isPlayMode, catTask]);

  useEffect(() => {
    if (!isPlayMode || !playModeEndsAt) {
      return undefined;
    }

    const tick = () => {
      const remainingMs = Math.max(0, playModeEndsAt - Date.now());
      const remainingSeconds = Math.ceil(remainingMs / 1000);
      setPlayTimeLeft(remainingSeconds);

      if (remainingMs === 0) {
        setIsPlayMode(false);
        setPlayModeEndsAt(null);
        setPlayTimeLeft(0);

        if (catTask !== 'play-fetch' && catTask !== 'play-return') {
          setCatTask(null);
          setCatTarget(null);
          setCatAutoMove(true);
          setBallPosition(null);
          setUiMessage('Play time ended. Luna is roaming again 🌿');
        }
      }
    };

    tick();
    const interval = setInterval(tick, 250);
    return () => clearInterval(interval);
  }, [isPlayMode, playModeEndsAt, catTask]);

  usePlayThrow({
    isPlayMode,
    onPlayThrow: handlePlayThrow,
  });

  return (
    <main className={`garden ${isNight ? 'garden--night' : ''} ${isRaining ? 'garden--rain' : ''} ${isPlayMode ? 'garden--play-mode' : ''}`}>
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
            waterScale={1}
            isRaining={isRaining}
            onClick={handleFlowerClick}
          />
        ))}

        <div className="luna-house" style={{ left: HOUSE_POSITION.left, top: HOUSE_POSITION.top }} aria-hidden="true">
          <div className="luna-house__roof" />
          <div className="luna-house__body" />
          <div className="luna-house__door" />
          {catSleeping && <div className="luna-house__sleep">zzz</div>}
          <div className="luna-house__buttons">
            {catSleeping ? (
              <button type="button" onClick={wakeLuna} className="luna-house__btn" title="Wake Luna">
                🌞
              </button>
            ) : (
              <button type="button" onClick={sleepLuna} className="luna-house__btn" title="Sleep Luna">
                😴
              </button>
            )}
          </div>
        </div>

        {showBowl && (
          <div className="garden-item garden-item--bowl" style={{ left: BOWL_POSITION.left, top: BOWL_POSITION.top }}>
            <span className="garden-item__dish" aria-hidden="true">🥣</span>
            <span className="garden-item__food" aria-label="Food">{currentFood}</span>
          </div>
        )}
        {ballPosition && (
          <div className="garden-item garden-item--ball" style={{ left: ballPosition.left, top: ballPosition.top }}>
            🎾
          </div>
        )}

        {throwFx && (
          <div className="garden-item garden-item--throw" style={{ left: throwFx.x, top: throwFx.y }}>
            🎾
          </div>
        )}

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
        <button type="button" onClick={feedLuna} className="control-btn" title="Feed Luna">
          🍖
        </button>
        <button type="button" onClick={playWithLuna} className="control-btn" title="Play With Luna">
          🎾
        </button>
        <button type="button" onClick={toggleDayNight} className="control-btn" title="Day / Night">
          🌙
        </button>
        <button type="button" onClick={toggleRain} className="control-btn" title="Rain">
          🌧
        </button>
      </aside>

      {isPlayMode && <div className="play-mode-hint">Click anywhere to throw the tennis ball. Time left: {playTimeLeft}s</div>}

      {!isPlayMode && uiMessage && <div className="garden-toast">{uiMessage}</div>}

      {message && <MessagePopup message={message} onClose={closePopup} />}
    </main>
  );
};

export default Garden;
