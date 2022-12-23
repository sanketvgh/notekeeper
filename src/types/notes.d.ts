interface Note {
  id: ID;
  bookId: ID;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  title: string;
  content: string;
  isPined: boolean;
}

interface FormattedNote extends Note {
  _original: Note;
  createdAt: string;
  updatedAt: string;
  lessContent: string;
}
