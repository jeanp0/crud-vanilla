const getClientForm = () => {
  return {
    CI: document.getElementById("CI").value,
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
    city_name: document.getElementById("city").value,
  };
};

export default getClientForm;
