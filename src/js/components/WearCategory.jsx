import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

export default class WearCategory extends React.Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5
        };

        return (
            <li>
                <b>{this.props.name}</b>
                <Slider {...settings} className="items">
                    {this.props.list.map(function(item){
                        return <div key={item.id} className="item">
                            <div className="name">
                                <a href={item.url} target="_blank">{item.name}</a>
                            </div>
                            <div className="price">{item.price_net}</div>
                            <div className="name">{item.name}</div>
                            <img src={item.image_url} alt={item.name} />
                        </div>;
                    })}
                </Slider>
            </li>
        )
    }
}

WearCategory.propTypes = {
    name: PropTypes.string.isRequired,
    list: PropTypes.array
};
