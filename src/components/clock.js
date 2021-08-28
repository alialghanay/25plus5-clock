import { Component } from "react";
import { connect } from "react-redux";
import {minFManger} from "../reducers/time-manager"
class Clock extends Component {
    render() { 
        return ( 
            <div>
                <h3 id="timer-label">{this.props.time}</h3>
                <p id="time-left">{minFManger(this.props.timer.min)}:{minFManger(this.props.timer.sec)}</p>
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