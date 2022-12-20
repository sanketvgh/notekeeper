import React from 'react';
import { useNotebookService, useNotebooks, useDefaultNotebook } from '../providers/NotebooksProvider';

type PropsType = {
  isOpen: boolean;
  onNotebookChange: (book: MyNotebook) => void;
  onClose: () => void;
};

export default function NotebookViewer(props: PropsType) {
  const notebooks = useNotebooks();
  const service = useNotebookService();
  const all = useDefaultNotebook('ALL');

  const handleOnClick = () => {
    const title = prompt('Enter new Title');
    if (title) service.createNotebook(title);
  };

  return props.isOpen ? (
    <div className="notebook-viewer-wrapper">
      <div className="notebook" onClick={handleOnClick}>
        <h4>Create New</h4>
      </div>
      <div className="notebook">
        <h4>{all?.title}</h4>
      </div>
      {notebooks.map((book) => (
        <div className="notebook" key={book.id} onClick={() => props.onNotebookChange(book)}>
          <h4>{book.title}</h4>
        </div>
      ))}
    </div>
  ) : null;
}
