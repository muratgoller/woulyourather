import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import SignIn from './SignIn'
import Home from './Home'
import Questions from './Questions'
import errorPage from './errorPage'
import Add from './Add'
import Leaderboard from './Leaderboard'
import LoadingBar from 'react-redux-loading'

class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                <LoadingBar />
                <div className='container'>
                    <Nav/>
                    <div>
                        <Route path='/signin' exact component={SignIn} />
                    </div>
                    <div>
                        <Route path='/' exact component={Home} />
                    </div>
                    <div>
                        <Route path='/questions/:id' exact component={Questions} />
                    </div>
                    <div>
                        <Route path='/add' exact component={Add} />
                    </div>
                    <div>
                        <Route path='/leaderboard' exact component={Leaderboard}></Route>
                    </div>
                    <div>
                        <Route path='/404' exact component={errorPage} />
                    </div>
                </div>
                </Fragment>
            </Router>
        )
    }
}

export default App