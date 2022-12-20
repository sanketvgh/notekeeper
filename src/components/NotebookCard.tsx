import React from 'react';

type PropsType = {
  notebook: MyNotebook;
  onClick: (notebook: MyNotebook) => void;
};

export default function NotebookCard(props: PropsType) {
  const notebook = props.notebook;

  const handleOnClick = React.useCallback(() => {
    props.onClick(notebook);
  }, [notebook, props]);

  return (
    <div className="notebook" onClick={handleOnClick}>
      <h4>{notebook.title}</h4>
    </div>
  );
}
