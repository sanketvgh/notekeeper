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
  private readonly dispatch: React.Dispatch<NoteAction>;
  private readonly notes: Note[];

  constructor(notes: Note[], dispatch: React.Dispatch<NoteAction>) {
    this.notes = notes;
    this.dispatch = dispatch;
  }

  protected createNote(bookId: ID, title: string, content: string) {
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

  protected updateNotesBookId(bookId: ID, notesIds: ID[]) {
    this.dispatch({
      type: ACTION_TYPES.MOVE_NOTES_TO_OTHER_NOTEBOOK,
      payload: {
        bookId,
        notesIds,
      },
    });
  }

  protected makeNotesPrivate(notesIds: ID[]) {
    this.updateNotesBookId(DEFAULT_NOTEBOOKS_ID.PRIVATE, notesIds);
  }

  protected softRemoveNotes(notesIds: ID[]) {
    this.updateNotesBookId(DEFAULT_NOTEBOOKS_ID.RECENTLY_DELETED, notesIds);
  }

  protected hardRemoveNote(noteId: ID) {
    this.dispatch({ type: ACTION_TYPES.DELETE_NOTES, payload: noteId });
  }

  protected formatNote(note: Note): FormattedNote {
    return {
      _original: note,
      ...note,
      createdAt: new Date(note.createdAt).toDateString(),
      updatedAt: new Date(note.updatedAt).toDateString(),
      lessContent: note.content.substring(0, 40) + '...',
    };
  }

  protected formatNotes(notes: Note[]) {
    return notes.map((note) => this.formatNote(note));
  }

  protected getNotes(bookId: ID) {
    return this.formatNotes(this.notes.filter((note) => note.bookId === bookId));
  }
}

export default NoteService;
