import React from 'react';
import chroma from 'chroma-js';

function App() {
  const oneArr = {
    color: '#FFFFFF',
    lock: true,
  };
  const arr = new Array(5).fill(oneArr);
  const [cols, setCols] = React.useState(arr);

  function lockUnlock(index) {
    setCols((state) => state.map((el, i) => {
      if (i === index) {
        return {
          color: el.color,
          lock: !el.lock,
        };
      }
      return el;
    }));
  }

  function getRandomColor(index) {
    const letters = '0123456789ABCDEF';
    let co = '#';
    for (let i = 0; i < 6; i += 1) {
      co += letters[Math.floor(Math.random() * 16)];
    }
    setCols((state) => state.map((el, i) => {
      if (i === index) {
        return {
          color: chroma.random(),
          lock: el.lock,

        };
      }
      return el;
    }));
  }

  function getTextColor(i) {
    const lumin = chroma(cols[i].color).luminance();
    const colText = lumin > 0.5 ? 'black' : 'white';
    return `${colText}`;
  }

  document.addEventListener('keydown', (event) => {
    console.log(event.code);
  });
  return (
    <div className="body">
      {
        cols.map((col, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${col.color}`,
              color: `${getTextColor(i)}`,
            }}
            className="col"
          >
            <h2
              onClick={() => (col.lock ? getRandomColor(i) : getRandomColor(6))}
            >
              {`${col.color}`}
            </h2>
            <img onClick={() => lockUnlock(i)} src={`./img/${col.lock ? 'unlock' : 'lock'}.png`} alt="lock" />
          </div>
        ))
      }
    </div>
  );
}

export default App;
