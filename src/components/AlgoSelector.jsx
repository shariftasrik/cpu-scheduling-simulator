export default function AlgorithmSelector({
  algorithm,
  setAlgorithm,
  quantum,
  setQuantum,
  onSimulate,
  onReset,
  isRunning,
}) {
  const algorithms = {
    fcfs: "First Come First Serve",
    sjf: "Shortest Job First",
    priority: "Priority Scheduling",
    round_robin: "Round Robin",
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scheduling Algorithm
        </label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.entries(algorithms).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {algorithm === "round_robin" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Quantum
          </label>
          <input
            type="number"
            value={quantum}
            onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
            min="1"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      <div className="flex items-end gap-2">
        <button
          onClick={onSimulate}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isRunning ? "Running..." : "Simulate"}
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
