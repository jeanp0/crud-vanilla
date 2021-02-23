const ClientRow = ({ CI, name, email, age, zone, city }) => {
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
};

export default ClientRow;
