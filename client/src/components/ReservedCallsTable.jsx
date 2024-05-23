import "../css/ReservedCallsTable.css";

export default function ReservedCallsTable({ reservedCalls }) {
  return (
    <div className="calls-table-container">
      <table className="calls-table">
        <thead>
          <tr>
            <th className="text-sm font-bold">Client</th>
            <th className="text-sm font-bold">Phone Number</th>
            <th className="text-sm font-bold">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {reservedCalls.map((call, index) => {
            const countryCode = call.number.substring(0, call.number.indexOf(' ', 1)); // Extract country code
            const maskedNumber = countryCode + ' ** ** ***';
            return (
              <tr key={index}>
                <td className="text-sm">{call.client}</td>
                <td className="text-sm">{maskedNumber}</td>
                <td className="text-sm">{new Date(call.datetime).toISOString().split('T')[0]}</td>
              </tr>
            )})}
        </tbody>
      </table>
    </div>
  );
}
