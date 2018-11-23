const cheerio = require("cheerio");
const fetch = require("node-fetch");

const uris = {
  mercadolibre: "https://listado.mercadolibre.cl/",
  yapo: "https://www.yapo.cl/chile/todos_los_avisos?ca=15_s&l=0&q=",
  pcfactory: "https://www.pcfactory.cl/buscar?valor=",
  spdigital: "https://www.spdigital.cl/categories/search?q=",
  ebay: "https://www.ebay.com/sch/i.html?_nkw="
};

exports.get_products = async (market, query) => {
  let url = uris[market];
  let max = 10;
  let ciclo = 1;
  let final_query;
  let result = [];

  let get_data = async current => {
    let pagina;

    if (market === "mercadolibre")
      pagina = ciclo === 1 ? "" : "_Desde_" + (ciclo * 50 + 1);
    if (market === "yapo") pagina = ciclo === 1 ? "" : "&o=" + ciclo;
    if (market === "spdigital") pagina = ciclo === 1 ? "" : "&page=" + ciclo;
    if (market === "pcfactory") pagina = ciclo === 1 ? "" : "55" + ciclo;

    final_query = url + query + pagina;

    const html = await fetch(final_query)
      .then(res => res.text())
      .catch(err => {});

    const $ = cheerio.load(html);
    ciclo++;

    let data;
    if (market === "pcfactory") data = pcfactory_data($);
    if (market === "spdigital") data = spdigital_data($);
    if (market === "mercadolibre") data = mercadolibre_data($);
    if (market === "yapo") data = yapo_data($);
    
    //fix bug spdigital
    if (data.length > 1 && current.length > 1){
      if(data[0].link === current[0].link) return current
    }
    //Para la recursion si llega al limite o la respuesta es nula
    if (data.length === 0 || ciclo > max) {
      return current;
    } else {
      return await get_data([...data, ...current]);
    }
  };
  result = await get_data(result);
  return result;
};

const spdigital_data = $ => {
  let products = $(".product-item-mosaic").map((i, elem) => {
    let producto = {
      store_name: "spdigital",
      store: "https://www.spdigital.cl/img/site/logo-sp-slogan.jpg",
      title: $(elem)
        .find(".name > a > span")
        .text()
        .trim(),
      price: $(elem)
        .find(".cash-price")
        .text()
        .trim(),
      image: $(elem)
        .find(".image > a > img")
        .attr("src")
        .replace("thumb-", ""),

      link:
        "https://www.spdigital.cl/" +
        $(elem)
          .find(".name > a")
          .attr("href")
    };
    return producto;
  });
  return products.get();
};
const ebay_data = $ => {
  let products = $(".s-item").map((i, elem) => {
    let image =
      $(elem)
        .find(".s-item__image-img")
        .attr("data-src") === undefined
        ? $(elem)
            .find(".s-item__image-img")
            .attr("src")
        : $(elem)
            .find(".s-item__image-img")
            .attr("data-src");

    let producto = {
      store_name: "ebay",
      store:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/1024px-EBay_logo.svg.png",
      title: $(elem)
        .find(".s-item__title")
        .text()
        .trim(),
      price: $(elem)
        .find(".s-item__price")
        .text()
        .trim(),
      image: image,

      link: $(elem)
        .find(".s-item__link")
        .attr("href")
    };
    return producto;
  });
  return products.get();
};

const pcfactory_data = $ => {
  let products = $(".center-caluga").map((i, elem) => {
    let producto = {
      store_name: "pcfactory",
      store:
        "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/082012/pcfactory_0.png",
      title: $(elem)
        .find(".nombre")
        .text()
        .trim(),
      price: $(elem)
        .find(".txt-precio")
        .text()
        .trim(),
      image:
        "https://www.pcfactory.cl/" +
        $(elem)
          .find("img")
          .attr("src")
          .replace("100.jpg", "500.jpg"),

      link:
        "https://www.pcfactory.cl" +
        $(elem)
          .find(".noselect")
          .attr("href")
    };
    return producto;
  });
  return products.get();
};

const yapo_data = $ => {
  let products = $(".ad").map((i, elem) => {
    let producto = {
      store_name: "yapo",
      store: "https://www.tecnopymes.cl/wp-content/uploads/2016/01/yapo.jpg",
      title: $(elem)
        .find(".title")
        .text()
        .trim(),
      price: $(elem)
        .find(".price")
        .text()
        .trim(),
      image: $(elem)
        .find(".image")
        .attr("src")
        .replace("thumbsli", "images"),
      link: $(elem)
        .find(".redirect-to-url")
        .attr("href")
    };
    return producto;
  });
  return products.get();
};

const mercadolibre_data = $ => {
  let products = $(".rowItem").map((i, elem) => {
    let id =
      $(elem)
        .find("img")
        .attr("id") === undefined
        ? ".lazy-load"
        : ".loading";

    let image = $(elem)
      .find(id)
      .attr(id === ".lazy-load" ? "src" : "title");

    image = image === undefined ? "" : image.replace("-X", "-F");

    let producto = {
      store_name: "mercadolibre",
      store:
        "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/032018/untitled-1_100.png",
      title: $(elem)
        .find(".main-title")
        .text()
        .trim(),
      price: $(elem)
        .find(".price__fraction")
        .text()
        .trim(),
      image: image,

      link: $(elem)
        .find(".item-image")
        .attr("href")
    };
    return producto;
  });
  return products.get();
};
