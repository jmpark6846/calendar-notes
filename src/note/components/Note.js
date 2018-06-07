import React from 'react'
import { connect } from 'react-redux'
import {Editor, EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'draft-js/dist/Draft.css';

import { NOTE_SAVE, NOTE_DELETE } from '../../constants';
import { dateToString } from '../../utils/date';
import { htmlToDraftEditorState } from '../../utils/note';


class Note extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      isBlank: true,
    };

    this.onChange = this.onChange.bind(this)  
    this.loadContent = this.loadContent.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.isDeletedAndEmpty = this.isDeletedAndEmpty.bind(this)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(+prevProps.selectedDate !== +this.props.selectedDate){
      this.loadContent()
    }
  }

  loadContent(){
    const date = dateToString(this.props.selectedDate)
    
    if(date in this.props.notes){
      this.setState({ editorState: htmlToDraftEditorState(this.props.notes[date].content) })
    }else{
      this.setState({ editorState: EditorState.createEmpty() })
    }
  }

  onChange(editorState){
    
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({editorState});  
    
    if(!this.isEmpty(editorState)){
      this.props.save(dateToString(this.props.selectedDate), html)
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
      <Editor placeholder='오늘 하루를 적어볼까요?' editorState={this.state.editorState} onChange={this.onChange} />
    )
  }
} 

const mapStateToProps = ({calendar, notes}) => ({
  selectedDate: calendar.selectedDate,
  notes,
})

const mapDispatchToProps = (dispatch) => ({
  save: (date, content) => dispatch({ type: NOTE_SAVE, payload: { date, content } }),
  delete: (date) => dispatch({ type: NOTE_DELETE, payload: { date } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
