import React, { useCallback, useContext, useEffect } from 'react';
import Category from '../categories-components/Category';
import Nav from './Nav';
import Playlist from '../playlists-components/Playlist';
import Chooser from '../../helpers/chooser';

import mod from '../../helpers/modulo';
import Context from '../../Context';

export default function ChooserContainer() {
    const { category, playlist, navIndex } = useContext(Context);

    const setComponentToRender = useCallback(() => {
        switch(Chooser[mod(navIndex, Chooser.length)]){
            case "categories":
                if(category.listOfCategoriesFromAPI){
                    return category.listOfCategoriesFromAPI.map((item, index) => (
                        <Category
                            key={index}
                            name={item.name}
                            id={item.id}
                            href={item.href}
                            icon={item.icons[0].url}
                        />
                    ))
                }
                break;

            case "playlists":
                if(playlist.listOfPlaylistsFromAPI){
                    return playlist.listOfPlaylistsFromAPI.map((item, index) => (
                        <Playlist
                            key={index}
                            num={index}
                            name={item.name}
                            id={item.id}
                            href={item.href}
                            icon={item.images[0].url}
                        />
                    ))
                } else {
                    return (
                        <div className="category-missing-message">
                            {['Oops!', <br key={0}/>, 'You need to choose a category before selecting a playlist.']}
                        </div>
                    );
                }

            default:
                return 'Loading...';
        }
    }, [ navIndex, category, playlist ]);

    useEffect(() => {        
        setComponentToRender()
    }, [ navIndex, setComponentToRender ]);    
        
    return (
        <div className="chooser-container">
            <Nav />
            <div className="chooser-container-items">
                {setComponentToRender()}
            </div>
        </div>
    );
}