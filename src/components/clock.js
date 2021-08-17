import { Component } from "react";
import { connect } from "react-redux";

class Clock extends Component {
    render() { 
        return ( 
            <div>
                <h3 id="timer-label">{this.props.time}</h3>
                <p id="time-left">{this.props.timer.min}:{this.props.timer.sec}</p>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        time: state.currentTime,
        timer: state.timer
    }
}
export default connect(mapStateToProps)(Clock);