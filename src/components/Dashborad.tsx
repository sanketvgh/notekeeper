import React from 'react';
import NotebookViewer from './NotebookViewer';
import useBoolean from '../hooks/useBoolean';
import { useCurrentNotebook } from '../providers/CurrentNotebook';

export default function Dashboard() {
  const [isOpen, set] = useBoolean();
  const [currentNotebook, setCurrentNotebook] = useCurrentNotebook();

  const handleOnNotebookChange = React.useCallback(
    (book: MyNotebook) => {
      setCurrentNotebook(book);
      set.false();
    },
    [setCurrentNotebook, set],
  );

  return (
    <div>
      <div className="flex justify-between item-center">
        <h1>{currentNotebook.title}</h1>
        <button type="button" onClick={set.toggle}>
          Change Notebook
        </button>
      </div>
      <NotebookViewer isOpen={isOpen} onClose={set.false} onNotebookChange={handleOnNotebookChange} />
    </div>
  );
}
