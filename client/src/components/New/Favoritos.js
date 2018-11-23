import React, { Component } from "react";
import { connect } from "react-redux";
import Producto from "./Producto";
import { isObject } from "util";
import { Container, Notification } from "reactbulma";

class Favoritos extends Component {
  render() {
   
    const numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    

    const favoritos = this.props.state.favoritos.map((item, i) => {
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
    return (
      <Container>
        <Notification><strong>Mis Favoritos</strong></Notification>
        <div className="content-wrapper">{favoritos}</div>
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
)(Favoritos);
