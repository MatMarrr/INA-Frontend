import { useState, useEffect } from "react";
import { Table } from "./components/table";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";

const App = () => {
  const [a, setA] = useState(-4);
  const [b, setB] = useState(12);
  const [d, setD] = useState(0.001);
  const [n, setN] = useState(10);
  const [direction, setDirection] = useState("min");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [allFilled, setAllFilled] = useState(true);
  const [result, setResult] = useState({
    header: ["lp.", "x real", "f(x)", "g(x)", "pi", "qi", "r", "x real"],
    data: [],
  });

  // a => -2
  // b => 3 ;
  // xReal => -1.012
  // d => 0.001
  // n => 10

  useEffect(() => {
    const isNumber = (value) => {
      return value !== null && isFinite(Number(value));
    };

    setAllFilled(
      isNumber(a) &&
        isNumber(b) &&
        isNumber(n) &&
        !!d &&
        !!direction &&
        b > a &&
        b >= 0
    );
  }, [a, b, d, n, direction]);

  const getResult = async () => {
    setShowResult(false);
    setIsLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL;
    const authorizationKey = import.meta.env.VITE_API_AUTHORIZATION_KEY;

    try {
      const response = await axios.get(
        `${apiUrl}/genetic-algorithm/fx-gx-pi-qi-r-fx-table`,
        {
          headers: {
            Authorization: authorizationKey,
          },
          params: {
            a: a,
            b: b,
            d: d,
            n: n,
            direction: direction,
          },
        }
      );

      setResult((prevResult) => ({
        ...prevResult,
        data: response.data.fxGxPiQiRFxTable,
      }));

      setIsLoading(false);
      setShowResult(true);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
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
              setA(e.target.value);
            }}
          ></input>
        </div>
        <div className="row small_gap">
          <p>b =</p>
          <input
            value={b.toString()}
            onChange={(e) => {
              setB(e.target.value);
            }}
          />
        </div>
        <div className="row small_gap">
          <p>d =</p>
          <select
            value={d.toString()}
            onChange={(e) => {
              setD(e.target.value);
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
              setN(e.target.value);
            }}
          ></input>
        </div>
        <div className="row small_gap">
          <p>Direction =</p>
          <select
            value={direction.toString()}
            onChange={(e) => {
              setDirection(e.target.value);
            }}
          >
            <option value="min">min</option>
            <option value="max">max</option>
          </select>
        </div>
        <div className="row small_gap">
          <button onClick={getResult} disabled={!allFilled}>
            Start
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="row margin_top">
          <SpinnerDotted
            size={50}
            thickness={100}
            speed={100}
            color="#36ad47"
          />
        </div>
      )}
      {showResult && <Table header={result.header} data={result.data} />}
    </div>
  );
};

export default App;
