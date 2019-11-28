import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Questions from './Questions'
import { connect } from 'react-redux'

class errorPage extends Component {

    render(){

        return(
            <div>
                <span>Page you're looking for not found</span>
            </div>
        )
    }
}

export default errorPage