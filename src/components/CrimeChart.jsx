import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div`
  margin-top: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-right: 32px;
  }
`

// homicides, thefts, robberies
function CrimeChart({ data, crime }) {
  return (
    <Container className="container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip 
            contentStyle={{ backgroundColor: "white", border: "none" }} 
            itemStyle={{ color: "black" }}
            labelStyle={{ color: "black" }}/>
          <Legend />
          <Line type="monotone" dataKey={crime} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default CrimeChart