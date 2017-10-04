import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {GET_WEAR_LIST} from "../actions/index";
import * as wearListActions from '../actions/index';
import { bindActionCreators } from 'redux';

class WearNeeded extends React.Component {
    render() {
        let props = this.props;
        return (
            <div className="wear-needed">
                Będziesz {'f' === this.props.gender ? 'potrzebowała' : 'potrzebował'}
                {this.props.wearList.data.map(function(category, index){
                    return <span key={category.name}>
                        {index > 0 ? (props.wearList.length !== index + 1 ? ', ' : ' oraz ') : ' '}
                        <a href={category.url} target="_blank">{category.name}</a>
                        {props.wearList.length === index + 1 ? '.' : ''}
                    </span>;
                })}
            </div>
        )
    }
}

WearNeeded.propTypes = {
    gender: PropTypes.oneOf(['m', 'f']).isRequired
};

const mapStateToProps = (state) => ({
    wearList: state.wearList
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(wearListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WearNeeded)
