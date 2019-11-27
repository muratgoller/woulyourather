import React, { Component } from 'react'
import { Nav, Card, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'
import { handleInitialData } from '../actions/users'
import { mapQuestionsToStore } from '../actions/questions'
import {withRouter} from 'react-router-dom';

class QDetail extends Component {

    handleOptionChange = (e, id) => {
        if(id == "optionOne"){
            document.getElementById("optionTwo").checked = false;
        }
        else if(id == "optionTwo"){
            document.getElementById("optionOne").checked = false;
        }
    }

    save = (e) => {
        const { dispatch, qID, authedUser } = this.props

        var a = null;

        if(document.getElementById("optionOne").checked){
            a = "optionOne"
        }
        else{
            a = "optionTwo"
        }

        const answer = {
            authedUser : authedUser, 
            qid : qID, 
            answer: a
        }

        dispatch(handleSaveAnswer(answer))
        dispatch(handleInitialData())
        dispatch(mapQuestionsToStore())
    }

    render(){

        const { qID, questions, users, authedUser } = this.props
        
        const question = questions.filter(e => e.id == qID)[0]

        const user = users.filter(e => e.id == question.author)[0]

        return(
            <Card className="w50 mauto">
                <div className="bg-light">{user.name} asks:</div>
                <div>
                    <Row>
                        <Col xs={3}>
                            <img className="imageWidth" src={user.avatarURL}></img>
                        </Col>
                        <Col xs={9}>
                            <div className="textCenter">
                                <h4>Would you rather...</h4>
                            </div>
                            <div>
                                <div>
                                    <Row>
                                        <Col xs={2}>
                                            <input type="radio" id="optionOne" onChange={e => this.handleOptionChange(e, "optionOne")} checked={true}/>
                                        </Col>
                                        <Col xs={10}>
                                            {question.optionOne.text}
                                        </Col>
                                    </Row>
                                    
                                </div>
                                <div>
                                    <Row>
                                        <Col xs={2}>
                                        <input type="radio" id="optionTwo" onChange={e => this.handleOptionChange(e, "optionTwo")}/>
                                        </Col>
                                        <Col xs={10}>
                                            {question.optionTwo.text}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div>
                                <Button variant="info" className="bg-info w90" onClick={e=>this.save(e)}>Submit</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
        )
    }
}

function mapStateToProps({questions, users, authedUser}) {

    var qarray = []
    Object.entries(questions).map((t,k) => (
        qarray.push(t[1])
    ))

    var uarray = []
    Object.entries(users).map((t,k) => (
        uarray.push(t[1])
    ))

    return { questions: qarray, users: uarray, authedUser: authedUser }
}


export default withRouter(connect(mapStateToProps, null)(QDetail))