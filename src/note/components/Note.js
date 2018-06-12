import React from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import {Editor, EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import _ from 'lodash'
import { dateToString } from '../../utils/date';
import { htmlToDraftEditorState } from '../../utils/note';
import { doNoteSave, doNoteDelete, doNoteSaveOnServer, doNoteFetch, doNoteSet } from '../actions';
import './Note.css'

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
    this.loadContent = this.loadContent.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.isDeletedAndEmpty = this.isDeletedAndEmpty.bind(this)
  }

  componentDidMount = () => {
    this.loadContent(this.props.selectedDate)
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if(+prevProps.selectedDate !== +this.props.selectedDate){
      this.loadContent(this.props.selectedDate)
    }

    if(this.props.updated){
      this.loadContent(this.props.selectedDate)
      this.props.setNote()
    }
  }

  loadContent(selectedDate){
    const date = dateToString(selectedDate)
    
    if(date in this.props.notes){
      this.setState({ editorState: htmlToDraftEditorState(this.props.notes[date].content) })
    }else{
      this.setState({ editorState: EditorState.createEmpty() })
      this.props.fetch(dateToString(this.props.selectedDate)) 
    }
  }

  onChange(editorState){
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const date = dateToString(this.props.selectedDate)
    const method = (date in this.props.notes) ? 'update' : 'post'

    this.setState({editorState});  

    if(!this.isEmpty(editorState)){
      this.props.save(date, html, method)
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
      <div className='note'>
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
  save: _.debounce((date, content, method) => dispatch(doNoteSave(date, content, method)), 1000),
  delete: (date) => dispatch(doNoteDelete(date)),
  fetch: (date) => dispatch(doNoteFetch(date)),
  setNote: () => dispatch(doNoteSet()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Note)
  