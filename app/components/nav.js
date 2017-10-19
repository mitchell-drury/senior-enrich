import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div>
                <Link to="/Campuses"> Campuses </Link>
                <Link to="/Students"> Students </Link>
            </div>
        )
    }
}

export default Nav;