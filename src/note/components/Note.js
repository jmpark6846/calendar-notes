import React from 'react'
import { connect } from 'react-redux'
import {Editor, EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { NOTE_SAVE } from '../../constants';
import { dateToString } from '../../utils/date';
import { htmlToDraftEditorState } from '../../utils/note';

class Note extends React.Component{
  constructor(props){
    super(props)
    this.state = {editorState: EditorState.createEmpty()};

    this.onChange = this.onChange.bind(this)  
    this.loadContent = this.loadContent.bind(this)
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
    this.props.save(dateToString(this.props.selectedDate), html)
    this.setState({editorState});
  }

  render(){
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    )
  }
} 

const mapStateToProps = ({calendar, notes}) => ({
  selectedDate: calendar.selectedDate,
  notes,
})

const mapDispatchToProps = (dispatch) => ({
  save: (date, content) => dispatch({ type: NOTE_SAVE, payload: {date, content} }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
