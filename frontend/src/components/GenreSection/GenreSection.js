import React from "react";

import { useNavigate } from "react-router-dom";

export default function GenreSection() {

    const [isScrolling,setIsScrolling] = React.useState(false); 
    const [clientX,setClientX] = React.useState(0);
    const [scrollX,setScrollX] = React.useState();

    function onMouseDown(e){
        setIsScrolling(true);
        setScrollX(e.target.scrollLeft)
        setClientX(e.clientX);
    }

    function onMouseUp(e){
        setScrollX(e.target.scrollLeft)
        setClientX(e.clientX);
        setIsScrolling(false);
    }

    function onMouseMove(e){
        setClientX(e.target.scrollX);
        setScrollX(e.target.scrollX);
        if (isScrolling){
            e.target.scrollLeft = (scrollX + e.clientX - clientX)*(-1);
            setScrollX(scrollX + e.clientX - clientX);
            setClientX(e.clientX);
        }
    }


    const GenreList = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western", "Sci-Fi", "Historical"]

    return (
        <section className="genre_section">
            <div className="animateTitle animateTitle_genreSection">
                <h2 className="section_title section_title_genreSection"><span>G</span><span>E</span><span>N</span><span>R</span><span>E</span><span>S</span></h2>
            </div>
            <div onMouseDown={(e) => {onMouseDown(e)}} onMouseUp={(e) => onMouseUp(e)} onMouseMove={(e) => {onMouseMove(e)}} className="genre_section_boxes">
                {GenreList.map((item) => { return (<GenreBox key={item} Genre={item} />) })}
            </div>
        </section>
    )
}

function GenreBox({ Genre }) {

    const navigate = useNavigate();


    function onGenreClick(genre) {
        navigate("/genre/" + genre)
    }


    return (
        <div onClick={() => onGenreClick(Genre)} className="genre_container">
            <h3>{Genre}</h3>
        </div>
    )
}