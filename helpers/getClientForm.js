const getClientForm = () => {
  return {
    CI: document.getElementById("CI").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    zone: document.getElementById("zone").value,
    city: document.getElementById("city").value,
  };
};

export default getClientForm;
