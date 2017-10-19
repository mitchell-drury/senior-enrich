import React, {Component} from 'react';
import Axios from 'axios';
import {addedCampus} from './store.js'
import Store from './store.js'

export default class AddCampus extends Component {
    constructor () {
        super ();
        this.addCampus = this.addCampus.bind(this);
    }

    addCampus (event) {
        event.preventDefault();
        Axios.post('/api/addCampus', {
            name: event.target.name.value,
            imagePath: event.target.imagePath.value
        })
        .then(res => res.data)
        .then(campus => {
            Store.dispatch(addedCampus(campus))
        })
    }

    render () {
        return (
            <div>
                <h2> Add New Campus </h2>
                <form onSubmit={this.addCampus}>
                    <label>
                        Campus Name
                        <input name="name" type='text'/>
                    </label>
                    <label>
                        Image URL
                        <input name="imagePath" type="text"/>
                    </label>
                    <input type="submit" value="Add Campus"/>
                </form>
            </div>
        )
    }
}