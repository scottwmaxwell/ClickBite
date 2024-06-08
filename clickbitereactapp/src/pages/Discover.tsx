import React, { useEffect, useState} from 'react';
import dataSource from '../dataSource'
import Card from '../components/Card'

function Discover(){

    const [bites, setBites] = useState([]);
    const [className, setClassName] = useState('card show');

    useEffect(()=>{
        loadBites();
    }, []);



    const loadBites = async () =>{
        const response = await dataSource.get('/bites')
        setBites(response.data);
    }

    const renderBites = () =>{
        if(bites){
            return bites.map((bite:any, index:number) => {
                return (
                    <Card key={index} className={className} id={index} bite={bite} />
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
                        <h1 id='title'>Discover</h1>
                    </center>

                    <div className="row">
                            { renderBites() }
                    </div>
                </div>

                <div className="col-md-3"></div>

            </div>
        </div>
    )
}

export default Discover;