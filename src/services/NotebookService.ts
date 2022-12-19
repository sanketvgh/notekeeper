import { nanoid } from 'nanoid';

export const NOTE_BOOK_ID = {
  ALL: '1',
  PRIVATE: '2',
  RECENTLY_DELETED: '3',
} as const;

const defaultNotebooks: DefaultNotebook[] = [
  { id: NOTE_BOOK_ID.ALL, title: 'All Notes' },
  { id: NOTE_BOOK_ID.PRIVATE, title: 'Private Notes' },
  { id: NOTE_BOOK_ID.RECENTLY_DELETED, title: 'Recently Deleted' },
];

export function getDefaultAll() {
  return defaultNotebooks[0];
}

export function getDefaultPrivate() {
  return defaultNotebooks[1];
}

export function getDefaultRecentlyDeleted() {
  return defaultNotebooks[2];
}

export const ACTION_TYPES = {
  ADD_BOOK: 1,
  REMOVE_NOTEBOOK: 2,
} as const;

type NotebookActionType = typeof ACTION_TYPES;
export type NotebookAction = Action<NotebookActionType, Notebook>;

class NotebookService {
  private dispatch: React.Dispatch<NotebookAction>;
  private notebooks: Notebook[];

  constructor(notebooks: Notebook[], dispatch: React.Dispatch<NotebookAction>) {
    this.notebooks = notebooks;
    this.dispatch = dispatch;
  }

  createNotebook(title: string) {
    const payload: Notebook = {
      title,
      id: nanoid(),
      createdAt: new Date().getTime(),
    };
    this.dispatch({ type: ACTION_TYPES.ADD_BOOK, payload });
  }

  removeNotebook(notebook: Notebook) {
    this.dispatch({ type: ACTION_TYPES.REMOVE_NOTEBOOK, payload: notebook });
  }

  find(currentNotebook: ID) {
    return this.notebooks.find((book) => book.id === currentNotebook);
  }

  getList() {
    return this.notebooks;
  }
}

export default NotebookService;
