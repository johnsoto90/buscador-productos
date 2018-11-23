import React, { Component } from "react";
import {
  Control,
  Hero,
  Container,
  Title,
  Field,
  Input,
  Button,
  Notification,
  Delete
} from "reactbulma";

export default class hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      input_value: "",
      orderby: "",
      categories: [
        "Tecnologia",
        "Salud",
        "Deportes",
        "Electrodomesticos",
        "Herramientas",
        "Oficina",
        "Libros",
        "Musica",
        "Mascotas"
      ],
      stores: ["mercadolibre", "yapo", "pcfactory", "spdigital"],
      regiones: [
        "Arica y Parinacota",
        "Tarapacá",
        "Antofagasta",
        "Atacama",
        "Coquimbo",
        "Valparaíso",
        "Metropolitana de Santiago",
        "Libertador General Bernardo O'Higgins",
        "Maule",
        "Ñuble",
        "Biobío",
        "Araucanía",
        "Ríos",
        "Los Lagos",
        "Aysén del General Carlos Ibáñez del Campo",
        "Magallanes y de la Antártica Chilena"
      ],
      yapo: { is_active: true },
      mercadolibre: { is_active: true },
      pcfactory: { is_active: true },
      spdigital: { is_active: true },
      options: false
    };
  }
  handleToggle(name) {
    this.setState({ [name]: { is_active: !this.state[name].is_active } });
  }
  handleUpdate(state) {
    this.props.getState(state);
  }
  handleSearch(query) {
    this.setState({ query });
  }
  componentDidMount() {
    this.handleUpdate(this.state);
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state !== nextState) this.handleUpdate(nextState);
  }
  render() {
    let is_active = name => {
      if (this.state[name].is_active === true) return "tags ";
      else return "tags opacity-50";
    };
    let categorias = this.state.categories.map((item, i) => {
      return (
        <option key={i} value={item}>
          {" "}
          {item}{" "}
        </option>
      );
    });
    let regiones = this.state.regiones.map((item, i) => (
      <option key={i} value={item}>
        {item}
      </option>
    ));
    let test =
      this.props.productos.length === 0
        ? "hero-header is-fullheight"
        : "hero-header";
    let buttons = this.state.stores.map((item, i) => {
      return (
        <Button
          key={i}
          style={{ marginRight: "0.5rem" }}
          onClick={() => this.handleToggle(item)}
          small
          className={is_active(item)}
        >
          {item}
        </Button>
      );
    });
    let campos = (
      <div>
        <div className="select is-small" style={{ marginRight: "0.5rem" }}>
          <select defaultValue="">
            <option value="" disabled>
              Categoria
            </option>
            <option disabled>----------</option>
            {categorias}
          </select>
        </div>
        <div className="select is-small " style={{ marginRight: "0.5rem" }}>
          <select defaultValue="">
            <option value="" disabled>
              Precio
            </option>
            <option disabled>----------</option>
            <option>Menor a Mayor</option>
            <option>Mayor a Menor</option>
          </select>
        </div>
        <div className="select is-small" style={{ marginRight: "0.5rem" }}>
          <select defaultValue="">
            <option value="" disabled>
              Regiones
            </option>
            <option disabled>----------</option>
            {regiones}
          </select>
        </div>
      </div>
    );
    let options_menu = !this.state.options ? (
      ""
    ) : (
      <article class="box is-info">
        <Delete
          className="is-pulled-right"
          onClick={() => this.setState({ options: false })}
        />
        <div className="field is-grouped is-grouped-multiline">{buttons}</div>
        {campos}
      </article>
    );

    let is_loading = this.props.progress === 0 ? "" : "is-loading";
    return (
      <Hero bold className={test}>
        <Hero.Body>
          <Container>
            <Title className="titulo">🛍️ Encuentralo.cl</Title>

            <Field className="field searchbar" hasAddons>
              <p className="control has-icons-left searchbar-control">
                <Input
                  placeholder="Encuentra lo que buscas ya!"
                  className="input"
                  medium
                  onChange={event =>
                    this.setState({ input_value: event.target.value })
                  }
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      this.handleSearch(event.target.value);
                  }}
                />
                <span className="icon is-small is-left">🔎</span>
              </p>
              <Control>
                <Button
                  medium
                  className={is_loading}
                  onClick={() => this.handleSearch(this.state.input_value)}
                >
                  Buscar{" "}
                </Button>
              </Control>
            </Field>

            <p className="buttons center">
              <Button success className="tags">
                Carrito de compras! 🛒
              </Button>
              <Button
                onClick={() => this.setState({ options: true })}
                info
                className="tags"
              >
                Opciones Avanzadas ⚙️
              </Button>
            </p>
            {options_menu}
          </Container>
        </Hero.Body>
      </Hero>
    );
  }
}
