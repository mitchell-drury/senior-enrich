import React, {Component} from 'react';
import Store from './store';
import Axios from 'axios';
import {gotAllStudents, gotSingleStudent, updatedStudent, writeStudentEmail, writeStudentName, writeStudentCampus} from './store';

export default class SingleStudent extends Component {
    constructor () {
        super ();
        this.state = Store.getState();

        this.updateStudent = this.updateStudent.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.changeCampus = this.changeCampus.bind(this);
    }

    componentDidMount () {
        Axios.get(`/api/getStudent/${this.props.match.params.id}`)
        .then(res => res.data)
        .then(student => {
            Store.dispatch(gotSingleStudent(student));
            Store.dispatch(writeStudentEmail(student.email));
            Store.dispatch(writeStudentName(student.name));
            Store.dispatch(writeStudentCampus(student.campusId));
        })
        
        this.unsubscribe = Store.subscribe(() => {
            this.setState(Store.getState());
        })
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleEmailChange (event) {
        Store.dispatch(writeStudentEmail(event.target.value))
    }

    handleNameChange (event) {
        Store.dispatch(writeStudentName(event.target.value));
    }

    changeCampus (event) {
        Store.dispatch(writeStudentCampus(event.target.value));
    }

    updateStudent (event) { 
        event.preventDefault();
        Axios.put(`/api/updateStudent`, {
            name: this.state.currentStudentName,
            email: this.state.currentStudentEmail,
            campusId: this.state.currentStudentCampus,
            id: this.state.currentStudent.id
        })
        .then(res => res.data)
        .then(student => {
            Store.dispatch(updatedStudent(student[1][0]))
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
                <h1> Student Details </h1>
                <form onSubmit={this.updateStudent} >
                    <label>
                        Name: 
                        <input name='name' onChange={this.handleNameChange} type='text' value={this.state.currentStudentName} />
                    </label>
                    <label>
                        Email:
                        <input name='email' onChange={this.handleEmailChange} type='text' value={this.state.currentStudentEmail} />
                    </label>
                    <label>
                        Campus:
                        <select name='campus' value={this.state.currentStudentCampus} onChange={this.changeCampus}>
                            {this.state.campusList.map(campus => {
                                return <option key={campus.id} value={campus.id}> {campus.name} </option>
                            })}
                        </select>
                    </label>
                    <input type='submit' value='Save Student Details' />
                </form>
            </div>
        )
    }
}