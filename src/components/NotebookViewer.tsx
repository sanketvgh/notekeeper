import React from 'react';
import { useNotebookService, useNotebooks, useDefaultNotebook } from '../providers/NotebooksProvider';
import NotebookCard from './NotebookCard';
import { useCurrentNotebook } from '../providers/CurrentNotebook';
import { DEFAULT_NOTEBOOKS_ID } from '../services/NotebookService';

type PropsType = {
  isOpen: boolean;
  onNotebookChange: (book: MyNotebook) => void;
  onClose: () => void;
};

export default function NotebookViewer(props: PropsType) {
  const notebooks = useNotebooks();
  const service = useNotebookService();
  const defaultAllNotebook = useDefaultNotebook('ALL');

  const [currentNotebook] = useCurrentNotebook();

  const handleOnClick = () => {
    const title = prompt('Enter new Title');
    if (title) service.createNotebook(title);
  };

  return props.isOpen ? (
    <div className="notebook-viewer-wrapper">
      <div className="notebook" onClick={handleOnClick}>
        <h4>Create New</h4>
      </div>
      {currentNotebook.id !== DEFAULT_NOTEBOOKS_ID.ALL ? (
        <div className="notebook" onClick={() => props.onNotebookChange(defaultAllNotebook)}>
          <h4>{defaultAllNotebook.title}</h4>
        </div>
      ) : null}
      {notebooks.map((book) => (
        <NotebookCard key={book.id} notebook={book} onClick={props.onNotebookChange} />
      ))}
    </div>
  ) : null;
}
