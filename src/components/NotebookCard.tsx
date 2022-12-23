import React from 'react';

type PropsType = {
  notebook: MyNotebook;
  onClick: (notebook: MyNotebook) => void;
  className: string;
};

export default function NotebookCard(props: PropsType) {
  const notebook = props.notebook;

  const handleOnClick = React.useCallback(() => {
    props.onClick(notebook);
  }, [notebook, props]);

  return (
    <div onClick={handleOnClick} className={props.className}>
      <h4>{notebook.title}</h4>
    </div>
  );
}
