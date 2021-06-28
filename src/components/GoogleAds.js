import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import APIService from '../APIService';
import UpdateArticle from './UpdateArticle';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';




const GoogleAds = () => {

    const [articles, setArticles] = useState([])
    const [editArticle, setEditArticle] = useState(null)
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    let history = useHistory()



    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/articles/', {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mytoken']}`
            }
        })
        .then(resp => resp.json())
        .then(resp => setArticles(resp))
    .   catch(error => console.log(error))
    }, [])

    useEffect(() => {
        if(!token['mytoken']) {
            // history.push('/')
            window.location.href = '/'
        }
    }, [token])

    // const editBtn = (article) => {
    //     setEditArticle(article)
    // }

    // const updatedInformation = (article) => {
    //     const new_article = articles.map(myarticle => {
    //         if(myarticle.id === article.id) {
    //             return article;
    //         }
    //         else {
    //             return myarticle;
    //         }
    //     })

    //     setArticles(new_article)

    // }

    const articleForm = () => {
        setEditArticle({title:'', description:''})
    }

    // const createdArticleElement = (article) => {
    //     const new_articles = [...articles, article]
    //     setArticles(new_articles)

    // }

    // const deleteBtn = (article) => {
    //     APIService.DeleteArticle(article.id, token['mytoken'])

    //      const new_articles = articles.filter(myarticle => {
    //         if(myarticle.id === article.id) {
    //             return false
    //         }
    //         return true;
    //     })

    //     setArticles(new_articles)
        
    // }



    return (
        
    <div className="container mt-4" font="gotham-rounded-bold">
        
        <h4 className="display-4 text-center mb-4" font="gotham-rounded-bold" style={{color:'rgb(248,172,6)', fontSize:'40px'}}>
            Welcome to Google Ads!
        </h4> 

        <p>Please connect your Google Ads account. 
            You need to add at least one Google Ads account to see your Google Ads campaigns inside FranAds.</p>

        <div className="container" align="center">
            
                <div className="col-4">
                    <button onClick={articleForm} className="btn btn-success">Connect to Google Ads</button>
                </div>
            
        </div>

        <br/>
        <br/>

        {/* {articles.map(article => {
            return (
                <div key={article.id}>

                    <h4 className="mb-0" font="gotham-rounded-bold" align="left" style={{color:'black', fontSize:'20px'}}>{article.title}</h4>
                    <br/>
                    <p className="mb-0" font="gotham-rounded-bold" align="left" style={{color:'black', fontSize:'20px'}}>{article.description}</p>
                    <br/>

                    <div className="container">
                        <div className= "row justify-content-start">
                            <div className= "col-2">
                                <button className="btn btn-primary" onClick= {() => editBtn(article)} >Update</button>
                            </div>

                            <div className= "col-2">
                                <button onClick={() => deleteBtn(article)} className="btn btn-danger">Delete</button>
                            </div>

                        </div>
                    </div>

                    <br/>
                    <br/>


                </div>
            )
        })}

        {editArticle ? <UpdateArticle article={editArticle} updatedInformation={updatedInformation} createdArticleElement={createdArticleElement} /> : null}
         */}

        {/* <div className='mt-4' align="center">
            <br></br>
            <Link to="/">
                <button type="button" className="btn btn-primary btn-block" style={{margin:'10px'}}>NEXT</button>
            </Link>
            <Link to="/">
            <button type="button" className="btn btn-outline-primary btn-block" style={{margin:'10px'}}>HOME</button>
            </Link>
        </div> */}
        
    </div>
)}

export default GoogleAds;