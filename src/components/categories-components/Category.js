import React, { useContext } from 'react';
import CategoryPic from './CategoryPic';
import CategoryInfo from './CategoryInfo';
import Context from '../../Context';

export default function Category(props) {
    const { category, setCategory, setNavIndex } = useContext(Context);

    function chooseCategory() {
        setCategory({
            selectedCategory: props.id,
            listOfCategoriesFromAPI: category.listOfCategoriesFromAPI
        });

        setNavIndex((index) => index + 1 );
    }

    return (
        <div className="chooser-category-button" onClick={chooseCategory}>
                    <CategoryPic icon={props.icon} name={props.name} />
                    <CategoryInfo name={props.name} id={props.id} href={props.href}/>
        </div>
    );
}