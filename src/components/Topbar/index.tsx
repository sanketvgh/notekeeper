import React from 'react';

import s from './Topbar.module.sass';

export default function TopBar({ children }: { children: React.ReactNode }) {
  return <div className={s.container}>{children}</div>;
}
