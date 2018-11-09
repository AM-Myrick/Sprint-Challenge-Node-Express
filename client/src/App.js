import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9001/api/projects")
      .then(res => this.setState(
        {projects: res.data}
        ))
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      this.state.projects !== [] ?
      <div className="App">
        {this.state.projects.map(project => {
          return <p key={project.id}>{project.name} - {project.description}</p>
        })}
      </div>: null
    );
  }
}

export default App;
