import React, { Children } from 'react';
import NotesContainer from '../NotesContainer';
import NoteBottomActions from '../NoteBottomActions';
import Action from '../Action';

import { useNoteService, useNotes } from '../../providers/NoteProvider';
import { useCurrentNotebook } from '../../providers/CurrentNotebook';
import { useDefaultNotebook } from '../../providers/NotebooksProvider';

import s from './NotesViewer.module.sass';

type PropsType = {
  onCreate: () => void;
  onUpdate: (id: ID) => void;
  onMoveRequest: () => void;
};

export default function NotesViewer({ onCreate, onUpdate, onMoveRequest }: PropsType) {
  const [currentNotebook] = useCurrentNotebook();
  const c = currentNotebook.id;

  const defaultPrivateNotebook = useDefaultNotebook('PRIVATE');
  const defaultRecentlyDeletedNotebook = useDefaultNotebook('RECENTLY_DELETED');

  const notes = useNotes(currentNotebook.id);
  const service = useNoteService();

  const [checked, setChecked] = React.useState<ID[]>([]);
  const movingRequestStarted = React.useRef(false);

  const handleOnChange = React.useCallback((id: ID) => {
    setChecked((_checked) => {
      const copy = [..._checked];
      const index = copy.indexOf(id);
      if (index > -1) {
        copy.splice(index, 1);

        return copy;
      }

      return copy.concat(id);
    });
  }, []);

  React.useEffect(() => {
    if (movingRequestStarted.current) {
      service.updateNotesBookId(currentNotebook.id, checked);
      movingRequestStarted.current = false;
      setChecked([]);
    }
  }, [checked, currentNotebook, service]);

  const handleOnUpdate = React.useCallback(() => {
    onUpdate(checked[0]);
  }, [checked, onUpdate]);

  const handleMoveTo = React.useCallback(() => {
    movingRequestStarted.current = true;
    onMoveRequest();
  }, [onMoveRequest]);

  const handleMakePrivate = React.useCallback(() => {
    service.makeNotesPrivate(checked);
    setChecked([]);
  }, [checked, service]);

  const handleRemove = React.useCallback(() => {
    service.softRemoveNotes(checked);
    setChecked([]);
  }, [checked, service]);

  const handleDelete = React.useCallback(() => {
    const sure = confirm('Are you sure?');
    if (sure) {
      service.hardRemoveNote(checked[0]);
      setChecked([]);
    }
  }, [checked, service]);

  const isOneNoteSelected = checked.length === 1;

  const isMoreNoteSelected = checked.length > 0;

  const isDefaultNotebook = [defaultRecentlyDeletedNotebook.id, defaultPrivateNotebook.id].includes(c);

  const actions = (
    <>
      {!isDefaultNotebook && !isMoreNoteSelected && <Action onTap={onCreate}>Create New Note</Action>}
      {isOneNoteSelected && !isDefaultNotebook && <Action onTap={handleOnUpdate}>Edit Note</Action>}
      {isMoreNoteSelected && (
        <React.Fragment>
          {c !== defaultRecentlyDeletedNotebook.id && <Action onTap={handleMoveTo}>Move to Another Notebook</Action>}
          {c !== defaultPrivateNotebook.id && <Action onTap={handleMakePrivate}>Make Private</Action>}
          {c === defaultRecentlyDeletedNotebook.id ? (
            <Action onTap={handleDelete} variant="danger">
              Delete
            </Action>
          ) : (
            <Action onTap={handleRemove} variant="danger">
              Remove Note
            </Action>
          )}
        </React.Fragment>
      )}
    </>
  );

  return (
    <NotesContainer>
      <div className={s.wrapper}>
        {notes.map((note) => (
          <div
            className={`${s.card} ${checked.includes(note.id) ? s.selected : ''}`}
            key={note.id}
            onClick={() => handleOnChange(note.id)}
          >
            <div>
              <h3>{note.title}</h3>
              <p>{note.lessContent}</p>
            </div>
            <div className={s.meta}>
              <p>Created: {note.createdAt}</p>
              <p>Last Updated: {note.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
      {Children.count(actions) && <NoteBottomActions>{actions}</NoteBottomActions>}
    </NotesContainer>
  );
}
