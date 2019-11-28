import React, { Component } from 'react'
import { Nav, Card, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { mapQuestionsToStore } from '../actions/questions'
import { handleInitialData } from '../actions/users'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom';

class QList extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.mapQuestionsToStore()
        //this.props.mapUsersToStore()
    }

    viewQuestion(e, qID){
        e.preventDefault()
        this.props.history.push('Questions/'+qID);
    }

    render(){
        
        const { questions, users, type, authedUser } = this.props

        var qFiltered = null

        if(type == 'unans'){
            qFiltered = questions.filter(e => !e.optionOne.votes.includes(authedUser) && !e.optionTwo.votes.includes(authedUser))
        }
        else if(type == 'ans'){
            qFiltered = questions.filter(e => e.optionOne.votes.includes(authedUser) || e.optionTwo.votes.includes(authedUser))
        }

        qFiltered = qFiltered.sort((a,b) => (b.timestamp - a.timestamp))

        return(
            <div>
                {qFiltered.map((question) => (
                    <div className="mt-10" key={question.id}>
                        <Card>
                            <Row>
                                <Col>
                                    <div className="bg-light">
                                        <p>{getUser(users,question.author, "name")} asks:</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img className="imageWidth" src={getUser(users,question.author, "avatar")}></img>
                                </Col>
                                <Col>
                                    <div>
                                        <p>Would You Rather</p>
                                    </div>
                                    <div>
                                        {question.optionOne.text} or {question.optionTwo.text}
                                    </div>
                                    <div>
                                        <Button onClick={e => this.viewQuestion(e, question.id)} className="w90" variant="outline-info">View Poll</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}

function getUser(users, id, property){
    var arr = users.filter(user => user.id == id)

        var result = []
        Object.entries(arr).map((t,k) => (
            result.push(t[1])
        ))
        
        if(arr.length > 0)
        {
            if(property == "avatar")
            {
                return result[0].avatarURL
            }
            else if(property == "name")
            {
                return result[0].name
            }
        }
        else
        {
            return null
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

const mapDispatchToProps = dispatch => {
    return {
        mapQuestionsToStore: () => dispatch(mapQuestionsToStore()),
        mapUsersToStore: () => dispatch(handleInitialData())
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QList))