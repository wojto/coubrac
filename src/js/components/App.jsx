import React from 'react';
import OptionsForm from './OptionsForm';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Co dziś ubrać?</h1>
                </div>
            </div>
            <OptionsForm gender={this.props.match.params.gender}
                         temperature_scale={this.props.match.params.temperature_scale}
                         location={this.props.match.params.location} />
            <Link to='/about'>O nas / kontakt</Link>
        </div>
    }
}
