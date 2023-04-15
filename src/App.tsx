import { useEffect, useState } from 'react';
import './assets/css/styles.css';
import generateMap from './map-generator';
import drawMap from './map-painter';

function App() {
  const [output, setOutput] = useState(' ');

  useEffect(executeMapSequence, []);

  return (
    <div className="App">
      <div>
        <div className="main">
          <canvas id="canvas" width="640" height="640"></canvas>
          <div className="info">
            <button onClick={executeMapSequence}>New</button>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );

  function executeMapSequence() {
    const map = generateMap(setOutput);
    drawMap(map, document.getElementById('canvas')! as HTMLCanvasElement);
  }
}

export default App;
