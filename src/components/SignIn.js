import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from '../style/SignIn'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/users'
import { mapQuestionsToStore } from '../actions/questions'
import { setAuthedUser } from '../actions/authUser'

class SignIn extends Component {

    componentDidMount() {
        this.props.handleInitialData()
        this.props.receiveQuestions()
    }

    handleAuthedUser = (e) => {
        e.preventDefault()

        const select = document.getElementById("selectAuthedUser")

        this.props.onChange(select.value)

        if(this.props.location.state.from == 'home'){
            this.props.history.push('/');
        }
        else{
            this.props.history.push(this.props.location.state.from);
        }
      }

    render(){
        const { users } = this.props

        return(
            <div>
                <Card className="text-center">
                    <Card.Body>
                        <div>   
                            <h3>Welcome To The Would Yoy Rather App</h3>
                            <p>Please sign in to continue</p>
                        </div>
                        <div>
                            <select id="selectAuthedUser">
                                <option>Please Choose</option>
                                    {users.map((u)=>(
                                        <option value={u.id} key={u.id}>{u.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <Button onClick={e => this.handleAuthedUser(e)} variant="info" className="bg-info">Sign In</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps({users}) {
    var result = []
    Object.entries(users).map((t,k) => (
        result.push(t[1])
    ))
    
    return { users: result }
  }

  
const mapDispatchToProps = dispatch => {
    return {
        onChange: (value) => dispatch(setAuthedUser(value)),
        handleInitialData: () => dispatch(handleInitialData()),
        receiveQuestions: () => dispatch(mapQuestionsToStore())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)