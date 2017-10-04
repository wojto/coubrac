import React from 'react';

export default class Loader extends React.Component {
    render() {
        return (
            <div className="spinner-container">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
                <div>Wczytywanie...</div>
            </div>
        )
    }
}
