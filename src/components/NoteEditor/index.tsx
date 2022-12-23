import React from 'react';
import NotesContainer from '../NotesContainer';
import NoteBottomActions from '../NoteBottomActions';
import Action from '../Action';

import { useNoteService } from '../../providers/NoteProvider';
import { useCurrentNotebook } from '../../providers/CurrentNotebook';
import s from './NoteEditor.module.sass';

type PropsType = {
  onClose: () => void;
  noteUpdateId?: ID;
};

export default function NoteEditor({ onClose }: PropsType) {
  const id = React.useId();
  const service = useNoteService();
  const [currentNotebook] = useCurrentNotebook();

  const titleId = `title_${id}`;
  const contentId = `content_${id}`;

  const handleSubmit = React.useCallback(
    (e: any) => {
      e.preventDefault();
      const title = e.target.elements[titleId].value?.trim() || '';
      const content = e.target.elements[contentId].value?.trim() || '';
      service.createNote(currentNotebook.id, title, content);
      onClose();
    },
    [contentId, currentNotebook.id, onClose, service, titleId],
  );

  return (
    <NotesContainer>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.wrapper}>
          <label htmlFor={titleId}>Title</label>
          <input type="text" name={titleId} id={titleId} />

          <label htmlFor={contentId}>Content</label>
          <textarea name={contentId} id={contentId}></textarea>
        </div>
        <NoteBottomActions>
          <Action onTap={onClose}>Back</Action>
          <Action type="submit">Save</Action>
          <Action type="reset">Clear</Action>
        </NoteBottomActions>
      </form>
    </NotesContainer>
  );
}
