import React from 'react';
import classes from '../Post/Post.css';

const post = (props) => {
    console.log(props);
    return (
        <article className={classes.Post} onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    )
}

export default post;
/**
 You can get access to the history object's properties and 
 the closest <Route>'s match via the withRouter higher-order component. 
 withRouter will pass updated match, location, and history props to the 
 wrapped component whenever it renders.
 */