import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';


function UpdateArticle(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [token] = useCookies(['mytoken'])


    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
    }, [props.article])

    const updateArticleElement = () => {
        APIService.UpdateArticle(props.article.id, {title, description}, token['mytoken'])
        .then(resp => props.updatedInformation(resp))

    }

    const createArticleElement = () => {
        APIService.CreateArticle({title, description}, token['mytoken'])
        .then(resp => props.createdArticleElement(resp))

    }

    return (
        <div>

            
            {props.article ? (
                <div className= "mb-3">

                    <label htmlFor="title" className= "form-label">Title</label>
                    <input type= "text" className= "form-control" id="title" placeholder = "Please enter title..." 
                    value={title} onChange= {e => setTitle(e.target.value)}/>

                    <label htmlFor="description" className= "form-label">Description</label>
                    <textarea className="form-control" id="description" rows="5" placeholder="Please enter description..."
                    value={description} onChange= {e => setDescription(e.target.value)}
                    ></textarea>

                    <br/>

                    {props.article.id ? <button onClick={updateArticleElement} className="btn btn-success">Update Data</button>
                    : <button onClick={createArticleElement} className="btn btn-success">Create Data</button>}
                    
                </div>
            ) : null
            }      
        </div>
    )
}

export default UpdateArticle