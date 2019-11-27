import React, { Component } from 'react'
import { Nav, Card, Row, Col, Button, Input } from 'react-bootstrap';
import { connect } from 'react-redux'
import { _saveQuestion } from '../data/data'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router';

class Add extends Component {

    Add = (e) => {

        //e.preventDefault()

        const question = {
            author: this.props.authedUser,
            optionOneText: document.getElementById("optionOne").value,
            optionTwoText: document.getElementById("optionTwo").value
        }

        if(question.optionOneText == "" || question.optionTwoText == ""){
            alert("Both options must be filled")
            return false
        }

        const { dispatch } = this.props

        dispatch(handleAddQuestion(question))
        this.props.history.push('/');
    }

    render(){
        return(
            this.props.authedUser === null ? <Redirect to={{pathname: '/signin', state: { from: 'add' }}}></Redirect>
            :
            <div>
                <Card>
                    <div>
                        <h3>Create New Question</h3>
                    </div>
                    <div>
                        <h5>Complete the question</h5>
                    </div>
                    <div>
                        <h6>Would you rather...</h6>
                    </div>
                    <div className="textCenter">
                        <input className="w90" type="text" id="optionOne"></input>
                    </div>
                    <div className="textCenter">
                        <p>Or</p>
                    </div>
                    <div className="textCenter">
                        <input className="w90" type="text" id="optionTwo"></input>
                    </div>
                    <div className="textCenter">
                        <Button variant="info" className="bg-info w90" onClick={e => this.Add(e)}>Submit</Button>
                    </div>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return { authedUser: authedUser }
  }

export default connect(mapStateToProps, null)(Add)