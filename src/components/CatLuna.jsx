import React, { useState, useEffect } from 'react';

const getRandomCatPosition = () => ({
  top: `${Math.random() * 34 + 52}%`,
  left: `${Math.random() * 76 + 12}%`,
});

const CatLuna = ({ onCatClick }) => {
  const [position, setPosition] = useState({ top: '76%', left: '50%' });

  useEffect(() => {
    const moveLuna = () => {
      setPosition(getRandomCatPosition());
    };

    moveLuna();
    const interval = setInterval(moveLuna, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      type="button"
      onClick={onCatClick}
      className="garden-cat"
      style={{
        top: position.top,
        left: position.left,
      }}
      aria-label="Lun the cat"
    >
      <span className="garden-cat__emoji" aria-hidden="true">🐱</span>
      <span className="garden-cat__label">Luna</span>
    </button>
  );
};

export default CatLuna;