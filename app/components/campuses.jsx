import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AddCampus from './addCampus';
import Axios from 'axios';
import Store from './store.js';
import {gotAllCampuses} from './store.js';
import {deletedCampus} from './store.js';

export default class Campuses extends Component {
    constructor () {
        super ();
        this.state = Store.getState();
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount () {
        this.unsubscribe = Store.subscribe(() => {
            this.setState(Store.getState());
        })
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleDelete (event) {
        Axios({
            method: 'delete',
            url: '/api/deleteCampus',
            data: {
                campusId: event.target.getAttribute('value')
            }
        })
        .then(() => {
            Axios.get('/api/campusList')
            .then(res => res.data)
            .then(campuses => {
                Store.dispatch(gotAllCampuses(campuses));
            });
        })
    }

    render () {
        return (
            <div>
                <h1> Campuses </h1>
                <ul>
                    {this.state.campusList.map(campus => {
                        return (
                            <li key={campus.id}>
                                <Link to={`/Campuses/${campus.id}`}> {campus.name} </Link>
                                <span className='removeFromList' value={campus.id} onClick={this.handleDelete}> X </span>
                            </li>
                        )
                    })}
                </ul>
                <AddCampus />
            </div>
        )
    }
}
