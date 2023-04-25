import { Action } from "./actions";

// model do token (criada aqui porque é exclusiva para o redux)
export interface TokenState {
  token: string;
}

// inicializando o estado
const initialState = {
  token: "",
};

// função de reducer
export const tokenReducer = (
  state: TokenState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_TOKEN": {
      return { token: action.payload }
    }

    default:
      return state
  }
}
