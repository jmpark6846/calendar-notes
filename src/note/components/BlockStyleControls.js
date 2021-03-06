import React from 'react'
import StyleButton from './StyleButton';

const BLOCK_TYPES = [
  {label: 'heading', style: 'header-five'},
  {label: 'list-ul', style: 'unordered-list-item'},
  {label: 'list-ol', style: 'ordered-list-item'},
  // {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BlockStyleControls