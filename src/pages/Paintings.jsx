import ProductLijst from "../components/ProductLijst";
import { usePaintings } from "../context/PaintingProvider";
import { useState, useCallback } from "react";
import "../css/paintings.css";
import { TypeData } from "../data/typesData";

export default function Paintings() {
  const { paintings, loading } = usePaintings();
  const types = TypeData.map((x) => x.type);
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState("");

  //Changed the paintings that need to be shownen
  const handleInputChange = useCallback(
    (e) => {
      setInput(false);
      if (e.target.value === "Textile" || e.target.value === "Canvas") {
        setInput(true);
        setOutput(paintings.filter((x) => x.type === e.target.value));
      } else if (e.target.value === "All Items") {
        setInput(false);
        setOutput(paintings);
      }
    },
    [paintings, setInput]
  );

  const LabelSelect = ({ label, options, validation, ...rest }) => {
    options.sort();
    return (
      <div className="col-span-6 sm:col-span-3">
        <select
          {...rest}
          id={label.toLowerCase()}
          name={label}
          onChange={handleInputChange}
        >
          <option value="">-- Filter on Type --</option>
          {options.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  };

  if (loading) return (
    <div className="container">
        <div className="col-10 mx-auto my-2 text-center text-title">
          <h1 className="text-capitalize font-weight-bold title my-4" data-cy="loading">Loading...</h1>
        </div>
    </div>
    );

  return (
    <div className="container">
      <div className="box">
        <div className="col-10 mx-auto my-2 text-center text-title">
          <h1 className="text-capitalize font-weight-bold title my-4">
            My <strong className="text-blue">Paintings</strong>
          </h1>
        </div>
        <div className="label">
          <LabelSelect className="create-input" label="Type" options={types} />
        </div>
      </div>
      <ProductLijst paintings={input ? output : paintings} />
    </div>
  );
}
