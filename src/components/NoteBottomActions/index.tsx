import React from 'react';
import s from './NoteBottomActions.module.sass';

type PropsType = {
  children: React.ReactNode;
};

export default function NoteBottomActions({ children }: PropsType) {
  return <div className={s.container}>{children}</div>;
}
