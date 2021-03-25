import React, { useContext } from 'react';
import ChooserText from './ChooserText';
import Context from '../../Context';
import Chooser from '../../helpers/chooser';
import mod from '../../helpers/modulo';

export default function Nav() {
    const { FontAwesomeIcon, navIndex, setNavIndex } = useContext(Context);

    function incIndex() {
        setNavIndex((navIndex) => navIndex + 1);
    }

    function decIndex() {
        setNavIndex((navIndex) => navIndex - 1);
    }

    return (
        <div className="chooser-nav">
            <button onClick={decIndex} className="nav-arrow-button end">
                <FontAwesomeIcon icon={['fas', 'angle-left']} className="nav-arrow" />
            </button>
                
            <div className="nav-text">
                <ChooserText text={Chooser[mod(navIndex, Chooser.length)]} />
            </div>
            
            <button onClick={incIndex} className="nav-arrow-button start">
                <FontAwesomeIcon icon={['fas', 'angle-right']} className="nav-arrow" />
            </button>
        </div>
    );
}