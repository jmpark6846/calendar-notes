import React from 'react'
import { connect } from 'react-redux'
import {Editor, EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'draft-js/dist/Draft.css';

import { NOTE_SAVE, NOTE_DELETE } from '../../constants';
import { dateToString } from '../../utils/date';
import { htmlToDraftEditorState } from '../../utils/note';
import { doNoteSave, doNoteDelete, doNoteSaveOnServer, doNoteFetch } from '../actions';


class Note extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      updated:false,
    };

    this.onChange = this.onChange.bind(this)  
    this.loadContent = this.loadContent.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.isDeletedAndEmpty = this.isDeletedAndEmpty.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState){
    const date = dateToString(nextProps.selectedDate)

    if(date in nextProps.notes){
      return { editorState: htmlToDraftEditorState(nextProps.notes[date].content) }
    }
    else{
      return { editorState: EditorState.createEmpty() }
    } 

    return null
  }

  componentDidMount = () => {
    this.loadContent(this.props.selectedDate)
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if(+prevProps.selectedDate !== +this.props.selectedDate){
      this.loadContent(this.props.selectedDate)
    }
  }

  loadContent(selectedDate){
    const date = dateToString(selectedDate)
    
    if(date in this.props.notes){
      this.setState({ editorState: htmlToDraftEditorState(this.props.notes[date].content) })
    }else{
      this.props.fetch(this.props.selectedDate)  
    }
  }

  onChange(editorState){
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({editorState});  
    
    if(!this.isEmpty(editorState)){
      this.props.save(dateToString(this.props.selectedDate), html)
      this.props.saveNoteOnServer(dateToString(this.props.selectedDate), html)
    }
  
    if(this.isDeletedAndEmpty(editorState)){
      this.props.delete(dateToString(this.props.selectedDate))
    }
  }

  isEmpty(editorState){
    return editorState.getCurrentContent().getPlainText() === ''
  }
  
  isDeletedAndEmpty(editorState){
    return this.isEmpty(editorState) && !this.isEmpty(this.state.editorState)
  }

  render(){
    return (
      <div>
        <Editor placeholder='오늘 하루를 적어볼까요?' editorState={this.state.editorState} onChange={this.onChange} />
        { this.props.loading && <div>loading..</div>}
      </div>
      
    )
  }
} 

const mapStateToProps = ({calendar, notes}) => ({
  selectedDate: calendar.selectedDate,
  ...notes  
})

const mapDispatchToProps = (dispatch) => ({
  save: (date, content) => dispatch(doNoteSave(date, content)),
  saveNoteOnServer : (date, content) => dispatch(doNoteSaveOnServer(date, content)),
  delete: (date) => dispatch(doNoteDelete(date)),
  fetch: (date) => dispatch(doNoteFetch(date)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
