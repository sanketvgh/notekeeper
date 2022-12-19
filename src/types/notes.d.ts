interface Note {
  id: ID;
  bookId: ID;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  title: string;
  content: string;
  isPined: boolean;
}
