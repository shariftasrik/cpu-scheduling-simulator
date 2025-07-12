export default function ProcessTable({processes,algorithm,onAddProcess,onRemoveProcess,  onUpdateProcess,}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Processes</h2>
        <button
          onClick={onAddProcess}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Add Process
        </button>
      </div>

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
              {algorithm === "priority" && (
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Priority
                </th>
              )}
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr
                key={process.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {process.name}
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={process.arrivalTime}
                    onChange={(e) =>
                      onUpdateProcess(process.id, "arrivalTime", e.target.value)
                    }
                    min="0"
                    className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={process.cpuTime}
                    onChange={(e) =>
                      onUpdateProcess(process.id, "cpuTime", e.target.value)
                    }
                    min="1"
                    className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                {algorithm === "priority" && (
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={process.priority}
                      onChange={(e) =>
                        onUpdateProcess(process.id, "priority", e.target.value)
                      }
                      min="1"
                      className="w-20 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </td>
                )}
                <td className="px-4 py-3">
                  <button
                    onClick={() => onRemoveProcess(process.id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
