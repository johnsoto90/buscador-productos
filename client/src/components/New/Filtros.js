import React, { Component } from "react";
import { connect } from "react-redux";
import { Notification } from "reactbulma";

class Filtros extends Component {
  render() {
    const progreso =
      this.props.state.fetching_info !== "" ? (
        <span className="flashing">
          Buscando <strong>({this.props.state.fetching_info})</strong>
        </span>
      ) : (
        <span>
          <strong>({this.props.state.productos.length})</strong> Resultados para{" "}
          <strong>{this.props.state.last_query}</strong>
        </span>
      );
    return (
      <Notification className="level bold">
        <div className="level-left">
          <span style={{ marginRight: "0.5rem" }}>🕵</span>
          {progreso}
        </div>
        <div className="level-right">
          <strong style={{ marginRight: "0.5rem" }}>Ordenar por:</strong>
          <div className={"select is-small"} style={{ marginRight: "0.5rem" }}>
            <select
              defaultValue="tienda"
              onChange={e => this.props.orderBy(e.target.value)}
            >
              
              
              <option value="precio <">🠧 Precio</option>
              <option value="precio >">🠥 Precio</option>
              <option value="tienda">Tienda</option>
            </select>
          </div>
          <div className={"select is-small"}>
            <select
              defaultValue="8"
              onChange={e => this.props.itemsPerPage(parseInt(e.target.value))}
            >
             
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="20">20</option>
              <option value="32">32</option>
            </select>
          </div>
        </div>
      </Notification>
    );
  }
}
const mapStateToProps = store => {
  return { state: { ...store.dataReducer } };
};

const mapDispatchToProps = dispatch => {
  return {
    itemsPerPage: value => {
      dispatch({ type: "ITEMS_PER_PAGE", value });
      dispatch({ type: "HANDLE_PAGE", value: 1 });
    },
    orderBy: value => {
      dispatch({ type: "ORDER_BY", value });
      dispatch({ type: "HANDLE_PAGE", value: 1 });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filtros);
