import { useEffect, useState } from "react";
import { getCrimeData } from "./services/api";
import CrimeTable from "./components/CrimeTable";
import CrimeChart from "./components/CrimeChart";

function App() {
  const [city, setCity] = useState("sao_paulo");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const cities = [
    { value: "sao_paulo", label: "São Paulo" },
    { value: "campinas", label: "Campinas" },
    { value: "guarulhos", label: "Guarulhos" },
	{ value: "osasco", label: "Osasco" },
	{ value: "ribeirao_preto", label: "Ribeirão Preto" },
	{ value: "santo_andre", label: "Santo André" },
	{ value: "santos", label: "Santos" },
	{ value: "sorocaba", label: "Sorocaba" },
	{ value: "sao_bernardo", label: "São Bernardo" },
	{ value: "sao_jose_dos_campos", label: "São José dos Campos" },
  ];

  useEffect(() => {
    setLoading(true);

    getCrimeData(city)
      .then((res) => {
        const sorted = res.sort((a, b) => a.year - b.year);
        setData(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Crime Statistics</h1>
      <h2>Per 100,000 inhabitants</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Select city: </label>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {cities.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <CrimeChart data={data} crime="homicides" />
      <br />
      <CrimeChart data={data} crime="thefts" />
      <br />
      <CrimeChart data={data} crime="robberies" />
      <br />

      <h2>Data Table</h2>
      <CrimeTable data={data} />
      <br />

      <a href="https://www.ssp.sp.gov.br/estatistica/dados-mensais">
		Source: São Paulo State Public Security Department, 2026
      </a>
    </div>
  );
}

export default App;
