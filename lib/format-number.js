export function formatNumber(x, round = true) {
  let y = x;
  if (round) y = Math.round(x);
  var parts = y.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
