import React from 'react';

import useBoolean from '../hooks/useBoolean';
import { useCurrentNotebook } from '../providers/CurrentNotebook';

import TopBar from './Topbar';
import Action from './Action';

import NoteEditor from './NoteEditor';
import NotebookViewer from './NotebooksViewer/NotebookViewer';
import NotesViewer from './NotesViewer';
import { useDefaultNotebook } from '../providers/NotebooksProvider';

type ApplicationState = 'EDITING' | 'VIEWING_NOTES';

export default function Dashboard() {
  const [currentNotebook, setCurrentNotebook] = useCurrentNotebook();
  const defaultPrivateNotebook = useDefaultNotebook('PRIVATE');

  const [state, setState] = React.useState<ApplicationState>('VIEWING_NOTES');
  const [noteIds, setNoteIds] = React.useState<ID[]>([]);

  const [isOpen, setIsOpen] = useBoolean();

  const setStateViewNotes = React.useCallback(() => {
    setState('VIEWING_NOTES');
  }, []);

  const setStateEditing = React.useCallback(() => {
    setState('EDITING');
  }, []);

  const handleOnNotebookChange = React.useCallback(
    (book: MyNotebook) => {
      if (book.id === defaultPrivateNotebook.id) {
        const password = prompt('Enter a password');
        if (password !== '123') return;
      }
      setCurrentNotebook(book);
      setState('VIEWING_NOTES');
      setIsOpen.false();
    },
    [defaultPrivateNotebook.id, setCurrentNotebook, setIsOpen],
  );

  const handleOnUpdate = React.useCallback((id: ID) => {
    setNoteIds([id]);
    setState('EDITING');
  }, []);

  const handleOnMoveRequest = React.useCallback(() => {
    setIsOpen.true();
  }, [setIsOpen]);

  return (
    <React.Fragment>
      <TopBar>
        <h1>{currentNotebook.title}</h1>
        {state !== 'EDITING' && <Action onTap={setIsOpen.true}>Change Notebook</Action>}
      </TopBar>
      {state === 'EDITING' && <NoteEditor onClose={setStateViewNotes} noteUpdateId={noteIds[0]} />}
      {state === 'VIEWING_NOTES' && (
        <NotesViewer onCreate={setStateEditing} onUpdate={handleOnUpdate} onMoveRequest={handleOnMoveRequest} />
      )}
      {isOpen && <NotebookViewer isOpen={isOpen} onClose={setIsOpen.false} onNotebookChange={handleOnNotebookChange} />}
    </React.Fragment>
  );
}
