import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {Editor, EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { doNoteSave } from '../actions';
import { NOTE_SAVE } from '../../constants';

class Note extends React.Component{
  constructor(props){
    super(props)
    this.state = {editorState: EditorState.createEmpty()};

    this.onChange = this.onChange.bind(this)  
  }

  onChange(editorState){
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const date = moment(this.props.selectedDate).format('YYYY-MM-DD')
    console.log(this.props.selectedDate)
    this.props.save(date, html)
    this.setState({editorState});

  }

  render(){
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    )
  }
} 

const mapStateToProps = ({calendar}) => ({
  selectedDate: calendar.selectedDate,
})

const mapDispatchToProps = (dispatch) => ({
  save: (date, content) => dispatch({ type: NOTE_SAVE, payload: {date, content} }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
