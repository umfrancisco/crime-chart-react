import { useEffect, useState } from "react";
import { getCrimeData } from "../services/api";
import CrimeTable from "./CrimeTable";
import CrimeChart from "./CrimeChart";
import styled from "styled-components";

const backgroundColor = "#252525"

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
    background-color: ${backgroundColor};
    padding-top: 32px;
    padding-bottom: 32px;
    margin-bottom: 64px;
    text-align: center;

    select {
        border: none;
        padding: 4px 6px;
        border-radius: 8px;
    }
`

const Footer = styled.div`
    background-color: ${backgroundColor};
    margin-top: 64px;
    padding-top: 64px;
    padding-bottom: 64px;
    text-align: center;

    > a {
        text-decoration: none;
	    color: white;
    }
`

const Loading = styled.div`
    margin-top: 32px;
    margin: 0 auto;
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
        getCrimeData(city)
            .then((res) => {
                const sorted = res.sort((a, b) => a.year - b.year);
                setData(sorted);
                setLoading(false);
            });
    }, [city]);

    if (loading) {
        return (
            <>
                <Header>
                    <Title>
                        <h2>Crime Statistics</h2>
                        <h4>Per 100,000 inhabitants</h4>
                    </Title>
                </Header>
                <div className="container">
                    <Loading className="loader" />
                </div>
            </>
        )
    }
    
    return (
        <>
            <Header>
                <Title>
                    <h2>Crime Statistics</h2>
                    <h4>Per 100,000 inhabitants</h4>
                </Title>

                <div>
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                        {cities.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </Header>
            <div className="container">

                <CrimeChart data={data} crime="homicides" />
                <CrimeChart data={data} crime="thefts" />
                <CrimeChart data={data} crime="robberies" />

                {/* <h2>Data Table</h2>
                <CrimeTable data={data} /> */}

            </div>
            <Footer>
                <a href="https://www.ssp.sp.gov.br/estatistica/dados-mensais">Source: São Paulo State Public Security Department, 2026</a>
            </Footer>
        </>
    )
}

export default Dashboard