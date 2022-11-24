import React from "react";

const Cards = ({updateScore, images}) => {
   
    return (
        <div className="image-container">
            {images.map((img) => {
                return <div className="card-container" id={img.id} key={img.id} onClick={() => updateScore(img.id)}>
                    <div className="card-images" style={{backgroundImage: `url(${img.path})`}}></div>
                    <p className="card-text">{img.text}</p>
                </div>
            })}
        </div>
    );
}

export default Cards;