import React from 'react';
import NotebookViewer from './NotebookViewer';
import { DEFAULT_NOTEBOOKS_ID } from '../services/NotebookService';
import { useDefaultNotebook, useNotebookService } from '../providers/NotebooksProvider';

const Context = React.createContext('');

export default function Dashboard() {
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const toggle = React.useCallback(() => setIsViewerOpen((p) => !p), []);

  const all = useDefaultNotebook('ALL');
  const [currentNotebook, setCurrentNotebook] = React.useState<MyNotebook>(all);

  const handleOnNotebookChange = React.useCallback(
    (book: MyNotebook) => {
      setCurrentNotebook(book.id);
      toggle();
    },
    [toggle],
  );

  return (
    <div>
      <div className="flex justify-between item-center">
        <h1>{currentNotebook.title}</h1>
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
