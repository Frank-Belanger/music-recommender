import React from 'react';

export default function CategoryInfo(props) {
    function formatCategoryName(prop) {
        switch(prop) {
            case "Dance/Electronic":
                return "Dance";
            case "Cooking & Dining":
                return "Cooking";
            case "Folk & Acoustic":
                return "Folk";
            default:
                return prop;
        }        
      }

    return (
        <div className="category-info">
            {formatCategoryName(props.name)}
        </div>
    );
}