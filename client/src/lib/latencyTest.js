const performance = window.performance;

export async function testLatency(url) {
  const start = performance.now();
  await fetch(url, {mode: 'no-cors'});
  const end = performance.now();
  return end - start;
}

export async function getAvgLatency(url, n) {
  let total = 0;
  for (let i = 0; i < n; i++) {
    const time = await testLatency(url);
    total += time;
  }
  return total / n;
}
