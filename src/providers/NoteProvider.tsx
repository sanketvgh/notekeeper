import React from 'react';
import NoteService, { ACTION_TYPES, NoteAction } from '../services/NoteService';

const Context = React.createContext<NoteService | undefined>(undefined);

function reducer(state: Note[], action: NoteAction) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_NOTE: {
      return [...state, action.payload];
    }
    case ACTION_TYPES.DELETE_NOTES: {
      return state.filter((note) => note.id !== action.payload.id);
    }
    case ACTION_TYPES.MOVE_NOTES_TO_OTHER_NOTEBOOK: {
      const newState = state.map((note) => {
        if (action.payload.bookIds.includes(note.id)) {
          return { ...note, bookId: action.payload.bookId };
        }

        return note;
      });

      return newState;
    }
    default:
      return state;
  }
}

const initialState: Note[] = [];

function NoteProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const service = React.useMemo(() => new NoteService(state, dispatch), [state]);

  return <Context.Provider value={service}>{children}</Context.Provider>;
}

export function useNotes() {
  const service = React.useContext(Context);
  const list = React.useMemo(() => service?.getList() ?? [], [service]);

  React.useDebugValue(list);

  return list;
}

export default NoteProvider;
