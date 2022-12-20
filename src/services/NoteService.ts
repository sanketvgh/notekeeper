import { nanoid } from 'nanoid';
import { DEFAULT_NOTEBOOKS_ID } from './NotebookService';

export const ACTION_TYPES = {
  CREATE_NOTE: 1,
  DELETE_NOTES: 2,
  PIN_NOTES: 3,
  MOVE_NOTES_TO_OTHER_NOTEBOOK: 4,
} as const;

type NoteActionType = typeof ACTION_TYPES;
export type NoteAction = Action<NoteActionType, any>;

class NoteService {
  private dispatch: React.Dispatch<NoteAction>;
  private notes: Note[];

  constructor(notes: Note[], dispatch: React.Dispatch<NoteAction>) {
    this.notes = notes;
    this.dispatch = dispatch;
  }

  createNote(bookId: ID, title: string, content: string) {
    const payload: Note = {
      id: nanoid(),
      title,
      bookId,
      content,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      isPined: false,
    };
    this.dispatch({ type: ACTION_TYPES.CREATE_NOTE, payload: payload });
  }

  moveTo(bookId: ID, notesIds: ID[]) {
    this.dispatch({
      type: ACTION_TYPES.MOVE_NOTES_TO_OTHER_NOTEBOOK,
      payload: {
        bookId,
        notesIds,
      },
    });
  }

  makeNotesPrivate(notesIds: ID[]) {
    this.moveTo(DEFAULT_NOTEBOOKS_ID.PRIVATE, notesIds);
  }

  removeNotes(notesIds: ID[]) {
    this.moveTo(DEFAULT_NOTEBOOKS_ID.PRIVATE, notesIds);
  }

  removeNotebook(note: Note) {
    this.dispatch({ type: ACTION_TYPES.DELETE_NOTES, payload: note });
  }

  getList() {
    return this.notes;
  }
}

export default NoteService;
