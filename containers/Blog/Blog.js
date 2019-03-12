import React, {Component, Suspense} from 'react';
import {Route, Link, NavLink, Switch, Redirect} from "react-router-dom";
import classes from "../Blog/Blog.css"

import asyncComponent from "../../hoc/asyncComponent"
//import NewPost from './NewPost/NewPost';
const AsyncNewPOst = asyncComponent(() => {
    return import ('./NewPost/NewPost');
});
const Posts = React.lazy(() => import ('./Posts/Posts'));
class Blog extends Component {
    state = {
        auth: true
    }
    render() {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li>
                                {/*NavLink for default active class and we can
                                use activeClassName for change the name of class */}
                                <NavLink
                                    to="/posts/"
                                    exact
                                    activeClassName="Blog__active__1Ib_J"
                                    activeStyle={{
                                    color: '#fa924f',
                                    textDecoration: 'underline'
                                }}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName="Blog__active__1Ib_J"
                                    to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/*Switch allow to run one Route ,
                and the order is important when using switch */}
                <Switch>
                    {this.state.auth
                        ? <Route path="/new-post" component={AsyncNewPOst}/>
                        : null}
                    {/*route paramter */}
                    <Route
                        path="/posts"
                        render={() => <Suspense fallback={<div> Loading....</div>}> <Posts/></Suspense>}/> {/*to catch any rout not found */}
                    <Route render={() => <h1>Not found</h1>}/> {/* <Redirect from="/" to="/posts"/> */}
                </Switch>
            </div>
        );
    }
}
export default Blog;