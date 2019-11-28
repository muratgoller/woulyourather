import React, { Component } from 'react'
import { Nav, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { mapQuestionsToStore } from '../actions/questions'
import { handleInitialData } from '../actions/users'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';

class Leaderboard extends Component {

    componentDidMount() {
        this.props.mapQuestionsToStore()
        this.props.mapUsersToStore()
    }

    render(){

        const {questions, users} = this.props

        const sortedUsers = users.sort((a,b) => (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length))
        
        return(
            this.props.authedUser === null ? <Redirect to={{pathname: '/signin', state: { from: 'leaderboard' }}}></Redirect>
            :
            <div>
                {sortedUsers.map((user)=>(
                    <Card key={user.id}>
                        <Row>
                            <Col xs={2}>
                                <img className="imageWidth" src={user.avatarURL}></img>
                            </Col>
                            <Col xs={7}>
                                <div>
                                    <b>{user.name}</b>
                                </div>
                                <div className="mt-10">
                                    <Row>
                                        <Col xs={10}>
                                            Answered Questions
                                        </Col>
                                        <Col xs={2}>
                                            {Object.keys(user.answers).length}
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-10">
                                    <Row>
                                        <Col xs={10}>
                                            Created Questions
                                        </Col>
                                        <Col xs={2}>
                                            {user.questions.length}
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col xs={3}>
                                <Card>
                                    <div className="bg-light">Score</div>
                                    <div>
                                        <Badge pill variant="info">
                                            <span>
                                                {Object.keys(user.answers).length + user.questions.length}
                                            </span>
                                        </Badge>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                ))}
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

const mapDispatchToProps = dispatch => {
    return {
        mapQuestionsToStore: () => dispatch(mapQuestionsToStore()),
        mapUsersToStore: () => dispatch(handleInitialData())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)