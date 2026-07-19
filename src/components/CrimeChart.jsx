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

// homicides, thefts, robberies
export default function CrimeChart({ data, crime }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip 
			contentStyle={{ backgroundColor: "white", border: "none" }} 
			itemStyle={{ color: "black" }}
			labelStyle={{ color: "black" }}
			/>
        <Legend />
        <Line type="monotone" dataKey={crime} />
      </LineChart>
    </ResponsiveContainer>
  );
}