import React from 'react';
import { useNotebookService, useNotebooks, useDefaultNotebook } from '../../providers/NotebooksProvider';
import { useCurrentNotebook } from '../../providers/CurrentNotebook';
import { DEFAULT_NOTEBOOKS_ID } from '../../services/NotebookService';
import NotebookCard from '../NotebookCard';
import s from './NotebookViewer.module.sass';

type PropsType = {
  isOpen: boolean;
  onNotebookChange: (book: MyNotebook) => void;
  onClose: () => void;
};

export default function NotebookViewer(props: PropsType) {
  const notebooks = useNotebooks();
  const service = useNotebookService();
  const defaultAllNotebook = useDefaultNotebook('ALL');
  const defaultRecentlyDeletedNotebook = useDefaultNotebook('RECENTLY_DELETED');
  const defaultPrivateNotebook = useDefaultNotebook('PRIVATE');
  const idRef = React.useRef<ID>();

  const [currentNotebook, setCurrentNotebook] = useCurrentNotebook();

  React.useEffect(() => {
    if (idRef.current) {
      const lastNotebook = service.findNotebookById(idRef.current);
      lastNotebook && setCurrentNotebook(lastNotebook);
    }
  }, [service, setCurrentNotebook]);

  const handleOnClick = () => {
    const title = prompt('Enter new Title');
    if (title) {
      idRef.current = service.createNotebook(title);
    }
  };

  return props.isOpen ? (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div>
          <h3 className={s.title}>Notebooks</h3>
        </div>
        <div className={s.notebooks}>
          <div className={s.notebook} onClick={handleOnClick}>
            <h4>Create New</h4>
          </div>
          <NotebookCard
            notebook={defaultAllNotebook}
            onClick={props.onNotebookChange}
            className={`${s.notebook} ${currentNotebook.id === DEFAULT_NOTEBOOKS_ID.ALL ? s.selected : ''}`}
          />
          <NotebookCard
            notebook={defaultPrivateNotebook}
            onClick={props.onNotebookChange}
            className={`${s.notebook} ${currentNotebook.id === DEFAULT_NOTEBOOKS_ID.PRIVATE ? s.selected : ''}`}
          />
          <NotebookCard
            notebook={defaultRecentlyDeletedNotebook}
            onClick={props.onNotebookChange}
            className={`${s.notebook} ${
              currentNotebook.id === DEFAULT_NOTEBOOKS_ID.RECENTLY_DELETED ? s.selected : ''
            }`}
          />
          {notebooks.map((book) => (
            <NotebookCard
              key={book.id}
              notebook={book}
              onClick={props.onNotebookChange}
              className={`${s.notebook} ${book.id === currentNotebook.id ? s.selected : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
