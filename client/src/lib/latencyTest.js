const performance = window.performance;

export async function testLatency(url) {
  const start = performance.now();
  try {
    await fetch(url, {mode: 'no-cors'});
  } catch (e) {
    console.log(e);
    return null;
  }
  const end = performance.now();
  return end - start;
}

export async function getAvgLatency(url, n) {
  let total = 0;
  for (let i = 0; i < n; i++) {
    const time = await testLatency(url);
    if (time == null) {
      return null;
    }
    total += time;
  }
  return total / n;
}
