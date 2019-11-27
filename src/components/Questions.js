import React, { Component } from 'react'
import QList from './QList'
import QDetail from './QDetail'
import QResult from './QResult'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux'
import { Nav, Card, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router';

class Questions extends Component{

    determineMode = () => {
        const qID = this.props.match.params.id

        const { questions, authedUser } = this.props

        if(qID != undefined){
            const q = questions.filter(e => e.id == qID)[0]

            var optOneCount = q.optionOne.votes.filter(o => o == authedUser).length
            var optTwoCount = q.optionTwo.votes.filter(o => o == authedUser).length

            if((optOneCount + optTwoCount) > 0){
                return 'result'
            }
            else{
                return 'detail'
            }
        }
        else{
            return 'list'
        }
    }

    render(){

        const qID = this.props.match.params.id

        if(this.props.authedUser === null){
            return(
            <Redirect to={{pathname: '/signin', state: { from: 'Questions/' + qID }}}></Redirect>)
        }

        const mode = this.determineMode()        

        if(mode=='list'){
            return(
                <div>
                    <Tabs defaultActiveKey="unans" id="uncontrolled-tab-example">
                        <Tab eventKey="unans" title="Unanswered Questions">
                            <QList type='unans'></QList>
                        </Tab>
                        <Tab eventKey="ans" title="Answered Questions">
                            <QList type='ans'></QList>
                        </Tab>
                    </Tabs>
                </div>
                )
        }
        else if(mode == 'detail'){
            return(<QDetail qID={qID}></QDetail>)
        }
        else if(mode == 'result'){
            return(<QResult qID={qID}></QResult>)
        }
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

export default withRouter(connect(mapStateToProps, null)(Questions))