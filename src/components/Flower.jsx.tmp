import React from 'react';

const Flower = ({
  type,
  onClick,
  top,
  left,
  size,
  floatDuration,
  floatDelay,
  rotation,
  zIndex,
  bloomDelay,
  waterScale,
  isRaining,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flower ${isRaining ? 'flower--rain-sway' : ''}`}
      style={{
        top,
        left,
        fontSize: size,
        zIndex,
        '--flower-water-scale': waterScale,
        '--flower-float-duration': floatDuration,
        '--flower-float-delay': floatDelay,
        '--flower-rotation': rotation,
        '--flower-bloom-delay': bloomDelay,
      }}
      aria-label={`${type.name} flower`}
    >
      <span className="flower__emoji" aria-hidden="true">
        {type.emoji}
      </span>
    </button>
  );
};

export default Flower;
