export default function TimeLineVslzn({ timeline, processes }) {
  const processColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-lime-500",
    "bg-cyan-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-sky-500",
    "bg-amber-500",
    "bg-neutral-500",
    "bg-stone-500",
    "bg-zinc-500"
  ];

  if (!timeline || timeline.length === 0) return null;
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        Gantt Chart
      </h2>
      <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
        <div className="flex items-center mb-2 min-w-max">
          {timeline.map((segment, index) => {
            let color;
            if (segment.isIdle) {
              color = "bg-gray-400";
            } else {
              const processIndex = processes.findIndex(
                (p) => p.id === segment.processId
              );
              color = processColors[processIndex % processColors.length];
            }

            const width = segment.duration * 60 + "px";

            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`${color} text-white text-xs font-medium px-2 py-1 rounded flex items-center justify-center min-w-0 ${
                    segment.isIdle ? "opacity-70 italic" : ""
                  }`}
                  style={{ width }}
                >
                  {segment.processName}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {segment.start}-{segment.end}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {processes.map((process, index) => (
            <div key={process.id} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded ${
                  processColors[index % processColors.length]
                }`}
              ></div>
              <span>{process.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-400 opacity-70"></div>
            <span className="italic">CPU Idle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
