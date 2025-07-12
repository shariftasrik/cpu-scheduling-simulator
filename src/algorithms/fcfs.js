export default function fcfs(processes) {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let currentTime = 0;
  const timeline = [];
  const processResults = [];

  sorted.forEach((process) => {
    if (currentTime < process.arrivalTime) {
      timeline.push({
        processId: "idle",
        processName: "IDLE",
        start: currentTime,
        end: process.arrivalTime,
        duration: process.arrivalTime - currentTime,
        isIdle: true,
      });
      currentTime = process.arrivalTime;
    }

    const startTime = currentTime;
    const endTime = startTime + process.burstTime;

    timeline.push({
      processId: process.id,
      processName: process.name,
      start: startTime,
      end: endTime,
      duration: process.burstTime,
    });

    processResults.push({
      ...process,
      startTime,
      endTime,
      turnaroundTime: endTime - process.arrivalTime,
      waitingTime: startTime - process.arrivalTime,
    });

    currentTime = endTime;
  });

  return { timeline, processResults };
}
