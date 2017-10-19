import React, {Component} from 'react';
import Axios from 'axios';
import {addedStudent} from './store.js';
import Store from './store.js';

export default class AddStudent extends Component {
    constructor () {
        super ();
        this.addStudent = this.addStudent.bind(this);
    }

    addStudent (event) {
        event.preventDefault();
        Axios.post('/api/addStudent', {
            name: event.target.name.value,
            campusId: event.target.campus.value,
            email: event.target.email.value
        })
        .then(res => res.data)
        .then(student => {
            Store.dispatch(addedStudent(student));
        })
    }

    render () {
        return (
            <div>
                <h2> Add New Student </h2>
                <form onSubmit={this.addStudent}>
                    <label>
                        Student Name:
                        <input name="name" type='text'/>
                    </label>
                    <label>
                        Campus:
                        <select defaultValue name='campus'> 
                            {this.props.campusList.map(campus => {
                                return <option key={campus.id} value={campus.id}> {campus.name} </option>
                            })}
                        </select>
                    </label>
                    <label>
                        Email Address:
                        <input name='email' type='text'/>
                    </label>
                    <input type="submit" value="Add Student"/>
                </form>
            </div>
        )
    }
}