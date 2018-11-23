import { isObject } from "util";

const busqueda = async (query, settings, dispatch) => {
  let productos = [];

  const getNumber = x => {
    let numb = x.match(/\d{1,}/g);

    numb[numb.lenght - 1] =
      numb[numb.length - 1].lenght < 3
        ? (numb[numb.length - 1] = "")
        : numb[numb.length - 1];

    numb = isObject(numb) ? numb.join("") : numb;
    return parseFloat(numb);
  };

  let stores = settings.stores.filter(item => item.is_active);

  dispatch({ type: "FETCHING_INFO", value: "Productos" });

  //Fetching productos del servidor
  productos = await fetch(`/search?q=${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(stores)
  })
    .then(result => result.text())
    .then(body => {
      return [...productos, ...JSON.parse(body)];
    });
  console.log(productos);
  //Parsed Product prices...
  let parsed = productos.map(item => {
    if (item.price === undefined || item.price === "")
      return { ...item, price: 0 };
    return { ...item, price: getNumber(item.price) };
  });

  //Limpiar productos
  dispatch({type: "CLEAN"})

  return parsed;
};
export { busqueda };
