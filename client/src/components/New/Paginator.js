import React, { Component } from "react";
import { connect } from "react-redux";
import { Field } from "reactbulma";
class Paginator extends Component {
  handlePage(page) {
    if (
      page < 1 ||
      page > this.props.state.pagination.max_pages ||
      page === this.props.state.pagination.current_page
    )
      return;
    this.props.changePage(page);
  }

  render() {
    let disable_anterior = {};
    let disable_siguiente = {};
    let disable_ultimo = {}
    let disable_primero = {}
    if (this.props.state.pagination.current_page === 1) {
      disable_anterior["disabled"] = "disabled";
      disable_primero["disabled"] = "disabled";
    }
    if (
      this.props.state.pagination.current_page ===
      this.props.state.pagination.max_pages
    ) {
      disable_siguiente["disabled"] = "disabled";
      disable_ultimo["disabled"] = "disabled";
    }

    
    let bonton_step_forward =
      this.props.state.pagination.current_page + 1 <=
      this.props.state.pagination.max_pages ? (
        <li>
          <a className="pagination-link">
            {this.props.state.pagination.current_page + 1}
          </a>
        </li>
      ) : (
        ""
      );
      let bonton_step_backwards =
      this.props.state.pagination.current_page - 1 >=
      1 ? (
        <li>
          <a className="pagination-link">
            {this.props.state.pagination.current_page - 1}
          </a>
        </li>
      ) : (
        ""
      );
    return (
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
              {...disable_anterior}
              onClick={() =>
                this.handlePage(this.props.state.pagination.current_page - 1)
              }
            >
              Anterior
            </a>
            <a
              className="pagination-next"
              {...disable_siguiente}
              onClick={() =>
                this.handlePage(this.props.state.pagination.current_page + 1)
              }
            >
              Siguiente
            </a>
            <ul class="pagination-list">
              <li>
                <a
                  {...disable_primero}
                  className="pagination-link"
                  onClick={() => this.handlePage(1)}
                >
                  1
                </a>
              </li>
              <li>
                <span class="pagination-ellipsis">&hellip;</span>
              </li>
              {bonton_step_backwards}
              <li>
                <a
                  className="pagination-link is-current info-color"
                  aria-label="Page 46"
                  aria-current="page"
                >
                  {this.props.state.pagination.current_page}
                </a>
              </li>
              {bonton_step_forward}

              <span class="pagination-ellipsis">&hellip;</span>
              <li>
                <a
                  className="pagination-link"
                  {...disable_ultimo}
                  onClick={() =>
                    this.handlePage(this.props.state.pagination.max_pages)
                  }
                >
                  {this.props.state.pagination.max_pages}
                </a>
              </li>
            </ul>
          </nav>
        </Field>
        <hr />
      </div>
    );
  }
}
const mapStateToProps = store => {
  return { state: { ...store.dataReducer } };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: value => dispatch({ type: "HANDLE_PAGE", value })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paginator);
