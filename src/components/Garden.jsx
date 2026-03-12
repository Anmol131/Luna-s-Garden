import React, { useRef, useState } from 'react';
import Flower from './Flower';
import CatLuna from './CatLuna';
import MessagePopup from './MessagePopup';
import { flowerTypes, romanticMessages, catMessages } from '../data/flowers';

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const createFlower = (index) => ({
  id: index,
  type: flowerTypes[Math.floor(randomBetween(0, flowerTypes.length))],
  top: `${randomBetween(22, 88)}%`,
  left: `${randomBetween(6, 94)}%`,
  size: `${randomBetween(2.4, 4.2)}rem`,
  floatDuration: `${randomBetween(3.8, 6.8)}s`,
  floatDelay: `${randomBetween(0, 2.6)}s`,
  rotation: `${randomBetween(-14, 14)}deg`,
  zIndex: Math.round(randomBetween(2, 8)),
});

const createPetal = (index) => ({
  id: index,
  left: `${randomBetween(0, 100)}%`,
  top: `${randomBetween(-18, 12)}%`,
  duration: `${randomBetween(8, 14)}s`,
  delay: `${randomBetween(0, 6)}s`,
  drift: `${randomBetween(-32, 32)}px`,
  scale: randomBetween(0.8, 1.25).toFixed(2),
});

const initialFlowers = Array.from({ length: 18 }, (_, index) => createFlower(index));
const initialPetals = Array.from({ length: 12 }, (_, index) => createPetal(index));

const Garden = () => {
  const [message, setMessage] = useState(null);
  const [flowers] = useState(initialFlowers);
  const [petals] = useState(initialPetals);
  const romanticMessageIndexRef = useRef(0);
  const catMessageIndexRef = useRef(0);

  const handleFlowerClick = () => {
    setMessage(romanticMessages[romanticMessageIndexRef.current]);
    romanticMessageIndexRef.current = (romanticMessageIndexRef.current + 1) % romanticMessages.length;
  };

  const handleCatClick = () => {
    setMessage(catMessages[catMessageIndexRef.current]);
    catMessageIndexRef.current = (catMessageIndexRef.current + 1) % catMessages.length;
  };

  const closePopup = () => {
    setMessage(null);
  };

  return (
    <main className="garden">
      <div className="garden__sky" aria-hidden="true" />
      <div className="garden__grass" aria-hidden="true" />

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
        <h1 className="garden__title">
          Luna's Garden 🌸
        </h1>
      </header>

      <section className="garden__field" aria-label="Flower garden">
        {flowers.map((flower) => (
          <Flower
            key={flower.id}
            type={flower.type}
            top={flower.top}
            left={flower.left}
            size={flower.size}
            floatDuration={flower.floatDuration}
            floatDelay={flower.floatDelay}
            rotation={flower.rotation}
            zIndex={flower.zIndex}
            onClick={handleFlowerClick}
          />
        ))}

        <CatLuna onCatClick={handleCatClick} />
      </section>

      {message && <MessagePopup message={message} onClose={closePopup} />}
    </main>
  );
};

export default Garden;