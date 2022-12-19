import React from 'react';
import { useNotebookService, useNotebooks } from '../providers/NotebooksProvider';
import { getDefaultAll } from '../services/NotebookService';

type PropsType = {
  isOpen: boolean;
  onNotebookChange: (book: Notebook) => void;
  onClose: () => void;
};

export default function NotebookViewer(props: PropsType) {
  const notebooks = useNotebooks();
  const service = useNotebookService();

  const handleOnClick = () => {
    const title = prompt('Enter new Title');
    if (title) service?.createNotebook(title);
  };

  return props.isOpen ? (
    <div className="notebook-viewer-wrapper">
      <div className="notebook" onClick={handleOnClick}>
        <h4>Create New</h4>
      </div>
      <div className="notebook">
        <h4>{getDefaultAll().title}</h4>
      </div>
      {notebooks.map((book) => (
        <div className="notebook" key={book.id} onClick={() => props.onNotebookChange(book)}>
          <h4>{book.title}</h4>
        </div>
      ))}
    </div>
  ) : null;
}
