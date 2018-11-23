import React, { Component } from "react";
import { connect } from "react-redux";
import { busqueda } from "../store/search";

class Carrito extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return <div></div>;
  }
}

const mapStateToProps = store => {
  return { state: { ...store.dataReducer } };
};

const mapDispatchToProps = dispatch => {
  return {
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
)(Carrito);
