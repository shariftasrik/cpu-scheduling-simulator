export default function round_robin(processes, quantum) {
  const procs = processes.map((p) => ({ ...p, remainingTime: p.burstTime }));
  const queue = [];
  let currentTime = 0;
  const timeline = [];
  const processResults = [];
  const completed = new Set();
  const processStartTimes = {};

  procs.forEach((p) => {
    if (p.arrivalTime === 0) {
      queue.push(p);
    }
  });

  while (completed.size < procs.length || queue.length > 0) {
    procs.forEach((p) => {
      if (
        p.arrivalTime === currentTime &&
        !queue.includes(p) &&
        !completed.has(p.id)
      ) {
        queue.push(p);
      }
    });

    if (queue.length === 0) {
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

    const current = queue.shift();
    const executeTime = Math.min(current.remainingTime, quantum);

    if (!(current.id in processStartTimes)) {
      processStartTimes[current.id] = currentTime;
    }

    timeline.push({
      processId: current.id,
      processName: current.name,
      start: currentTime,
      end: currentTime + executeTime,
      duration: executeTime,
    });

    current.remainingTime -= executeTime;
    currentTime += executeTime;

    procs.forEach((p) => {
      if (
        p.arrivalTime > currentTime - executeTime &&
        p.arrivalTime <= currentTime &&
        !queue.includes(p) &&
        !completed.has(p.id) &&
        p.id !== current.id
      ) {
        queue.push(p);
      }
    });

    if (current.remainingTime > 0) {
      queue.push(current);
    } else {
      completed.add(current.id);
      processResults.push({
        ...current,
        startTime: processStartTimes[current.id],
        endTime: currentTime,
        turnaroundTime: currentTime - current.arrivalTime,
        waitingTime: currentTime - current.arrivalTime - current.burstTime,
      });
    }
  }

  return { timeline, processResults };
}
