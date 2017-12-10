export async function getISPLoc() {
  const response = await fetch('http://ip-api.com/json');
  const ans = await response.json();
  return {isp: ans.isp, latitude: ans.lat, longitude: ans.lon};
}
