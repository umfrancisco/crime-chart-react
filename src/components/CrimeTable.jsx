
function CrimeTable({ data }) {
  return (
    <div className="container">
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Year</th>
            <th>City</th>
            <th>Homicides</th>
            <th>Thefts</th>
            <th>Robberies</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.year}</td>
              <td>{item.city}</td>
              <td>{item.homicides}</td>
              <td>{item.thefts}</td>
              <td>{item.robberies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrimeTable