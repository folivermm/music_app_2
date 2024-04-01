import React, { useState } from 'react';
import './NavSortBar.css';
function NavSortBar({ onSortingOptionChange, startingPointRef, endingPointRef, onSortButtonClick }) {
    return (
        <div className="nav-sort-bar">
            <div>
                <label htmlFor="sortingOption">Sort by:</label>
                <select id="sortingOption" onChange={(e) => onSortingOptionChange(e.target.value)}>
                    <option value="fourths">Fourths</option>
                    <option value="fifths">Fifths</option>
                    <option value="sevenths">Sevenths</option>
                    <option value="chromatic">Chromatic</option>
                </select>
            </div>
            <div>
                <label htmlFor="startingPoint">Start:</label>
                <select id="startingPoint" ref={startingPointRef}>
                    <option value="L">C</option>
                    <option value="M">F</option>
                    <option value="N">Bb/A#</option>
                    <option value="O">Eb/D#</option>
                    <option value="P">Ab/G#</option>
                    <option value="Q">Db/C#</option>
                    <option value="R">Gb/F#</option>
                    <option value="S">B</option>
                    <option value="T">E</option>
                    <option value="U">A</option>
                    <option value="V">D</option>
                    <option value="W">G</option>
                </select>
            </div>
            <div>
                <label htmlFor="endingPoint">End:</label>
                <select id="endingPoint" ref={endingPointRef}>
                    <option value="L">C</option>
                    <option value="M">F</option>
                    <option value="N">Bb/A#</option>
                    <option value="O">Eb/D#</option>
                    <option value="P">Ab/G#</option>
                    <option value="Q">Db/C#</option>
                    <option value="R">Gb/F#</option>
                    <option value="S">B</option>
                    <option value="T">E</option>
                    <option value="U">A</option>
                    <option value="V">D</option>
                    <option value="W">G</option>
                </select>
            </div>
            <div>
                <button onClick={onSortButtonClick}>Sort</button>
            </div>
        </div>
    );
}

export default NavSortBar;