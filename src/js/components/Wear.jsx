import React from 'react';
import Loader from './Loader';
import { server } from '../config/index';
import WearNeeded from './WearNeeded';
import WearList from './WearList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { SET_WEAR_LIST, SET_WEAR_LIST_ERROR } from "../actions/index";
import * as wearListActions from '../actions/index';
import { bindActionCreators } from 'redux';

class Wear extends React.Component {
    constructor(props){
        super();

        this.state = {
            error: false,
            data: null
        }
        this.api_url = server + '/api/wear';
    }

    componentDidMount() {
        this.loadWearFromServer();
    }

    loadWearFromServer() {
        console.info('loadWearFromServer from <Wear />');
        fetch(this.api_url+'?gender='+this.props.gender+'&temperature='+this.props.weather.temperature+'&humidity='
            +this.props.weather.humidity+'&wind='+this.props.weather.wind+'&rain='+this.props.weather.rain+'&clouds='
            +this.props.weather.clouds)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    this.props.actions.setWearListError({
                        type: SET_WEAR_LIST_ERROR,
                        error: data.error
                    });
                    // this.setState({
                    //     error: data.error
                    // });
                } else {
                    this.props.actions.setWearList({
                        type: SET_WEAR_LIST,
                        wearList: {
                            data: data
                        }
                    });

                    // this.setState({
                    //     data: data
                    // });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        if (this.props.wearList.error) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        {this.props.wearList.error}
                    </div>
                </div>
            )
        } else if (this.props.wearList.data) {
            return (
                <div>
                    <WearNeeded gender={this.props.gender} />
                    <WearList />
                </div>
            )
        } else {
            return (
                <Loader />
            )
        }
    }
}

Wear.propTypes = {
    gender: PropTypes.oneOf(['m', 'f']).isRequired
};

const mapStateToProps = (state) => ({
    wearList: state.wearList,
    weather: state.weather
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(wearListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Wear)
