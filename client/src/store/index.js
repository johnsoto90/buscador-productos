import { combineReducers } from "redux";

let initialState = {
  content: "",
  query: "test",
  last_query: "",
  fetching_info: "",
  settings: {
    stores: [
      { name: "yapo", is_active: true },
      { name: "mercadolibre", is_active: true },
      { name: "pcfactory", is_active: true },
      { name: "spdigital", is_active: false }
    ]
  },
  order_by: "",
  pagination: {
    mostrar: [0, 8],
    current_page: 1,
    items_per_page: 8,
    max_pages: 10
  },

  productos: [],
  favoritos: []
};

const dataReducer = (state = initialState, action) => {

  if(action.type === "CLEAN"){
    return {
      ...state,
      productos: [], 
      content: "productos",
      fetching_info: "",
      pagination: {
        ...state.pagination,
        current_page: 1,
        mostrar: [0, state.pagination.items_per_page]
      } 
    }
  }
  if(action.type === "ORDER_BY"){
    return {...state, order_by: action.value}
  }
  if (action.type === "UPDATE_QUERY") {
    return { ...state, query: action.value };
  }
  if (action.type === "ITEMS_PER_PAGE") {
    return {
      ...state,
      pagination: { ...state.pagination, items_per_page: action.value }
    };
  }
  if (action.type === "UPDATE_PRODUCTOS") {
    let bundle_products = [...action.productos];
    return {
      ...state,
      last_query: state.query,
      productos: bundle_products,
      pagination: {
        ...state.pagination,
        current_page: 1,
        max_pages: Math.ceil(
          bundle_products.length / state.pagination.items_per_page
        )
      }
    };
  }
  if (action.type === "AGREAGAR_FAVORITO") {
    return { ...state, favoritos: [...action.value] };
  }
  if (action.type === "BORRAR_FAVORITO") {
    let new_favs = state.favoritos.filter(
      item => item.link != action.value.link
    );
    return { ...state, favoritos: new_favs };
  }
  if (action.type === "HANDLE_PAGE") {
    let items = state.pagination.items_per_page;

    let to_show =
      action.value === 1
        ? [0, items]
        : [items * (action.value - 1), items * (action.value - 1) + items];
    let settings = {
      ...state.pagination,
      current_page: action.value,
      mostrar: to_show,
      max_pages: Math.ceil(
        state.productos.length / state.pagination.items_per_page
      )
    };
    return { ...state, pagination: settings };
  }
  if (action.type === "CHANGE_CONTENT") {
    return { ...state, content: action.value };
  }
  if (action.type === "FETCHING_INFO") {
    return { ...state, fetching_info: action.value };
  }
  return { ...state };
};


const rootReducer = combineReducers({
  dataReducer
});

export default rootReducer;
