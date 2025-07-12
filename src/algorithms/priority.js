export default function priority(processes) {
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

    const highest = available.reduce((max, p) =>
      p.priority > max.priority ? p : max
    );

    const startTime = currentTime;
    const endTime = startTime + highest.cpuTime;

    timeline.push({
      processId: highest.id,
      processName: highest.name,
      start: startTime,
      end: endTime,
      duration: highest.cpuTime,
    });

    processResults.push({
      ...highest,
      startTime,
      endTime,
      turnaroundTime: endTime - highest.arrivalTime,
      waitingTime: startTime - highest.arrivalTime,
    });

    completed.add(highest.id);
    currentTime = endTime;
  }

  return { timeline, processResults };
}
