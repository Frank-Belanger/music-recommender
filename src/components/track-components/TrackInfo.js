import React, { useContext, useState } from 'react';
import Context from '../../Context';

export default function TrackInfo() {
    const { track } = useContext(Context);
    const [ titleAnimation, setTitleAnimation ] = useState('');
    const [ albumAnimation, setAlbumAnimation ] = useState('');

    const setTitleAnimationClass = element => {
        if(element?.scrollWidth > 290 && element?.scrollWidth < 340) {
            setTitleAnimation('animation-small');
        } else if(element?.scrollWidth > 290){
            setTitleAnimation('animation');
        } else if(element !== undefined) {
            setTitleAnimation('');
        }
    }

    const setAlbumAnimationClass = element => {
        if(element?.scrollWidth > 290 && element?.scrollWidth < 340) {
            setAlbumAnimation('animation-small');
        } else if(element?.scrollWidth > 290){
            setAlbumAnimation('animation');
        } else if(element !== undefined) {
            setAlbumAnimation('');
        }
    }

    return (
        <div className="track-info">
            <div style={{textAlign: 'right', gridColumnStart: '1', gridRowStart: '1'}}>
                Album: 
            </div>

            <div className="scrolling-album-container" >
                <span className="scrolling-album">
                    <div ref={setAlbumAnimationClass} className={["fitWidth " + albumAnimation]}>
                        {track.selectedTrack?.album.name}
                    </div>
                </span>
            </div>

            <div style={{textAlign: 'right', gridColumnStart: '1', gridRowStart: '2'}}>
                Title: 
            </div>

            <div className="scrolling-title-container" >
                <div className="scrolling-title" >
                    <div ref={setTitleAnimationClass} className={["fitWidth " + titleAnimation]} >
                        {track.selectedTrack?.name}
                    </div>
                </div>
            </div>
        </div>
    )
}