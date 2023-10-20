import { useState } from "react";
import { Table } from "./components/table";
import axios from "axios";

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

  // -2 => 3 ; -1.012

  const getResult = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    try {
      const response = await axios.get(
        `${apiUrl}/genetic-algorithm/all-conversions-table`,
        {
          params: {
            a: a,
            b: b,
            d: d,
            n: n,
          }
        }
      );
  
      const data = response.data;
      console.log(data);
      
      setResult((prevResult) => ({
        ...prevResult,
        data: data.conversionsTable,
      }));
      
      setShowResult(true);
    } catch (error) {
      console.error('Error fetching the data', error);
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
