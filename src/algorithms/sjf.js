export default function sjf(processes) {
  const procs = [...processes];
  let currentTime = 0;
  const timeline = [];
  const processResults = [];
  const completed = new Set();

  while (completed.size < procs.length) {
    const available = procs.filter(
      (p) => !completed.has(p.id) && p.arrivalTime <= currentTime
    );

    if (available.length === 0) {
      const nextArrival = Math.min(
        ...procs.filter((p) => !completed.has(p.id)).map((p) => p.arrivalTime)
      );
      timeline.push({
        processId: "idle",
        processName: "IDLE",
        start: currentTime,
        end: nextArrival,
        duration: nextArrival - currentTime,
        isIdle: true,
      });
      currentTime = nextArrival;
      continue;
    }

    const shortest = available.reduce((min, p) =>
      p.burstTime < min.burstTime ? p : min
    );

    const startTime = currentTime;
    const endTime = startTime + shortest.burstTime;

    timeline.push({
      processId: shortest.id,
      processName: shortest.name,
      start: startTime,
      end: endTime,
      duration: shortest.burstTime,
    });

    processResults.push({
      ...shortest,
      startTime,
      endTime,
      turnaroundTime: endTime - shortest.arrivalTime,
      waitingTime: startTime - shortest.arrivalTime,
    });

    completed.add(shortest.id);
    currentTime = endTime;
  }

  return { timeline, processResults };
}
