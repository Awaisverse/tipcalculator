import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="calculator">
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const averagePercentage = (percentage1 + percentage2) / 2;
  const tip = bill ? (bill * averagePercentage) / 100 : 0;

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <>
      <h1>Tip Calculator</h1>
      <InputBill bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>
      <Output bill={bill} tip={tip} />
      <Reset onReset={handleReset} />
    </>
  );
}

function InputBill({ bill, onSetBill }) {
  return (
    <div>
      <label>How much is the bill?</label>
      <input
        type="number"
        placeholder="Bill amount"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It’s okay (5%)</option>
        <option value="10">Good (10%)</option>
        <option value="20">Amazing (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  if (!bill) return null;

  return (
    <div className="output">
      <h3>
        You pay ${(+bill + tip).toFixed(2)} (${bill} + ${tip.toFixed(2)} tip)
      </h3>
    </div>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
