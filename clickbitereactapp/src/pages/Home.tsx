import React, { useState, useEffect, Component } from 'react'
import Card from '../components/Card'
import dataSource from '../dataSource'
import './Home.css'


function Home(){


    const [featuredBites, setFeaturedBites] = useState([]);

    useEffect(()=>{
        loadFeturedBites()
    }, [])

    let cards:any = [];

    const loadFeturedBites = async () =>{
        const response = await dataSource.get('/bites')
        setFeaturedBites(response.data.slice(0, 3));
    }

    const renderFeaturedBites = () =>{
        if(featuredBites){
            return featuredBites.map((bite:any, index:number) => {
                return (
                    <Card key={index} className='card show' id={index} bite={bite} />
                );
              });
        }
    }


    return(
        <div className="container">
            <div className="row">

                <div className="col-md-3"></div>

                <div className="col-sm-6">

                    <center>
                        <h1 id='title'>Welcome to ClickBite!</h1>
                        <p id='subtitle'>This is where you can find and share your favorite recipes!</p>

                        <h3>Featured Bites</h3>
                    </center>

                    <div className="row">
                        {/* <div className="col-md-4"> */}
                            { renderFeaturedBites() }
                        {/* </div> */}
                    </div>
                </div>

                <div className="col-md-3"></div>

            </div>
        </div>
    )
}

export default Home