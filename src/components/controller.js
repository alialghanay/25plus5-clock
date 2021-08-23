import { Component } from "react";
import { connect } from "react-redux";
import "../style-sheet/controller.css"
import repeatArrow from "../icons/repeat-arrow.png"
import playPause from "../icons/play-pause.png"

var interval;

class Controller extends Component {
    handleClick(props, condition){
        var currentState = props.sessionLn * 60;
        var timeLabel = props.currentTime;
        if(condition === true){
            props.startStop();
            function taskManger(){
                currentState--;
                props.clock(
                    Math.floor(currentState / 60),
                    currentState % 60,
                    timeLabel
                );
                if(currentState <= 0 && timeLabel === "Session"){
                    props.audio();
                    currentState = 0;
                    props.count();
                    timeLabel = "Break";
                    currentState = props.breakLn * 60;
                }else if(currentState <= 0){
                    currentState = 0;
                        props.audio();
                        timeLabel = "Session";
                        currentState = props.sessionLn * 60;
                }
            }
            interval = setInterval(taskManger, 999)
        }else if(condition === false){
            clearInterval(interval);
            props.startStop();
        }else if(condition === "reset"){
            timeLabel = "Session";
            clearInterval(interval);
            props.reset();
        }
    }
    render() {
        return ( 
            <div className="controller-continer">
                <button id="start_stop" onClick={()=>this.handleClick(this.props, this.props.isPlay)}>
                <img src={playPause} alt="Play-Pause-Arrow"/>
                </button>
                <button id="reset" onClick={() => this.handleClick(this.props, this.props.reset().type)}>
                    <img src={repeatArrow} alt="Reset-Arrows"/>
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isPlay: state.isPlay,
        breakLn: state.breakLength,
        sessionLn: state.sessionLength,
        timer: state.timer,
        currentTime: state.currentTime
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => dispatch({
            type: 'reset'
        }),
        startStop: () => dispatch({
            type: 'play'
        }),
        clock: (min, sec, ct) => dispatch({
            type: 'clock',
            min: min,
            sec: sec,
            ct: ct
        }),
        count: () => dispatch({
            type: 'count'
        }),
        audio: () => dispatch({
            type: 'audio'
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Controller);