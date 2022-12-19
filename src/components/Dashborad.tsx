import React from 'react';
import NotebookViewer from './NotebookViewer';
import { NOTE_BOOK_ID, getDefaultAll } from '../services/NotebookService';
import { useNotebookService } from '../providers/NotebooksProvider';

const Context = React.createContext(NOTE_BOOK_ID.ALL as string);

export default function Dashboard() {
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  const toggle = React.useCallback(() => setIsViewerOpen((p) => !p), []);
  const [currentNotebook, setCurrentNotebook] = React.useState(NOTE_BOOK_ID.ALL as string);

  const handleOnNotebookChange = React.useCallback(
    (book: Notebook) => {
      setCurrentNotebook(book.id);
      toggle();
    },
    [toggle],
  );

  const service = useNotebookService();

  const selected = service?.find(currentNotebook) ?? getDefaultAll();

  return (
    <div>
      <div className="flex justify-between item-center">
        <h1>{selected?.title}</h1>
        <button type="button" onClick={toggle}>
          Change Notebook
        </button>
      </div>
      <Context.Provider value={currentNotebook}>
        <NotebookViewer isOpen={isViewerOpen} onClose={toggle} onNotebookChange={handleOnNotebookChange} />
      </Context.Provider>
    </div>
  );
}
