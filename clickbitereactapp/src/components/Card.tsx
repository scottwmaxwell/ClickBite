import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import defaultImage from '../assets/ClickBite.png'
import './Card.css'

function Card(props: any){

    let cardImage = defaultImage
    let linkToBite = '/bite/' + props.bite._id

    if(props.bite.image != ""){
        cardImage = props.bite.image
    }

    return (
        <div className="col-md-4">
            <Link className='linkToBite' to={linkToBite}>
                <div className={props.className}>
                    <img className="card-img-top" src={cardImage} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title"> {props.bite.title} </h5>
                        <small><i className="author">{props.bite.author}</i></small>
                        <p className="card-text">{props.bite.description}</p>                        
                        <div id="rating">
                            <small id="spits"><i className="fa-solid fa-head-side-cough"></i>{props.bite.spits} Spits</small>
                            <small id="nibbles"><i className="fa-solid fa-cookie-bite"></i>{props.bite.nibbles} Nibbles</small>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Card;