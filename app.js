import fetchClients from "./helpers/fetchClients.js";
import getClientForm from "./helpers/getClientForm.js";
import setClientForm from "./helpers/setClientForm.js";
import ClientRow from "./components/ClientRow.js";
import CityOption from "./components/CityOption.js";

// constantes del DOM
const $selectZone = document.getElementById("zone");
const $formClient = document.getElementById("formClient");
const $btnCreate = document.getElementById("btnCreate");

// Variable global para indicar si crea o actualiza
let mode = "";

/* Listar tabla de clientes */

async function listClients() {
  const response = await fetchClients(1)
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
  drawRows(response);
}

function drawRows(clients) {
  // Por cada cliente se crea y agrega una fila a la tabla del DOM
  clients.forEach((client) => createRow(client));

  // Con todas las filas creadas se agregan los eventos

  // Update client event
  let $btnsUpdate = Array.from(document.getElementsByClassName("btnUpdate"));
  $btnsUpdate.map((btn) => {
    btn.addEventListener("click", async (e) => {
      const CI = e.target.parentElement.parentElement.getAttribute("CI");
      const client = await getClient(CI);
      mode = "update";
      document.getElementById("CI").disabled = true;

      setClientForm(client);
    });
  });

  // Delete client event
  let $btnsDelete = Array.from(document.getElementsByClassName("btnDelete"));
  $btnsDelete.map((btn) => {
    btn.addEventListener("click", (e) => deleteClient(e));
  });
}

function createRow(client) {
  const clientRow = document.createElement("tr");
  clientRow.setAttribute("CI", client.CI);
  clientRow.innerHTML = ClientRow(client);
  document.getElementById("table_body").appendChild(clientRow);
}

/* Llenar el formulario con el Cliente seleccionado para editar */

/* Dinamismo del Select Zona/Ciudad */

function handlerSelect() {
  // Esta función actualiza los valores del Select
  const northCities = [
    { name: "Sauces", value: "Sauces" },
    { name: "Ceibos", value: "Ceibos" },
    { name: "Urdesa", value: "Urdesa" },
  ];

  const centerCities = [
    { name: "9 de Octubre", value: "9 de Octubre" },
    { name: "Ismael", value: "Ismael" },
    { name: "Antepara", value: "Antepara" },
  ];

  const southCities = [
    { name: "Floresta", value: "Floresta" },
    { name: "Guasmo", value: "Guasmo" },
    { name: "Tulipanes", value: "Tulipanes" },
  ];

  if ($selectZone.value === "North") {
    updateCitiesSelect(northCities);
  } else if ($selectZone.value === "Center") {
    updateCitiesSelect(centerCities);
  } else if ($selectZone.value === "South") {
    updateCitiesSelect(southCities);
  }
}

function updateCitiesSelect(cities) {
  const $selectCity = document.getElementById("city");
  $selectCity.innerHTML =
    "<option selected disabled>---Select a zone---</option>";
  cities.map((city) => {
    const option = CityOption(city.value, city.name);
    $selectCity.appendChild(option);
  });
}

async function getClient(CI) {
  // option=5 para OBTENER el cliente
  const response = await fetchClients(5, CI)
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
  console.log(response);
  return response;
}

async function createClient({ CI, name, email, age, zone, city }) {
  const response = await fetchClients(2, CI, name, email, age, zone, city)
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
  console.log(response);
}

async function updateClient({ CI, name, email, age, zone, city }) {
  const response = await fetchClients(3, CI, name, email, age, zone, city)
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
  console.log(response);
}

async function deleteClient(event) {
  // option=4 para ELIMINAR el cliente.
  const CI = event.target.parentElement.parentElement.getAttribute("CI");
  const response = await fetchClients(4, CI)
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
  console.log(response);

  secureReChargeTBody();
}

function secureReChargeTBody() {
  document.getElementById("table_body").innerHTML = "";
  setTimeout(() => {
    listClients();
  }, 50);
}

/* Eventos DOM*/

// Evento click CANCEL
document.getElementById("btnCancel").addEventListener("click", () => {
  // reset al formulario
  $formClient.reset();
});

// Evento click SAVE
document.getElementById("btnSave").addEventListener("click", () => {
  // crea un cliente con los valores del formulario
  const client = getClientForm();
  if (mode === "create") {
    // inserta el cliente a la base de datos
    createClient(client);
  } else if (mode === "update") {
    // actualiza el cliente en la base de datos
    updateClient(client);
  }
  // reset al body del table
  secureReChargeTBody();
  $formClient.reset();
});

// Evento click CREATE
$btnCreate.addEventListener("click", () => {
  // Se actualiza el valor del mode para saber si guardar o actualizar
  mode = "create";
  // Se habilita el input del CI
  document.getElementById("CI").disabled = false;
});

// Evento click Zone cambia CIudad
$selectZone.addEventListener("change", handlerSelect);

listClients();
