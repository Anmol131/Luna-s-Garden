import { useEffect } from 'react';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const usePlayThrow = ({
  isPlayMode,
  onPlayThrow,
}) => {
  useEffect(() => {
    if (!isPlayMode) {
      return undefined;
    }

    const handleClick = (event) => {
      const gardenField = document.querySelector('.garden__field');
      if (!gardenField) {
        return;
      }

      const rect = gardenField.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * 100;
      const clickY = ((event.clientY - rect.top) / rect.height) * 100;

      const clampedX = clamp(clickX, 5, 95);
      const clampedY = clamp(clickY, 20, 85);

      onPlayThrow({
        percentLeft: `${clampedX}%`,
        percentTop: `${clampedY}%`,
        clientX: event.clientX,
        clientY: event.clientY,
      });
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isPlayMode, onPlayThrow]);
};
