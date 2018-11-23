const express = require("express");
const morgan = require("morgan");
const controllers = require("./control/GetProducts.js");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 8080;

//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.post("/search", async (req, res) => {
  let stores = req.body.map(item => item.name);
  let result = [];
  let i = 0;
  
  let search_loop = async acumulator => {
    if (i === stores.length) return acumulator;
    let data = await controllers.get_products(stores[i], req.query.q);
    i++;
    return search_loop([...data, ...acumulator]);
  };
  result = await search_loop([]);

  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Example app listening on ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.
