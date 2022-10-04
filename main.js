import React from "react";
import "./styles.css";

class Child extends React.Component {
  constructor(props) {
    super(props); 
    // gets the first color  state
    this.state = {color : props.color}

  }

  // change the color state whent the props change
  componentDidUpdate(prevProps){
    if(prevProps.color !== this.props.color){
        this.setState({          
            color: this.props.color
        });
    }
}
  render() {
    return (
      <div style={{color : this.state.color}} > child component </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props) ; 
    this.state = { color : 'red' }
  }


  render() {
    return (
      <div>
        <Child color={this.state.color} />

        <button onClick={() => this.setState({color : 'blue'})} > change color </button>


      </div>

    )
  }
}


export default App