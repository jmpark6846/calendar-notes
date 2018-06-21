import React from 'react'
import StyleButton from './StyleButton';

var INLINE_STYLES = [
  {label: 'bold', style: 'BOLD'},
  {label: 'italic', style: 'ITALIC'},
  {label: 'underline', style: 'UNDERLINE'},
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default InlineStyleControls