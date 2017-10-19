import React, { Component } from 'react';
import Axios from 'axios';
import {Switch, Route} from 'react-router-dom';
import Nav from './nav';
import Campuses from './campuses';
import Students from './students';
import SingleCampus from './singleCampus';
import SingleStudent from './singleStudent';
import Store, {gotAllStudents, gotAllCampuses} from './store';


export default class Galaxy extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount () {
    Axios.get('/api/studentList')
    .then(res => res.data)
    .then(students => {
        Store.dispatch(gotAllStudents(students));
    });

    Axios.get('/api/campusList')
    .then(res => res.data)
    .then(campuses => {
        Store.dispatch(gotAllCampuses(campuses));
    })

  }

  render() {
    if (!this.state) { return null }   
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path='/Campuses' component={Campuses} />
          <Route path='/Campuses/:id' component={SingleCampus}/>
          <Route exact path='/Students' component={Students} />
          <Route path='/Students/:id' component={SingleStudent}/>
        </Switch>
      </div>
    )
  }
}
