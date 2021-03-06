const fetchClients = async (option, CI, name, email, age, city_name) => {
  const url = "http://localhost/crud-vanilla/backend/crud-clients.php";
  const data = {
    option,
    CI,
    name,
    email,
    age,
    city_name,
  };

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export default fetchClients;
