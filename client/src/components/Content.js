import React, { Component } from "react";
import { isObject } from "util";
import {
  Container,
  Card,
  Media,
  Content,
  Field,
  SubTitle,
  Title,
  Button,
  Notification
} from "reactbulma";

export default class content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.productos,
      orderBy: "",
      to_show: [0, 12],
      page: 1,
      total_pages: 0,
      items_per_page: 12
    };
  }

  handlePage(page, items) {
    if (page < 1 || page > this.state.total_pages) return;
    if (items === undefined) items = this.state.items_per_page;
    let show =
      page === 1
        ? [0, items]
        : [items * (page - 1) + 1, items * (page - 1) + items];
    this.setState({
      page,
      to_show: show,
      items_per_page: items,
      total_pages: Math.ceil(this.props.productos.length / items)
    });
  }
  componentDidUpdate(nextProps, nextState, nextContext) {
    if (nextProps.productos[0] !== this.props.productos[0]) {
      this.setState({ page: 1 });
      this.handlePage(1);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      total_pages: Math.ceil(
        nextProps.productos.length / this.state.items_per_page
      )
    });
    //if(nextProps.productos != this.state.productos) this.handlePage(1)
  }
  render() {
    const getNumber = x => {
      let numb = x.match(/\d{1,}/g);

      numb[numb.lenght - 1] =
        numb[numb.length - 1].lenght < 3
          ? (numb[numb.length - 1] = "")
          : numb[numb.length - 1];

      numb = isObject(numb) ? numb.join("") : numb;
      return parseFloat(numb);
    };
    const numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    let parsed = this.props.productos.map(item => {
      if (item.price === undefined || item.price === "")
        return { ...item, price: 0 };
      //if(item.store_name === "ebay") return {...item}
      return { ...item, price: getNumber(item.price) };
    });
    parsed =
      this.state.orderBy === "precio"
        ? parsed.sort((a, b) => a.price - b.price)
        : parsed;

    const cards = parsed.map((item, i) => {
      if (i < this.state.to_show[0] - 1 || i > this.state.to_show[1] - 1)
        return;
      let price = item.price === "" ? "0.00" : item.price;
      //if (price == 0) return;
      let image =
        item.image === "/img/transparent.gif" ||
        item.image === undefined ||
        item.image === ""
          ? "http://placekitten.com/1024/1024"
          : item.image;
      console.log(item.image);
      return (
        <Card className="card">
          <Card.Image src={image} />
          <Button className="like-button">❤️</Button>
          <Card.Content>
            <Content>
              <Title is="5">
                <a key={i} href={item.link} target="_blank">
                  <strong className="is-link">{item.title}</strong>
                </a>
              </Title>
              <div className="price-logo card-footer">
                <img src={item.store} className="store-logo" />
                <span className="tag is-large">
                  <strong>{"$ " + numberWithCommas(price)}</strong>
                </span>
              </div>
            </Content>
          </Card.Content>
        </Card>
      );
    });

    const progreso =
      this.props.progress === 0 ? (
        <span>
          <strong> ({parsed.length})</strong> Resultados para:{" "}
          <strong>{this.props.query}</strong>
        </span>
      ) : (
        <strong className="flashing">
          Buscando Productos en ({this.props.current_progress_name}
          )...
        </strong>
      );
    const notificacion =
      parsed.length > 0 ? (
        <Notification info className="level bold">
          <div className="level-left">
            <span style={{ marginRight: "0.5rem" }}>🕵</span>
            {progreso}
          </div>
          <div className="level-right">
            <div
              className={"select is-small"}
              style={{ marginRight: "0.5rem" }}
            >
              <select
                defaultValue=""
                onChange={event =>
                  this.setState({ orderBy: event.target.value })
                }
              >
                <option value="" disabled>
                  Ordenar por
                </option>
                <option disabled>----------</option>
                <option value="precio">Precio</option>
                <option value="tienda">Tienda</option>
              </select>
            </div>
            <div className={"select is-small"}>
              <select
                defaultValue="12"
                onChange={event => {
                  this.handlePage(
                    this.state.page,
                    parseInt(event.target.value)
                  );
                  //this.handlePage(this.state.page)
                }}
              >
                <option value="12" disabled>
                  Items por pagina
                </option>
                <option disabled>----------</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="20">20</option>
                <option value="32">32</option>
              </select>
            </div>
          </div>
        </Notification>
      ) : (
        ""
      );

    let disable_anterior = {};
    let disable_siguiente = {};
    if (this.state.page === 1) {
      disable_anterior["disabled"] = "disabled";
    }
    if (this.state.page === this.state.total_pages) {
      disable_siguiente["disabled"] = "disabled";
    }
    const pagina_1 =
      this.state.page === 1 ? (
        ""
      ) : (
        <li>
          <a
            class="pagination-link"
            onClick={() => this.handlePage(1)}
            aria-label="Goto page 1"
          >
            1
          </a>
        </li>
      );
    const pagina_last =
      this.state.page === this.state.total_pages ? (
        ""
      ) : (
        <li>
          <a
            class="pagination-link"
            onClick={() => this.handlePage(this.state.total_pages)}
            aria-label={`Goto page ${this.state.total_pages}`}
          >
            {this.state.total_pages}
          </a>
        </li>
      );
    const pagina_anterior =
      this.state.page === 1 ? (
        ""
      ) : (
        <li>
          <a
            class="pagination-link"
            aria-label="Goto page 45"
            onClick={() => this.handlePage(this.state.page - 1)}
          >
            {this.state.page - 1}
          </a>
        </li>
      );
    const pagina_siguiente =
      this.state.page === this.state.total_pages ? (
        ""
      ) : (
        <li>
          <a
            class="pagination-link"
            aria-label="Goto page 47"
            onClick={() => this.handlePage(this.state.page + 1)}
          >
            {this.state.page + 1}
          </a>
        </li>
      );
    const vermas =
      parsed.length > 0 ? (
        <div>
          <hr />
          <Field groupedCentered>
            <nav
              class="pagination is-centered"
              role="navigation"
              aria-label="pagination"
            >
              <a
                class="pagination-previous"
                onClick={() => this.handlePage(this.state.page + -1)}
                {...disable_anterior}
              >
                Anterior
              </a>
              <a
                class="pagination-next"
                onClick={() => this.handlePage(this.state.page + 1)}
                {...disable_siguiente}
              >
                Siguiente
              </a>
              <ul class="pagination-list">
                {pagina_1}

                <li>
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                {pagina_anterior}

                <li>
                  <a
                    class="pagination-link is-current info-color"
                    aria-label="Page 46"
                    aria-current="page"
                  >
                    {this.state.page}
                  </a>
                </li>
                {pagina_siguiente}
                <li>
                  <span class="pagination-ellipsis">&hellip;</span>
                </li>
                {pagina_last}
              </ul>
            </nav>
          </Field>
          <hr />
        </div>
      ) : (
        ""
      );
    return (
      <Container>
        {notificacion}
        <div className="content-wrapper">{cards}</div>

        {vermas}
      </Container>
    );
  }
}
