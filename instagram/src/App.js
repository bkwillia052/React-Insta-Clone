import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import dummyData from './dummy-data.js';
import PostContainer from './components/PostContainer/PostContainer.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import PropType from 'prop-types';
import PostsPage from './components/PostContainer/PostsPage.js';
import Authenticate from './components/Authentication/Authenticate.js';
import Login from './components/Login/Login.js';
import { TweenMax, TimelineLite, Power2, Elastic, CSSPlugin } from "gsap/TweenMax";

const TweensRef = [TweenMax, TimelineLite, Power2, Elastic, CSSPlugin, TweensRef];

library.add(faHeart);
library.add(faUserCircle);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      stateComments: [],
      commentInput: {},
      dummyData: [],
      searchInput: '',
      filteredList: [],
      username: this.props.username,
      loggedIn: false
    }

    this.inputHandler = this.inputHandler.bind(this);
    this.addNewComment = this.addNewComment.bind(this); 
    this.searchInputHandler = this.searchInputHandler.bind(this);
    
  }

  

  searchInputHandler(event){

    let filteredList = this.state.dummyData.filter(profile => {
      if(profile.username.includes(event.target.value)) { return profile }});
    
    this.setState({searchInput: event.target.value, filteredList: filteredList});
  }

  inputHandler(event){
      
    let username = this.props.username;
    this.setState({
        commentInput: {
            text: event.target.value,
            id: Date.now(),
            username: username

      }
    })
  }
  addNewComment(event) {
    event.preventDefault();
    this.setState({
      stateComments: [...this.state.stateComments, this.state.commentInput],
      commentInput: {}
    })
  }

  componentDidMount(){
      
      setTimeout(() => this.setState({dummyData: dummyData}), 2000);
  }

  render() {
    return (
      <div>
      
      <PostsPage searchInput={this.state.searchInput}
           filter={this.searchInputHandler}
           filteredList={this.state.filteredList}
           dummyData={this.state.dummyData}
           logOut={this.props.logOut}
      />


      </div>
    );
  }
}

App = Authenticate(App, Login);

export default App;
/* stateComments={this.state.stateComments}
                       inputHandler={this.inputHandler}
                       addNewComment={this.addNewComment}
                       commentInput={this.state.commentInput} 
                       
                       
                       
                       
                       
<SearchBar searchInput={this.state.searchInput} filter={this.searchInputHandler}/>
      <div className="container">
        
        {this.state.filteredList.length > 0 ? this.state.filteredList.map(post => {return <PostContainer dummyData={post}/> }) : this.state.dummyData.map(post => {return <PostContainer dummyData={post} /> })}
        
      </div>                       
                       */