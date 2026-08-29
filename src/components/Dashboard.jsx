import { useEffect, useState } from "react";
import { getCrimeData } from "../services/api";
import CrimeTable from "./CrimeTable";
import CrimeChart from "./CrimeChart";
import styled from "styled-components";

const Title = styled.div`
    > h2 {
        margin-bottom: 8px;
        font-size: 22px;
    }

    > h4 {
        margin-bottom: 16px;
        font-size: 18px;
    }
`

const Header = styled.header`
    margin-top: 32px;
    margin-bottom: 64px;
    text-align: center;
`

const Link = styled.p`
    margin-top: 64px;
    margin-bottom: 128px;
    text-align: center;

    > a {
        text-decoration: none;
	    color: white;
    }
`

function Dashboard() {

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

    if (loading) {
        return (
            <div className="container">
                <p>Loading...</p>
            </div>
        )
    }
    
    return (
        <div className="container">
            <Header>
                <Title>
                    <h2>Crime Statistics</h2>
                    <h4>Per 100,000 inhabitants</h4>
                </Title>

                <div>
                    <label>Select city: </label>
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                        {cities.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </Header>

            <CrimeChart data={data} crime="homicides" />
            <CrimeChart data={data} crime="thefts" />
            <CrimeChart data={data} crime="robberies" />

            {/* <h2>Data Table</h2>
            <CrimeTable data={data} /> */}

            <Link>
                <a href="https://www.ssp.sp.gov.br/estatistica/dados-mensais">Source: São Paulo State Public Security Department, 2026</a>
            </Link>
        </div>
    )
}

export default Dashboard