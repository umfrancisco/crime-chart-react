import { useEffect, useState } from "react";
import { getCrimeData } from "./services/api";
import CrimeTable from "./components/CrimeTable";
import CrimeChart from "./components/CrimeChart";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCrimeData()
      .then((res) => {
        // sort by year ascending
        const sorted = res.sort((a, b) => a.year - b.year);
        setData(sorted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px 160px" }}>
      <h1>Crime Statistics - São Paulo</h1>
	  <h2>Per 100,000 inhabitants</h2>

      <CrimeChart data={data} crime="homicides" />
	  <CrimeChart data={data} crime="thefts" />
	  <CrimeChart data={data} crime="robberies" />
      <h2>Data Table</h2>
      <CrimeTable data={data} />
    </div>
  );
}

export default App;