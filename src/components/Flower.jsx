import React from 'react';

const Flower = ({ type, onClick, top, left, size, floatDuration, floatDelay, rotation, zIndex }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flower"
      style={{
        top,
        left,
        fontSize: size,
        zIndex,
        '--flower-float-duration': floatDuration,
        '--flower-float-delay': floatDelay,
        '--flower-rotation': rotation,
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