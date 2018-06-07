import {EditorState, ContentState} from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const htmlToDraftEditorState = (html) => {
  const rawContent = htmlToDraft(html)
  const { contentBlocks, entityMap } = rawContent
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(contentState)
}