import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AddStudent from './addStudent';
import Axios from 'axios';
import {gotAllStudents} from './store.js';
import Store from './store.js';

export default class Students extends Component {
    constructor () {
        super();
        this.state = Store.getState();
        this.removeStudent = this.removeStudent.bind(this);
    }

    componentDidMount () {
        this.unsubscribe = Store.subscribe(() => {
            this.setState(Store.getState());
        })
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    removeStudent (event) {
        Axios({
            method: 'delete',
            url: '/api/deleteStudent',
            data: {
                studentId: event.target.getAttribute('value')
            }
        })
        .then(() => {
            Axios.get('/api/studentList')
            .then(res => res.data)
            .then(students => {
                Store.dispatch(gotAllStudents(students));
            });
        })
    }

    render () {
        return (
            <div>
                <h2> Student List </h2>
                <ul>
                    {this.state.studentList.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/Students/${student.id}`}> {student.name} </Link>
                                <span className='removeFromList' value={student.id} onClick={this.removeStudent}>X</span>
                            </li>
                        )
                    })}
                </ul>
            <AddStudent campusList={this.state.campusList}/>
            </div>
        )
    }
}
