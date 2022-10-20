import React from 'react';
import chroma from 'chroma-js';

function App() {
  const arr = new Array(5).fill('#FFFFFF');
  const [cols, setCols] = React.useState(arr);

  function getRandomColor(index) {
    const letters = '0123456789ABCDEF';
    let colo = '#';
    for (let i = 0; i < 6; i += 1) {
      colo += letters[Math.floor(Math.random() * 16)];
    }
    // setCols((state) => state.map((el, i) => (index === i ? colo : el)));
    setCols((state) => state.map((el, i) => (index === i ? chroma.random() : el)));
  }
  function getTextColor(i) {
    const lumin = chroma(cols[i]).luminance();
    const colText = lumin > 0.5 ? 'black' : 'white';
    return `${colText}`;
  }

  console.log('render');
  return (
    <div className="body">
      {
        cols.map((col, i) => (
          <div
            key={i}
            style={{ backgroundColor: `${col}` }}
            className="col"
          >
            <h2
              onClick={() => getRandomColor(i)}
              style={{ сolor: getTextColor(i) }}
            >
              {`${col}`}
            </h2>
            <img src="./img/lock.svg" alt="lock" />
          </div>
        ))
      }
    </div>
  );
}

export default App;
