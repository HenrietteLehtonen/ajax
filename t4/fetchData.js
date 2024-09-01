// eslint-disable-next-line no-unused-vars
async function fetchData(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('HTTP error: ' + response.status);
  }
  const json = await response.json();
  return json;
}
