async function setClientForm(client) {
  // Se llena el formulario con los valores obtenidos según el CI
  document.getElementById("CI").value = client.CI;
  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  document.getElementById("age").value = client.age;
  document.getElementById("zone").value = client.zone;
  handlerSelect(); // actualizar el valor del Select según la zona...
  document.getElementById("city").value = client.city;
}

export default setClientForm;
