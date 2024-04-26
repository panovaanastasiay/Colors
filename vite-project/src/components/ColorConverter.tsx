import React, { useState } from 'react';

const hexToRgb = (hex: string): string => {
  if (!/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
    return 'Error';
  }

  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return 'Error';
  }

  let red = parseInt(result[1], 16);
  let green = parseInt(result[2], 16);
  let blue = parseInt(result[3], 16);

  return `RGB(${red}, ${green}, ${blue})`;
};

const ColorConverter: React.FC = () => {
  const [hexColor, setHexColor] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexColor(value);
    const rgb = hexToRgb(value);
    setRgbColor(rgb);
    if (rgb === 'Error') {
      setBackgroundColor('red');
      document.body.style.backgroundColor = 'red';
    } else {
      setBackgroundColor(value);
      document.body.style.backgroundColor = value;
    }
  };

  return (
    <div style={{ backgroundColor }}>
      <input
        type="text"
        value={hexColor}
        onChange={handleChange}
        placeholder="HEX"
      />
      <div className='rgbInput'>{rgbColor}</div>
    </div>
  );
};

export default ColorConverter;