import { useState } from "react";
import { Table } from "./components/table";
import {
  realToInt,
  intToReal,
  intToBin,
  binToInt,
  getL,
  formatBinNumber,
} from "./functions.js";

const App = () => {
  const [a, setA] = useState(-4);
  const [b, setB] = useState(12);
  const [d, setD] = useState(0.001);
  const [n, setN] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    header: ["lp.", "x real", "x int", "x bin", "x int", "x real", "f(x)"],
    data: [],
  });

  const str = (number) => {
    return number.toString();
  };

  const roundD = (number, d) => {
    const precision = Math.abs(Math.round(Math.log10(d)));
    return parseFloat(number).toFixed(precision);
  };

  // -2 => 3 ; -1.012
  const getRandomNumber = (min, max, precision) => {
    const multiplier = 1 / precision;
    min = Math.ceil(min * multiplier);
    max = Math.floor(max * multiplier);
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomValue / multiplier;
  };

  const f = (x) => {
    const mod = x % 1;
    const cosPart = Math.cos(20 * Math.PI * x);
    const sinPart = Math.sin(x);
    return mod * (cosPart - sinPart);
  };

  const getResult = () => {
    setResult((prevResult) => ({
      ...prevResult,
      data: [],
    }));

    const l = getL(a, b, d);

    console.log(l);

    for (let i = 1; i <= n; ++i) {
      let fisrstX = roundD(getRandomNumber(a, b, d), d);
      let secondX = realToInt(fisrstX, a, b, l);
      let thirdX = intToBin(secondX, l);
      let fourthX = binToInt(thirdX);
      let fifthX = roundD(intToReal(fourthX, a, b, l), d);
      let funX = f(fifthX);

      let row = [
        i,
        str(fisrstX),
        str(secondX),
        str(thirdX),
        str(fourthX),
        str(fifthX),
        str(funX),
      ];

      setResult((prevResult) => ({
        ...prevResult,
        data: [...prevResult.data, row],
      }));
    }

    setShowResult(true);
  };

  return (
    <div className="column">
      <h1>INA - Mateusz Marek 20456</h1>
      <div className="row gap">
        <div className="row small_gap">
          <p>a =</p>
          <input
            value={a.toString()}
            onChange={(e) => {
              const val = e.target.value;
              setA(val === "" ? 0 : parseInt(val));
            }}
          ></input>
        </div>
        <div className="row small_gap">
          <p>b =</p>
          <input
            value={b.toString()}
            onChange={(e) => {
              const val = e.target.value;
              setB(val === "" ? 0 : parseInt(val));
            }}
          />
        </div>
        <div className="row small_gap">
          <p>d =</p>
          <select
            value={d.toString()}
            onChange={(e) => {
              setD(parseFloat(e.target.value));
            }}
          >
            <option value="0.1">0,1</option>
            <option value="0.01">0,01</option>
            <option value="0.001">0,001</option>
            <option value="0.0001">0,0001</option>
          </select>
        </div>
        <div className="row small_gap">
          <p>N =</p>
          <input
            value={n.toString()}
            onChange={(e) => {
              const val = e.target.value;
              setN(val === "" ? 0 : parseInt(val));
            }}
          ></input>
        </div>
        <div className="row small_gap">
          <button onClick={getResult}>Start</button>
        </div>
      </div>

      {showResult && <Table header={result.header} data={result.data} />}
    </div>
  );
};

export default App;
