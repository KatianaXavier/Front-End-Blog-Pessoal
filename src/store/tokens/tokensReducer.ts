import { Action } from "./actions";

// model do token (criada aqui porque é exclusiva para o redux)
export interface TokenState {
  token: string,
  id: string
}

// inicializando o estado
const initialState = {
  token: "",
  id: ""
}

// função de reducer
export const tokenReducer = (
  state: TokenState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_TOKEN": {
      return { token: action.payload, id: state.id }
    }
    case "ADD_ID": {
      return { id: action.payload, token: state.token }
    }

    default:
      return state

  }
}
