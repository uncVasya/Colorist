import React from 'react';
import chroma from 'chroma-js';

function App() {
  const oneArr = {
    color: '#FFFFFF',
    lock: false,
  };
  const arr = new Array(5).fill(oneArr);
  const [cols, setCols] = React.useState(arr);
  const docBody = React.useRef();
  let keyRef = React.useRef('');

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
    console.log('getRandomColor');
    console.log('cols', cols);
    console.log('cols[index].lock', cols[index].lock);

    if (cols[index].lock) {
      const newState = cols.map((el, i) => {
        if (i === index) {
          navigator.clipboard.writeText(co);
          console.log('return');
          return {
            color: co,
            lock: el.lock,
          };
        }
        return el;
      });
      setCols(newState);
    }
  }

  function setKeyD(keyDown) {
    let i = 0;
    console.log(keyDown);
    switch (keyDown) {
      case 'Space':
        while (i < 5) {
          getRandomColor(i);
          i += 1;
        }
        break;
      case 'Digit1':
        getRandomColor(0);
        break;
      case 'Digit2':
        getRandomColor(1);
        break;
      case 'Digit3':
        getRandomColor(2);
        break;
      case 'Digit4':
        getRandomColor(3);
        break;
      case 'Digit5':
        getRandomColor(4);
        break;
      case 'Digit0':
        console.log(cols);
        break;
      default:
        console.log('useEffect-default');
        break;
    }
  }

  function getTextColor(i) {
    const lumin = chroma(cols[i].color).luminance();
    const colText = lumin > 0.5 ? 'black' : 'white';
    return `${colText}`;
  }

  React.useEffect(() => {
    window.addEventListener('keydown', (event) => {
      console.log('---', event.code);
      keyRef = event.code;
      setKeyD(keyRef);
    });
    // docBody.current.addEventListener('click', (event) => {
    // navigator.clipboard.writeText(event.target.textContent);
    // });
  }, []);

  (function updateColorHash() {
    document.location.hash = cols.map((el) => el.color).toString().split(',').join('-');
  }());

  // (function getState() {
  //   console.log(cols);
  // }());

  return (
    <div className="body" ref={docBody}>
      {
        cols.map((col, i) => (
          <div
            id="column"
            key={i}
            style={{
              backgroundColor: `${col.color}`,
              color: `${getTextColor(i)}`,
            }}
            className="col"
          >
            <h2
              onClick={() => getRandomColor(i)}
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
