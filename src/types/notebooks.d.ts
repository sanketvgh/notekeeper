interface Notebook {
  id: ID;
  createdAt: TimeStamp;
  title: string;
}

interface DefaultNotebook extends Notebook {
  createdAt?: TimeStamp;
}

type MyNotebook = Notebook | DefaultNotebook;
