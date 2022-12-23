import React from 'react';
import s from './Action.module.sass';

type PropsType = {
  type?: 'submit' | 'button' | 'reset';
  variant?: 'danger';
  onTap?: () => void;
  children: React.ReactNode;
};

export default function Action({ onTap, children, type = 'button', variant }: PropsType) {
  return (
    <button type={type} className={`${s.action} ${s[variant as string]}`} onClick={onTap}>
      {children}
    </button>
  );
}
