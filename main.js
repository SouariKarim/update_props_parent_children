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



// ===== functional component 

import {useEffect, useState} from 'react';

function Child({color}) {
  const [childColor, setColor] = useState(color);

  useEffect(() => {
    setColor(color);

    console.log('useEffect logic ran');
  }, [color]); // 👈️ add props as dependencies

  return (
    <div>
      <p style={{ color : childColor }} >Child component</p>
    </div>
  );
}

export default function App() {
  const [color, setColor] = useState('red');

  return (
    <div>
      <button onClick={() => setColor('blue')}>
        change color
      </button>

      <hr />

      <Child color={color} />
    </div>
  );
}

// Note that the function we passed to useEffect hook is also invoked on the initial render.

// If you don't want to run the logic in your useEffect hook on the initial render, but only when the specific prop changes, use a ref to return early on the initial render.

import {useEffect, useRef, useState} from 'react';

function Child({parentCount}) {
  const [childCount, setChildCount] = useState(0);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 👈️ return early if first render
    }
    setChildCount(parentCount * 2);

    console.log('useEffect logic ran');
  }, [parentCount]);

  return (
    <div>
      <button>Child count {childCount}</button>
    </div>
  );
}

export default function Parent() {
  const [parentCount, setParentCount] = useState(0);

  return (
    <div>
      <button onClick={() => setParentCount(current => current + 1)}>
        Parent count: {parentCount}
      </button>

      <hr />

      <Child parentCount={parentCount} />
    </div>
  );
}
