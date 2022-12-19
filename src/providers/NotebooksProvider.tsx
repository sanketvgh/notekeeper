import React from 'react';
import NotebookService, { NotebookAction, ACTION_TYPES } from '../services/NotebookService';

const Context = React.createContext<NotebookService | undefined>(undefined);

function reducer(state: Notebook[], action: NotebookAction) {
  switch (action.type) {
    case ACTION_TYPES.ADD_BOOK: {
      return [...state, action.payload];
    }
    case ACTION_TYPES.REMOVE_NOTEBOOK: {
      const notebooks = state.filter((book) => book.id !== action.payload.id);

      return notebooks;
    }
    default:
      return state;
  }
}

const initialState: Notebook[] = [];

function NotebooksProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const service = React.useMemo(() => new NotebookService(state, dispatch), [state]);

  return <Context.Provider value={service}>{children}</Context.Provider>;
}

export function useNotebooks() {
  const service = React.useContext(Context);
  const list = React.useMemo(() => service?.getList() ?? [], [service]);

  React.useDebugValue(list);

  return list;
}

export function useNotebookService() {
  const service = React.useContext(Context);

  React.useDebugValue(service);

  return service;
}

export default NotebooksProvider;
