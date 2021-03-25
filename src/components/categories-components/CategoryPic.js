import React from 'react';

export default function CategoryPic(props) {
    return (
        <img src={props.icon} alt={props.name} className="category-pic" />
    );
}