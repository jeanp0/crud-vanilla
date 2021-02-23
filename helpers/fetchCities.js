const fetchCities = async (zone_name) => {
  const url = "http://localhost/crud-vanilla/backend/crud-clients.php";
  const data = {
    option: 6,
    zone_name,
  };

  console.log(zone_name);
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export default fetchCities;
