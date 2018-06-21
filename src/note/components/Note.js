import React from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { Editor, EditorState, convertToRaw, RichUtils, getDefaultKeyBinding } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import _ from 'lodash'
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

import { dateToString } from '../../utils/date';
import { htmlToDraftEditorState } from '../../utils/note';
import { doNoteSave, doNoteDelete, doNoteSet } from '../actions';
import './Note.css'
import { PLACEHOLDER_TEXT, MAX_LIST_DEPTH } from '../../constants';


class Note extends React.Component{
  static propTypes = {
    selectedDate: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    saving: PropTypes.bool,
    error: PropTypes.bool,
    updated: PropTypes.bool.isRequired,
    notes: PropTypes.object,
    save: PropTypes.func,
    delete: PropTypes.func,
    fetch: PropTypes.func,
    setNote: PropTypes.func,
  }

  constructor(props){
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this)  
    this.process = _.debounce(this.process.bind(this), 1000)
    this.loadContent = this.loadContent.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.hasChanged = this.hasChanged.bind(this)

    this.focus = () => this.refs.editor.focus();
    this.onTab = this.onTab.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

  }

  componentDidMount = () => {
    this.loadContent(this.props.selectedDate)
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if(+prevProps.selectedDate !== +this.props.selectedDate){
      this.loadContent(this.props.selectedDate)
    }

    if(!prevProps.updated && this.props.updated){
      this.loadContent(this.props.selectedDate)
      this.props.setUpdated()
    }
  }

  loadContent(selectedDate){
    const date = dateToString(selectedDate)
    
    if(date in this.props.notes){
      this.setState({ editorState: htmlToDraftEditorState(this.props.notes[date].content) })
    }else{
      this.setState({ editorState: EditorState.createEmpty() })
    }
  }

  onChange(editorState){
    this.setState({editorState});  

    if(this.hasChanged(editorState)){
      this.process(editorState)
    }
  }

  hasChanged(editorState){
    return editorState.getCurrentContent().getPlainText() !== this.state.editorState.getCurrentContent().getPlainText() ? true : false
  }

  process(editorState){
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const date = dateToString(this.props.selectedDate)
    const method = (date in this.props.notes) ? 'PUT' : 'POST' 

    if(!this.isEmpty(editorState)){
      this.props.save(date, html, method)
    }else{
      this.props.delete(dateToString(this.props.selectedDate))
    }
  }

  isEmpty(editorState){
    return editorState.getCurrentContent().getPlainText() === ''
  }
  
  onTab(e){
  	this.onChange(RichUtils.onTab(e, this.state.editorState, MAX_LIST_DEPTH));
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        MAX_LIST_DEPTH, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render(){
    const {editorState} = this.state;
    let className = 'RichEditor-editor';

    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className='note'>
        <div className="RichEditor-control-panel pl-2 pr-2 pt-2 pb-2 mb-1 bg-white sticky-top">
	        <BlockStyleControls
	          editorState={editorState}
	          onToggle={this.toggleBlockType}
	        />
	        <InlineStyleControls
	          editorState={editorState}
	          onToggle={this.toggleInlineStyle}
        	/>
        </div>
        <div className={className} onClick={this.focus}>
          <Editor 
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder={PLACEHOLDER_TEXT}
            ref="editor"
            spellCheck={true}
            />
          </div>
        { this.props.loading && <div>loading...</div>}
        { this.props.saving && <div>saving...</div>}
      </div>
    )
  }
} 

const mapStateToProps = ({calendar, notes}) => ({
  selectedDate: calendar.selectedDate,
  ...notes  
})

const mapDispatchToProps = (dispatch) => ({
  save: (date, content, method) => dispatch(doNoteSave(date, content, method)),
  delete: (date) => dispatch(doNoteDelete(date)),
  setUpdated: () => dispatch(doNoteSet())
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
  