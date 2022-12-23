import React from 'react';
import s from './NotesContainer.module.sass';

export default function NotesContainer({ children }: { children: React.ReactNode }) {
  return <div className={s.container}>{children}</div>;
}
