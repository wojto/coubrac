import React from 'react';
import WearCategory from './WearCategory';
import { connect } from 'react-redux'

class WearList extends React.Component {
    render() {
        return (
            <ul className="categories">
                {this.props.wearList.data.map(function(category, index){
                    return <WearCategory key={category.name} name={category.name} url={category.url}
                                         list={category.list}/>;
                })}
            </ul>
        )
    }
}

const mapStateToProps = (state) => ({
    wearList: state.wearList
});

export default connect(mapStateToProps)(WearList)
