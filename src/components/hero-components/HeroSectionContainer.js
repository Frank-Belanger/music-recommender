import React from 'react';
import HeroPlaylist from './HeroPlaylist';
import Track from '../track-components/Track';

export default function HeroSectionContainer() {
    return (
        <div className="hero-section-container">
            <HeroPlaylist />
            <Track />
        </div>
    );
}