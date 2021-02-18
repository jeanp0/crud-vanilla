// constantes del DOM
const $selectZone = document.getElementById("zone");
const $formClient = document.getElementById("formClient");
const $btnCreate = document.getElementById("btnCreate");

// Variable global para indicar si crea o actualiza
let mode = "";

/* Listar tabla de clientes */

async function fetchDataFromDB() {
  const url = "http://localhost/crud-vanilla/backend/crud-clients.php";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option: 1 }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
  // console.log(response);

  drawRows(response);
}

function drawRows(clients) {
  // Por cada cliente se crea y agrega una fila a la tabla del DOM
  clients.forEach((client) => createRow(client));

  // Una vez dibujada todas las tablas, se agregan los eventos para update
  let $btnsUpdate = document.getElementsByClassName("btnUpdate");
  $btnsUpdate = Array.from($btnsUpdate);

  // Evento click UPDATE
  $btnsUpdate.map((btn) => {
    btn.addEventListener("click", async (e) => {
      // Se actualiza el valor del mode para saber si guardar o actualizar
      mode = "update";
      document.getElementById("CI").disabled = true;
      const CI = e.target.parentElement.parentElement.getAttribute("CI");
      // Se llena el formulario con los valores obtenidos según el CI
      setFormDataByCI(CI);
    });
  });

  // Y para delete
  let $btnsDelete = document.getElementsByClassName("btnDelete");
  $btnsDelete = Array.from($btnsDelete);

  // Evento click DELETE
  $btnsDelete.map((btn) => {
    btn.addEventListener("click", async (e) => {
      const CI = e.target.parentElement.parentElement.getAttribute("CI");
      // Se elimina un cliente según su CI
      const response = await getOrDeleteClienteFromDB(4, CI);
      console.log(response);
      // reset al body del table
      secureReChargeTBody();
    });
  });
}

function createRow(client) {
  const clientRow = document.createElement("tr");
  clientRow.setAttribute("CI", client.CI);
  clientRow.innerHTML = RowComponent(client);
  document.getElementById("table_body").appendChild(clientRow);
}

function RowComponent({ CI, name, email, age, zone, city }) {
  return `
    <th scope="row">${CI}</th>
    <td>${name}</td>
    <td>${email}</td>
    <td>${age}</td>
    <td>${zone}</td>
    <td>${city}</td>
    <td class="d-flex justify-content-evenly">
      <button class="btn btn-primary btnUpdate" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Update</button>
      <button class="btn btn-danger btnDelete">Delete</button>
    </td>
  `;
}

/* Llenar el formulario con el Cliente seleccionado para editar */

async function setFormDataByCI(CI) {
  const client = await getOrDeleteClienteFromDB(5, CI);
  document.getElementById("CI").value = client.CI;
  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  document.getElementById("age").value = client.age;
  document.getElementById("zone").value = client.zone;
  handlerSelect(); // actualizar el valor del Select según la zona...
  document.getElementById("city").value = client.city;
  // console.log(client);
}

async function getOrDeleteClienteFromDB(option, CI) {
  // option=4 para ELIMINAR el cliente.
  // option=5 para OBTENER el cliente
  const url = "http://localhost/crud-vanilla/backend/crud-clients.php";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option, CI }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
  return response;
}

/* Dinamismo del Select Zona/Ciudad */

function handlerSelect() {
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
    updateSelect(northCities);
  } else if ($selectZone.value === "Center") {
    updateSelect(centerCities);
  } else if ($selectZone.value === "South") {
    updateSelect(southCities);
  }
}

function updateSelect(cities) {
  const $selectCity = document.getElementById("city");
  $selectCity.innerHTML =
    "<option selected disabled>---Select a zone---</option>";
  cities.map((city) => {
    const option = OptionComponent(city.value, city.name);
    $selectCity.appendChild(option);
  });
}

function OptionComponent(value, name) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = name;
  return option;
}

/* Eventos de botones */

// Evento click CANCEL
document.getElementById("btnCancel").addEventListener("click", () => {
  // reset al formulario
  $formClient.reset();
});

// Evento CLICK SAVE
document.getElementById("btnSave").addEventListener("click", () => {
  // crea un cliente con los valores del formulario
  const client = {
    CI: document.getElementById("CI").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    zone: document.getElementById("zone").value,
    city: document.getElementById("city").value,
  };
  if (mode === "create") {
    // inserta el cliente a la base de datos
    createOrUpdateClientFromDB(2, client);
  } else if (mode === "update") {
    // actualiza el cliente en la base de datos
    createOrUpdateClientFromDB(3, client);
  }

  // reset al body del table
  secureReChargeTBody();

  // reset al formulario
  $formClient.reset();
});

// Evento click CREATE (+)
$btnCreate.addEventListener("click", () => {
  // Se actualiza el valor del mode para saber si guardar o actualizar
  mode = "create";
  // Se habilita el input del CI
  document.getElementById("CI").disabled = false;
});

async function createOrUpdateClientFromDB(
  option,
  { CI, name, email, age, zone, city }
) {
  const url = "http://localhost/crud-vanilla/backend/crud-clients.php";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option, CI, name, email, age, zone, city }),
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));
  console.log(response);
}

function secureReChargeTBody() {
  document.getElementById("table_body").innerHTML = "";
  setTimeout(() => {
    fetchDataFromDB();
  }, 50);
}

fetchDataFromDB();
$selectZone.addEventListener("change", handlerSelect);
