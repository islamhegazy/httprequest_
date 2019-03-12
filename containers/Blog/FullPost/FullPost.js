import React, {Component} from 'react';
import classes from '../FullPost/FullPost.css'
import axios from 'axios';
class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidMount() {
       console.log(this.props)
        this.laodData();
    }
    componentDidUpdate() { 
        this.laodData();
    }
    laodData() {
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.match.params.id)) {
                axios
                    .get(`/posts/` + this.props.match.params.id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    })
            }

        }
    }
    deletePostHandeler = () => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/posts/` + this.props.match.params.id)
            .then(response => {
                this.setState({loadedPost: response})
            })
    }
    render() {
        //  console.log(this.props.match.params.id)
        let post = <p style={{
            textAlign: 'center'
        }}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{
                textAlign: 'center'
            }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className={classes.FullPost}>
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandeler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;