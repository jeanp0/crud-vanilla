const CityOption = (value, name) => {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = name;
  return option;
};

export default CityOption;
