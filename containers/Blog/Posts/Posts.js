import React, {Component} from 'react';
import axios from '../../../axios';
import classes from "../Posts/Posts.css";
import Post from './../../../components/Post/Post';
import {Route, Link} from 'react-router-dom';
import FullPost from './../FullPost/FullPost';
class Posts extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        console.log(this.props)
        axios
            .get(`/posts`)
            .then(response => {
                const posts = response
                    .data
                    .slice(0, 4);
                const updatePosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatePosts})
            })
            .catch(error => {
                // console.log(error) this.setState({error: true})
            })
    };
    postClickedHandeler = (id) => {
        this.setState({selectedPostId: id})
    }

    render() {
        let posts = !this.state.error
            ? this
                .state
                .posts
                .map(post => {
                    return <Link to={'/posts/' + post.id} key={post.id}><Post
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postClickedHandeler(post.id)}/>
                    </Link>
                })
            : <p>some thing wemt wrong</p>
        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                {/*nested route */}
                <Route path="/posts/:id" exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;
