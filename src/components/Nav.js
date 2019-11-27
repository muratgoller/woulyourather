import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authUser'

class Nav extends Component{

    clearAuthedUser = (e) => {
      const { dispatch } = this.props

      dispatch(setAuthedUser(null));
    }

    render(){
      return (
        <nav className='nav'>
          <ul>
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/add' activeClassName='active'>
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to='/leaderboard' activeClassName='active'>
                Leader Board
              </NavLink>
            </li>
            {this.props.authedUser == null ? null 
            : 
            <div className="ml50">
              <ul>
                <li>
                  <span>Hello, {this.props.users.filter(e => e.id == this.props.authedUser)[0].name}</span>
                </li>
                <li>
                  <img className="w20p" src={this.props.users.filter(e => e.id == this.props.authedUser)[0].avatarURL}></img>
                </li>
                <li>
                  <span className="cursorPointer" onClick={this.clearAuthedUser}>Logout</span>
                </li>
              </ul>
            </div>
          }
          </ul>
        </nav>
      )
    }
}

function mapStateToProps({authedUser, users}) {

  var uarray = []
    Object.entries(users).map((t,k) => (
        uarray.push(t[1])
    ))

  return { authedUser: authedUser, users: uarray }
}

export default connect(mapStateToProps, null)(Nav)