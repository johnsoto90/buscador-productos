import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "reactbulma";
import Filtros from "./Filtros";
import Producto from "./Producto";
import Paginator from "./Paginator";

class Content extends Component {
  render() {
    const numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    let items = [...this.props.state.productos];

    switch (this.props.state.order_by) {
      case "precio <":
        items.sort((a, b) => a.price - b.price);
        break;
      case "precio >":
        items.sort((a, b) => b.price - a.price);
        break;
      default:
        items = this.props.state.productos;
        break;
    }

    const productos = items.map((item, i) => {
      if (
        i + 1 > this.props.state.pagination.mostrar[1] ||
        i < this.props.state.pagination.mostrar[0]
      )
        return;

      let image =
        item.image === "/img/transparent.gif" || item.image === undefined
          ? "http://noticiasnet.com.ar/latiendanet/oc-content/themes/osclasswizards/images/no_photo.gif"
          : item.image;
      return (
        <Producto
          key={i}
          producto={item}
          index={i}
          title={item.title}
          image={image}
          price={numberWithCommas(item.price)}
          link={item.link}
          logo={item.store}
        />
      );
    });

    const filtro = this.props.state.productos.length > 1 ? <Filtros /> : "";
    return (
      <Container style={{ padding: "0.5rem" }}>
        {filtro}
        <div className="content-wrapper">{productos}</div>
        <Paginator />
      </Container>
    );
  }
}
const mapStateToProps = store => {
  return { state: { ...store.dataReducer } };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
