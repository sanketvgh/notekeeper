import React from 'react';
import { DEFAULT_NOTEBOOKS_ID } from '../services/NotebookService';

const Context = React.createContext(DEFAULT_NOTEBOOKS_ID.ALL as ID);

export default function WorkingNotebookProvider() {
  const [workingNotebookId, setWorkingNotebookId] = React.useState();

  return <Context.Provider value={workingNotebookId}></Context.Provider>;
}
