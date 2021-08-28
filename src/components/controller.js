import { Component } from "react";
import { connect } from "react-redux";
import "../style-sheet/controller.css"
import repeatArrow from "../icons/repeat-arrow.png"
import playPause from "../icons/play-pause.png"

var interval;

class Controller extends Component {
    handleClick(props, condition){
        var currentState = props.timer.min * 60 + props.timer.sec;
        var timeLabel = props.currentTime;
        if(condition === "reset"){
            props.reset();
            clearInterval(interval);
        }else if(condition === true){
            props.startStop();
            function taskManger(){
                currentState--;
                props.clock(Math.floor(currentState / 60), currentState % 60, timeLabel);
                if(currentState <= 0 && timeLabel === "Session"){
                    clearInterval(interval);
                    props.audio();
                    setTimeout(()=>{
                        currentState = 0;
                        props.count();
                        timeLabel = "Break";
                        currentState = props.breakLn * 60;
                        props.clock(Math.floor(currentState / 60), currentState % 60, timeLabel);
                        interval = setInterval(taskManger, 1000);}, 3000)
                }else if(currentState <= 0){
                    clearInterval(interval);
                    props.audio();
                    setTimeout(()=>{currentState = 0;
                        timeLabel = "Session";
                        currentState = props.sessionLn * 60;
                        props.clock(Math.floor(currentState / 60), currentState % 60, timeLabel);
                        interval = setInterval(taskManger, 1000);}, 3000)
                }
            }
            interval = setInterval(taskManger, 1000)
        }else if(condition === false){
            clearInterval(interval);
            props.startStop();
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