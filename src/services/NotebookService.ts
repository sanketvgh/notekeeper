import { nanoid } from 'nanoid';

export const DEFAULT_NOTEBOOKS_ID = {
  ALL: '1',
  PRIVATE: '2',
  RECENTLY_DELETED: '3',
} as const;

export const DEFAULT_NOTEBOOKS: DefaultNotebook[] = [
  { id: DEFAULT_NOTEBOOKS_ID.ALL, title: 'All Notes' },
  { id: DEFAULT_NOTEBOOKS_ID.PRIVATE, title: 'Private Notes' },
  { id: DEFAULT_NOTEBOOKS_ID.RECENTLY_DELETED, title: 'Recently Deleted' },
];

export type DefaultNotebookType = keyof typeof DEFAULT_NOTEBOOKS_ID;

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
