export default function ResultsTable({ results }) {
  if (!results || results.length === 0) return null;

  const calculateAverages = () => {
    const avgWaiting =
      results.reduce((sum, p) => sum + p.waitingTime, 0) / results.length;
    const avgTurnaround =
      results.reduce((sum, p) => sum + p.turnaroundTime, 0) / results.length;
    return {
      avgWaiting: avgWaiting.toFixed(2),
      avgTurnaround: avgTurnaround.toFixed(2),
    };
  };

  const { avgWaiting, avgTurnaround } = calculateAverages();

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Process
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Arrival Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                CPU Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Start Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                End Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Waiting Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Turnaround Time
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr
                key={result.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {result.name}
                </td>
                <td className="px-4 py-3">{result.arrivalTime}</td>
                <td className="px-4 py-3">{result.cpuTime}</td>
                <td className="px-4 py-3">{result.startTime}</td>
                <td className="px-4 py-3">{result.endTime}</td>
                <td className="px-4 py-3 text-blue-600 font-medium">
                  {result.waitingTime}
                </td>
                <td className="px-4 py-3 text-green-600 font-medium">
                  {result.turnaroundTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Average Waiting Time
          </h3>
          <p className="text-2xl font-bold text-blue-600">{avgWaiting} ms</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Average Turnaround Time
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {avgTurnaround} ms
          </p>
        </div>
      </div>
    </div>
  );
}
