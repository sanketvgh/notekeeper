import React from 'react';
import { useDefaultNotebook } from './NotebooksProvider';

const Context = React.createContext<any>(null);

export default function CurrentNotebook({ children }: { children: React.ReactNode }) {
  const defaultAllNotebook = useDefaultNotebook('ALL');
  const value = React.useState<MyNotebook>(defaultAllNotebook);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCurrentNotebook() {
  return React.useContext(Context) as [MyNotebook, React.Dispatch<React.SetStateAction<MyNotebook>>];
}
