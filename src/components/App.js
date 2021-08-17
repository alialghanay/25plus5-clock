import { Component } from 'react';
import { connect } from 'react-redux';
import '../style-sheet/App.css';
import Break from './break';
import Session from './session';
import Clock from './clock';
import RemainedSessions from './remain';
import Controller from './controller';
import AudioDiv from './audio-div';

class App extends Component {
  render() { 
    return (
      <div className="App">
        <div className="flip">
        <Break />
        <Session />
        </div>
        <Clock />
        <AudioDiv />
        <Controller />
        <RemainedSessions />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(App);
