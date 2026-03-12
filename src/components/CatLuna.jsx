import React, { useEffect, useRef, useState } from 'react';

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const getRandomCatPosition = () => ({
  top: `${randomBetween(54, 88)}%`,
  left: `${randomBetween(10, 88)}%`,
});

const toPercentNumber = (value) => Number(String(value).replace('%', ''));

const CatLuna = ({ onCatClick, autoMove, targetPosition, onReachTarget, visible, mood }) => {
  const [position, setPosition] = useState({ top: '76%', left: '50%' });
  const lastReachedTargetRef = useRef(null);
  const displayedPosition = targetPosition
    ? { top: targetPosition.top, left: targetPosition.left }
    : position;

  useEffect(() => {
    if (!autoMove || targetPosition) {
      return;
    }

    const moveLuna = () => {
      setPosition(getRandomCatPosition());
    };

    moveLuna();
    const interval = setInterval(moveLuna, 5000);
    return () => clearInterval(interval);
  }, [autoMove, targetPosition]);

  useEffect(() => {
    if (!targetPosition) {
      lastReachedTargetRef.current = null;
      return;
    }

    const targetId = targetPosition.id || `${targetPosition.left}-${targetPosition.top}`;
    const leftDistance = Math.abs(toPercentNumber(displayedPosition.left) - toPercentNumber(targetPosition.left));
    const topDistance = Math.abs(toPercentNumber(displayedPosition.top) - toPercentNumber(targetPosition.top));

    if (leftDistance < 0.6 && topDistance < 0.6 && lastReachedTargetRef.current !== targetId) {
      lastReachedTargetRef.current = targetId;
      onReachTarget(targetId);
    }
  }, [displayedPosition.left, displayedPosition.top, onReachTarget, targetPosition]);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onCatClick}
      className="garden-cat"
      style={{
        top: displayedPosition.top,
        left: displayedPosition.left,
      }}
      aria-label="Luna the cat"
    >
      <span className="garden-cat__emoji" aria-hidden="true">🐱</span>
      <span className="garden-cat__label">Luna</span>
      {mood && <span className="garden-cat__mood">{mood}</span>}
    </button>
  );
};

export default CatLuna;
