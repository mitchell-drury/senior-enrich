import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Store from './store';
import {gotAllCampuses, gotSingleCampus, updatedCampus, removedStudentFromCampus, writeCampusImagePath, writeCampusName} from './store';

export default class SingleCampus extends Component {
    constructor () {
        super ();
        this.state = Store.getState();

        this.updateCampus = this.updateCampus.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.removeStudent = this.removeStudent.bind(this);
    }

    componentDidMount () {
        Axios.get(`/api/getCampus/${this.props.match.params.id}`)
        .then(res => res.data)
        .then(campus => {
            Store.dispatch(gotSingleCampus(campus))
            Store.dispatch(writeCampusImagePath(campus.imagePath))
            Store.dispatch(writeCampusName(campus.name))
        })

        this.unsubscribe = Store.subscribe(() => {
            this.setState(Store.getState());
        })
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    updateCampus (event) {
        event.preventDefault();
        Axios.put(`/api/updateCampus`, {
            name: this.state.currentCampusName,
            imagePath: this.state.currentCampusImagePath,
            id: this.state.currentCampus.id
        })
        .then(res => res.data)
        .then(campus => {
            Store.dispatch(updatedCampus(campus[1][0]));
        })
        .then(() => {
            Axios.get('/api/campusList')
            .then(res => res.data)
            .then(campuses => {
                Store.dispatch(gotAllCampuses(campuses));
            });
        })
    }

    handleImageChange (event) {
        Store.dispatch(writeCampusImagePath(event.target.value))
    }

    handleNameChange (event) {
        Store.dispatch(writeCampusName(event.target.value))
    }

    removeStudent (event) {
        Axios.put('/api/removeStudentFromCampus', {
            id: event.target.getAttribute('value')
        })
        .then(() => {
            Axios.get(`/api/getCampus/${this.state.currentCampus.id}`)
            .then(res => res.data)
            .then(campus => {
                Store.dispatch(gotSingleCampus(campus))
             })
        })
    }

    addStudent (event) {
        event.preventDefault();
        Axios.put('/api/addStudentToCampus', {
            studentId: event.target.studentId.value,
            campusId: this.state.currentCampus.id
        })
        .then(() => {
            Axios.get(`/api/getCampus/${this.state.currentCampus.id}`)
            .then(res => res.data)
            .then(campus => {
                Store.dispatch(gotSingleCampus(campus))
             })
        })        
    }

    render () {
        return (
            <div>
                <h1> Campus Name: {this.state.currentCampus.name} </h1>
                <h2> Students At This Campus: </h2>
    
                <ul>
                    {this.state.currentCampusStudents.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/Students/${student.id}`} > {student.name} </Link>
                                <span className='removeFromlist' value={student.id} onClick={this.removeStudent}> X </span>
                            </li>
                        )
                    })} 
                </ul>
                <form onSubmit={this.addStudent} >
                    <select name='studentId'> 
                        {this.state.studentList.filter(student => {
                            if (!this.state.currentCampusStudents.find(function (campusStudent) {
                                return campusStudent.id === student.id
                            })) {
                                return student;
                            }
                        })
                        .map(student => {
                            return <option key={student.id} value={student.id}> {student.name} </option>
                        })}
                    </select>
                    <input type='submit' value='Add Student To This Campus'/>
                </form>
                <h2> Edit Details </h2> 
                <form onSubmit={this.updateCampus} >
                    <label>
                        Name: 
                        <input name='name' onChange={this.handleNameChange} type='text' value={this.state.currentCampusName} />
                    </label>
                    <label>
                        Image URL:
                        <input name='imagePath' onChange={this.handleImageChange} type='text' value={this.state.currentCampusImagePath} />
                    </label>
                    <input type='submit' value='Save Campus Details' />
                </form>
            </div>
        )
    }
}