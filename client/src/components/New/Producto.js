import React, { Component } from "react";

import { Button, Content, Title, Card } from "reactbulma";
import { connect } from "react-redux";

class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = { is_disabled: false };
  }

  componentDidMount() {
    this.checkFavoritos(this.props.link, this.props.state.favoritos);
  }
  componentDidUpdate(prevProps){
    if(prevProps.link != this.props.link){
      this.checkFavoritos(this.props.link, this.props.state.favoritos);
    }
    
  }

  checkFavoritos = (link, favoritos) => {
    favoritos.forEach(favorito => {
      if (favorito.link === link) this.setState({ is_disabled: true });
    });
  };

  render() {
    const BotonFavorito = value => {
      const boton = value ? (
        <Button
          onClick={() => {
            this.setState({ is_disabled: false });
            this.props.borrarFavorito(this.props.producto);
          }}
          className="like-delete delete is-large"
        />
      ) : (
        <Button
          onClick={() => {
            this.setState({ is_disabled: true });
            this.props.agregarFavorito([
              ...this.props.state.favoritos,
              this.props.producto
            ]);
          }}
          className="like-button"
        >
          ❤️
        </Button>
      );
      return boton;
    };

    return (
      <Card>
        <Card.Image src={this.props.image} />
        {BotonFavorito(this.state.is_disabled)}
        <Card.Content>
          <Content>
            <Title is="5">
              <a href={this.props.link} target="_blank">
                <strong className="is-link">{this.props.title}</strong>
              </a>
            </Title>
            <div className="price-logo card-footer">
              <img src={this.props.logo} className="store-logo" />
              <span className="tag is-large">
                <strong>{"$ " + this.props.price}</strong>
              </span>
            </div>
          </Content>
        </Card.Content>
      </Card>
    );
  }
}
const mapStateToProps = store => {
  return { state: { ...store.dataReducer } };
};

const mapDispatchToProps = dispatch => {
  return {
    agregarFavorito: value => dispatch({ type: "AGREAGAR_FAVORITO", value }),
    borrarFavorito: value => dispatch({ type: "BORRAR_FAVORITO", value })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Producto);
