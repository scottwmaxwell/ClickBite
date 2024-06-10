import React, {useState, useEffect} from 'react'
import dataSource from '../dataSource'
import { useParams, Link } from 'react-router-dom'
import './ViewBite.css'
import { useNavigate } from 'react-router-dom';


const ViewBite = () =>{

    const navigate = useNavigate()

    const { id } = useParams()
    console.log(id);

    let biteData = {
        id: "",
        title: "",
        description: "",
        image: "",
        nibbles: 0,
        spits: 0,
        ingredients: [],
        steps: [],
    }

    const [bite, setBite] = useState(biteData)
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])

    useEffect(()=>{
        loadBite()
    }, [])

    const loadBite = async () =>{

        try{
            let response = await dataSource.get('/bites?biteId=' + id)

            setBite(response.data[0]);
            setIngredients(buildList(response.data[0].ingredients, 'ingredient'))
            setSteps(buildList(response.data[0].steps, 'step'))

        }catch(e){
            console.log("There was an error fetching Bite");
        }
    }

    const buildList = (items: any, type: string) => {
        console.log("BuildList")
        let itemsList:any = []
        for(let i = 0; i < items.length; i++){
            itemsList.push(<li key={i.toString()}>{items[i][type]}</li>)
        }
        return itemsList
    }

    const handleDelete = () => {

        let deleteConfirm = window.confirm("Are you sure you would like to delete this bite?")

        if(deleteConfirm){
            dataSource.delete('/deleteBite' + id)
            navigate('/')
        }

    }

    const renderSteps = (steps: any) => {
        if(steps){
            return steps.map((index:number) => {
                return (
                    <li key={index}>{index}</li>
                    
                );
              });
        }
    }
    

    return(
        <div className="container">
            <div className="row">

                <div className="col-md-3">
                    <Link className="btn" to={"/edit/" + id}>Edit</Link>
                    <br />
                    <button className="btn delete" onClick={handleDelete}>Delete</button>
                </div>

                <div className="col-md-6">

                    <center>
                        <h1 id='title'>{bite.title}</h1>
                    </center>

                    <div className="row">
                        <div className="col">
                            {bite.description}

                            <div id='steps'>
                                <p><b>Steps</b></p>
                                <ol>
                                    {renderSteps(bite.steps)}
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <b>Ingredients</b>
                    <ul>
                        {renderSteps(bite.ingredients)}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default ViewBite;