import React, {useState, useEffect} from 'react'
import dataSource from '../dataSource'
import './Create.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import thumbnail from '../assets/thumbnail.jpg'

const Edit = () =>{

    const navigate = useNavigate()

    let editMode = true;
    const { id } = useParams()
    if(id === undefined){
        editMode = false;
    }

    let bite = {
        id: 0,
        title: "",
        description: "",
        image: "",
        nibbles: 0,
        spits: 0,
        ingredients: [{ingredient: ""}],
        steps: [{ stepNumber: 1, step: "" }],
        reviews: []
    }

    const removeIngredientInput = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const removeStepInput = (index:number) =>{
        const updatedSteps = steps.filter((_, i) => i !== index);
        setSteps(updatedSteps);
    }

    

    const [title, setTitle] = useState(bite.title)
    const [description, setDescription] = useState(bite.description)
    const [image, setImage] = useState(bite.image)
    const [ingredients, setIngredients] = useState(()=>bite.ingredients)
    const [steps, setSteps] = useState(()=>bite.steps)
    const [stepCounter, setStepCounter] = useState(1000);
    const [ingredientCounter, setIngredientCounter] = useState(0);

    const updateSteps = (event:any)=>{
        // Collect steps
        let newSteps = []

        const stepCollection:any = Array.from(document.getElementsByClassName('stepInput'))

        for(let i = 0; i < stepCollection.length; i++){
            newSteps.push({"stepNumber":i, "step": stepCollection[i].value})
        }

        setSteps(newSteps)
    }


    const updateIngredients = (event:any)=>{
        // Collect steps
        let newIngredients = []
        console.log("UpdateIngredients")

        const ingredientCollection:any = Array.from(document.getElementsByClassName('ingredientInput'))

        for(let i = 0; i < ingredientCollection.length; i++){
            newIngredients.push({"ingredient": ingredientCollection[i].value})
        }

        setIngredients(newIngredients)
    }

    const renderedIngredientsList = () => {

        return ingredients.map((ingredient:any, index:number) => {
          return (
            <li key={index} id={index.toString()}>
                <input placeholder='Enter an ingredient' value={ingredient.ingredient} className='ingredientInput' onChange={updateIngredients}></input> 
                    <a className='removeItem' onClick={()=>{removeIngredientInput(index) }}>
                        <i className="fa-solid fa-trash"></i>
                    </a>
            </li>
          );
        });
    };

    const renderedStepsList = () => {
        return steps.map((step:any, index:number) => {
          return (
            <li key={index} id={index.toString()}>
              <input
                placeholder='Enter a step'
                value={step.step}
                className='stepInput'
                onChange={updateSteps}
              />
              <a className='removeItem' onClick={() => removeStepInput(index)}>
                <i className="fa-solid fa-trash"></i>
              </a>
            </li>
          );
        });
      };
      

    let ingredientInputDefault = <li key={1}><input placeholder='Enter an ingredient' className='ingredientInput' onChange={updateIngredients}></input></li>
    let stepInputDefault = <li key={2}><input placeholder='Enter a step' className='stepInput' onChange={updateSteps}></input></li>


    const [ingredientInputs, setIngredientInputs] = useState( [ingredientInputDefault])
    const [stepInputs, setStepInputs] = useState([stepInputDefault])


    useEffect(()=>{
        loadBite()
    }, [])

    const loadBite = async () =>{

        let response
        if(editMode){
            response = await dataSource.get('/bites?biteId=' + id)
            console.log("response.data[0].id: " + response.data[0].id)
            bite.id = response.data[0].id
            console.log(bite.id)
            bite.title = response.data[0].title
            bite.description = response.data[0].description
            bite.image = response.data[0].image
            bite.nibbles = response.data[0].nibbles
            bite.spits = response.data[0].spits
            bite.ingredients = response.data[0].ingredients
            bite.steps = response.data[0].steps
            bite.reviews = response.data[0].reviews
        }

        setTitle(bite.title)
        setDescription(bite.description)
        setImage(bite.image)
        setIngredients(bite.ingredients)
        setSteps(bite.steps)        
    }

    const handleFormSumit = async (event: any) => {
        console.log("form submitted!")
        event.preventDefault()


        if(editMode){

            let finalBite = {
                id: id,
                title: title,
                userId:1,
                username: "user1",
                description: description,
                image: image,
                nibbles: bite.nibbles,
                spits: bite.spits,
                ingredients: ingredients,
                steps: steps,
                reviews: bite.reviews
            }

            console.log("id: " + id)
            await dataSource.put('/bites/update/', finalBite)
            navigate('/bite/' + id)
        }else{

            let finalBite = {
                title: title,
                userId:1,
                username: "user1",
                description: description,
                image: image,
                nibbles: bite.nibbles,
                spits: bite.spits,
                ingredients: ingredients,
                steps: steps,
                reviews: bite.reviews
            }

            await dataSource.post('/bites/create/', finalBite)
            navigate('/discover')
        }
    }

    const updateTitle = (event: any) =>{
        setTitle(event.target.value)
    }

    const updateDescription = (event: any)=>{
        setDescription(event.target.value)
    }

    const updateImage = (event: any)=>{
        setImage(event.target.value)
    }

    const addIngredientInput = () =>{
        setIngredients([...ingredients, { ingredient: '' }]);
        setIngredientCounter(ingredientCounter + 1);
    }

    const addStepInput = (step?:any) =>{
        setSteps([...steps, { stepNumber: 0, step: '' }]);
        setStepCounter(stepCounter + 1);
    }

    return(
        <div className="container">
            <div className="row">

                <div className="col-md-3"></div>

                <div className="col-md-6">

                    <center>
                        <h1 id='title'>{editMode ? "Edit a Bite:" : "Create a Bite:"}</h1>
                    </center>

                    <div className="row">
                        <div className="col">
                            <form onSubmit={handleFormSumit}>
                                
                                <label htmlFor="biteTitle">Bite Title</label>
                                <input id="biteTitle" type="text" className="form-control" placeholder="Enter Title" value={title} onChange={updateTitle}  />
                                
                                <label htmlFor="description">Bite Description</label><br />
                                <textarea className='form-control' placeholder='Enter Description' value={description} id='description' maxLength={200} onChange={updateDescription}></textarea>

                                <label>Ingredients</label>
                                <ul id='ingredients'>
                                    {renderedIngredientsList()}
                                </ul>
                                <a className='btn addItem' onClick={()=>addIngredientInput()}><i className="fa-solid fa-plus"></i></a>

                                <br />
                                <label>Steps</label>
                                <ul id='steps'>
                                    {renderedStepsList()}
                                </ul>
                                <a className='btn addItem' onClick={()=>addStepInput()}><i className="fa-solid fa-plus"></i></a>

                                <br />
                                <label htmlFor="image">Image URL</label>
                                <input id="image" type="text" className="form-control" placeholder="Enter Image URL" value={image} onChange={updateImage}  />
                                
                                <br />
                                <center><img width={200} src={image === '' ? thumbnail : image} /></center>

                                <button className='btn' id='submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-3"></div>

            </div>
        </div>
    )
}

export default Edit;