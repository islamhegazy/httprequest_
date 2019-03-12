import React, {Component} from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from '../Blog/Blog.css';
class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false

    }
    componentDidMount() {
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
                // console.log(error)
                this.setState({error: true})
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
                    return <Post
                        title={post.title}
                        key={post.id}
                        author={post.author}
                        clicked={() => this.postClickedHandeler(post.id)}/>
                })
            : <p>some thing wemt wrong</p>

        return (
            <div className={classes.Blog}>
                <h1>Blog Component</h1>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost id_Blog_Com={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;