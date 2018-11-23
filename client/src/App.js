import React, { Component } from "react";
import Search from "./components/New/Search";
import Footer from "./components/Footer";
import Carrito from "./components/Carrito";
import "./App.css";
import { connect } from "react-redux";
import { busqueda } from "./store/search";

import Productos from "./components/New/Productos";
import Favoritos from "./components/New/Favoritos";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_progress_name: "",
      progress: 0,
      settings: {},
      data: {}
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  
  componentDidUpdate(nextProps, nextState, nextContext) {
    if (this.state.progress > 100)
      setTimeout(
        () => this.setState({ progress: 0, current_progress_name: "" }),
        500
      );
  }
  handleUpdate(data) {
    if (this.state.settings !== data) {
      if (data.query !== "") {
        if (this.state.settings.query !== data.query)
          this.handleSearch(data.query);
      }

      this.setState({ settings: data });
    }
  }

  handleContent() {
    switch (this.props.state.content) {
      case "productos":
        return <Productos/>
      case "favoritos":
        return <Favoritos/>
      default:
        break;
    }
  }
  render() {
    
    return (
      <div className="App .container">
        <Search/>
        {this.handleContent()}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = store => {
  return { state: { ...store.dataReducer } };
};

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
