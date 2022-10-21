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
    if (cols[index].lock) {
      console.log(cols[index], index);
      setCols((state) => state.map((el, i) => {
        if (i === index) {
          return {
            color: co,
            lock: el.lock,

          };
        }
        return el;
      }));
    }
  }

  function getTextColor(i) {
    const lumin = chroma(cols[i].color).luminance();
    const colText = lumin > 0.5 ? 'black' : 'white';
    return `${colText}`;
  }

  React.useEffect(() => {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'Space':

          console.log('Hi!');
          break;
        case 'Digit1':
          getRandomColor(0);
          console.log('Digit1');
          break;
        case 'Digit2':
          console.log('Digit2');
          break;
        case 'Digit3':
          console.log('Digit3');
          break;
        case 'Digit4':
          console.log('Digit4');
          break;
        case 'Digit5':
          console.log('Digit5');
          break;
        default:
          // console.log(event.code);
          break;
      }
    });
  }, []);
  //   onKeyPressed(event);

  //   console.log(event.code);
  //   switch (event.code) {
  //     case 'Space':
  //       cols.forEach((el, i) => {
  //         console.log(el);
  //         // getRandomColor(i);
  //       });

  //       break;

  //     default:
  //       break;
  //   }
  // });
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
