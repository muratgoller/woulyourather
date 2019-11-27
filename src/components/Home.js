import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Questions from './Questions'
import { connect } from 'react-redux'

class Home extends Component {

    render(){

        return(
            <div>
                {
                    this.props.authedUser === null ? <Redirect to={{pathname: '/signin', state: { from: 'home' }}}></Redirect>
                    :
                    <Questions></Questions>
                }
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {

    return { authedUser: authedUser }
}

export default connect(mapStateToProps,null)(Home)