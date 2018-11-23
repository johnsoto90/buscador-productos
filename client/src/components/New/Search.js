import React, { Component } from "react";
import { connect } from "react-redux";
import { busqueda } from "../../store/search";
import {
  Hero,
  Container,
  Title,
  Input,
  Control,
  Field,
  Button
} from "reactbulma";

class Search extends Component {
  handleFavButton() {
    const counter_favoritos =
      this.props.state.favoritos.length > 0 ? (
        <span className="contador-favoritos">
          {this.props.state.favoritos.length}
        </span>
      ) : (
        ""
      );

    const boton_favoritos = (
      <Button
        onClick={() => {
          if(this.props.state.favoritos.length > 0) this.props.updateContent("favoritos")
        }}
        
        className="tags"
      >
        Favoritos 🛒 {counter_favoritos}
      </Button>
    );

    const boton_productos = (
      <Button
        onClick={() => this.props.updateContent("productos")}
        className="tags"
      >
        Resultados 📦{" "}
        <span className="contador-resultados is-dark">
          {this.props.state.productos.length}
        </span>
      </Button>
    );
    switch (this.props.state.content) {
      case "productos":
        return boton_favoritos;
      case "favoritos":
        return boton_productos;
      default:
        return boton_favoritos;
    }
  }

  render() {
    const is_loading =
      this.props.state.fetching_info === "" ? "" : "is-loading";
    const is_fullheight =
      this.props.state.content === "" ? "is-fullheight" : "";

    return (
      <Hero bold className={is_fullheight}>
        <Hero.Body>
          <Container>
            <div className="brand">
              <img src="img/logo2.png"/>
              <Title>Encuentralo.cl</Title>
            </div>

            <Field className="field searchbar" hasAddons>
              <p className="control has-icons-left searchbar-control">
                <Input
                  placeholder="Encuentra lo que buscas ya!"
                  className="input"
                  medium
                  onChange={e => this.props.updateQuery(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === "Enter")
                      this.props.searchProducts(this.props.state);
                  }}
                />
                <span className="icon is-small is-left"></span>
              </p>
              <Control>
                <Button
                  success
                  medium
                  className={is_loading}
                  onClick={() => this.props.searchProducts(this.props.state)}
                >
                  Buscar{" "}
                </Button>
              </Control>
            </Field>
            <p className="buttons center">
              {this.handleFavButton()}
              <Button className="tags">
                Opciones ⚙️
              </Button>
            </p>
          </Container>
        </Hero.Body>
      </Hero>
    );
  }
}

const mapStateToProps = store => {
  return { state: { ...store.dataReducer } };
};

const mapDispatchToProps = dispatch => {
  return {
    updateContent: value => dispatch({ type: "CHANGE_CONTENT", value: value }),
    updateQuery: value => dispatch({ type: "UPDATE_QUERY", value }),
    searchProducts: value =>
      busqueda(value.query, value.settings, dispatch).then(productos =>
        dispatch({ type: "UPDATE_PRODUCTOS", productos })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
