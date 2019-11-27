import React, { Component } from 'react'
import { Nav, Card, Row, Col, Button, ProgressBar, Badge } from 'react-bootstrap';
import { connect } from 'react-redux'
import { nullLiteral } from '@babel/types';

class QResult extends Component{

    render(){

        const { qID, questions, users, authedUser } = this.props
        const question = questions.filter(e=>e.id == qID)[0]
        const user = users.filter(e=>e.id == question.author)[0]
        const optOneCount = question.optionOne.votes.length
        const optTwoCount = question.optionTwo.votes.length
        const totalVoteCount = optOneCount + optTwoCount
        const optOneRatio = (optOneCount/totalVoteCount)*100
        const optTwoRatio = (optTwoCount/totalVoteCount)*100
        var optOneAuthUserCount = question.optionOne.votes.filter(o => o == authedUser).length
        var optTwoAuthUserCount = question.optionTwo.votes.filter(o => o == authedUser).length

        return(
            <div>
                <Card>
                    <div className="bg-light">{user.name} Asks:</div>
                    <div>
                        <Row>
                            <Col xs={3}>
                                <img className="imageWidth" src={user.avatarURL}></img>
                            </Col>
                            <Col xs={9}>
                                <div><h4>Results</h4></div>
                                <Card className="w90 mt-10">
                                    <div>
                                        <Row>
                                            <Col xs={10}>
                                                Would you rather {question.optionOne.text} ?
                                            </Col>
                                            {optOneAuthUserCount > 0 ? <Col xs={2}><Badge pill variant="success">Your Vote</Badge></Col> : null}
                                        </Row>
                                        
                                    </div>
                                    <div>
                                        <ProgressBar now={optOneRatio} label={`${optOneRatio}%`} />
                                    </div>
                                    <div>
                                        <span>{optOneCount} out of {totalVoteCount} votes</span>
                                    </div>
                                </Card>
                                <Card className="w90 mt-10">
                                    <div>
                                        <Row>
                                            <Col xs={10}>
                                                Would you rather {question.optionTwo.text} ?
                                            </Col>
                                            {optTwoAuthUserCount > 0 ? <Col xs={2}><Badge pill variant="success">Your Vote</Badge></Col> : null}
                                        </Row>
                                    </div>
                                    <div>
                                        <ProgressBar now={optTwoRatio} label={`${optTwoRatio}%`} />
                                    </div>
                                    <div>
                                        <span>{optTwoCount} out of {totalVoteCount} votes</span>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
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

export default connect(mapStateToProps, null)(QResult)