import { Cpu } from "lucide-react";
import { useState } from "react";
import schedulingAlgorithms from "./algo";
import AlgoSelector from "./components/AlgoSelector";
import Footer from "./components/Footer";
import ProcessTable from "./components/ProcessTable";
import ResultsTable from "./components/ResultsTable";
import TimeLineVslzn from "./components/TimeLineVslzn";

function App() {
  const [processes, setProcesses] = useState([
    { id: 1, name: "P1", arrivalTime: 0, cpuTime: 0, priority: 0 },
    { id: 2, name: "P2", arrivalTime: 0, cpuTime: 0, priority: 0 },
    { id: 3, name: "P3", arrivalTime: 0, cpuTime: 0, priority: 0 },
  ]);

  const [algorithm, setAlgorithm] = useState("fcfs");
  const [quantum, setQuantum] = useState(2);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeline, setTimeline] = useState([]);

  const addProcess = () => {
    const newId = Math.max(...processes.map((p) => p.id), 0) + 1;
    setProcesses([
      ...processes,
      {
        id: newId,
        name: `P${newId}`,
        arrivalTime: 0,
        cpuTime: 0,
        priority: 0,
      },
    ]);
  };

  const removeProcess = (id) => {
    setProcesses(processes.filter((p) => p.id !== id));
  };

  const updateProcess = (id, field, value) => {
    setProcesses(
      processes.map((p) =>
        p.id === id ? { ...p, [field]: parseInt(value) || 0 } : p
      )
    );
  };

  const reset = () => {
    setResults(null);
    setIsRunning(false);
    setTimeline([]);
  };

  const simulate = () => {
    if (processes.length === 0) return;
    setIsRunning(true);

    try {
      let result;

      if (algorithm === "round_robin") {
        result = schedulingAlgorithms[algorithm](processes, quantum);
      } else {
        result = schedulingAlgorithms[algorithm](processes);
      }

      setTimeline(result.timeline);
      setResults(result.processResults);
    } catch (error) {
      console.error("Simulation error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen flex flex-col">
      <div className="bg-white rounded-lg shadow-lg p-6 flex-grow">
        <div className="flex items-center gap-3 mb-6">
          <Cpu className="text-blue-600" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">
            CPU Scheduling Simulator
          </h1>
        </div>

        <AlgoSelector
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          quantum={quantum}
          setQuantum={setQuantum}
          onSimulate={simulate}
          onReset={reset}
          isRunning={isRunning}
        />

        <ProcessTable
          processes={processes}
          algorithm={algorithm}
          onAddProcess={addProcess}
          onRemoveProcess={removeProcess}
          onUpdateProcess={updateProcess}
        />

        <TimeLineVslzn timeline={timeline} processes={processes} />

        <ResultsTable results={results} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
