import { _getQuestions } from '../data/data'
import { _saveQuestion } from '../data/data'
import { _saveQuestionAnswer } from '../data/data'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function mapQuestionsToStore () {
    return (dispatch) => {
      dispatch(showLoading())
      return _getQuestions()
        .then(function(questions){dispatch(receiveQuestions(questions))})
        .then(() => dispatch(hideLoading()))
    }
  }

function addQuestion(question){
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion ({author, optionOneText, optionTwoText}) {
  return (dispatch) => {
    dispatch(showLoading())
    return _saveQuestion({
      author,
      optionOneText,
      optionTwoText
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

function saveAnswer(answer){
  return{
    type: SAVE_ANSWER,
    answer
  }
}

export function handleSaveAnswer ({authedUser, qid, answer}) {
  return (dispatch) => {
    dispatch(showLoading())
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then((answer) => dispatch(saveAnswer(answer)))
      .then(() => dispatch(hideLoading()))
  }
}