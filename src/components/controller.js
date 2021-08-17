import { Component } from "react";
import { connect } from "react-redux";
import "../style-sheet/controller.css"
import repeatArrow from "../icons/repeat-arrow.png"
import playPause from "../icons/play-pause.png"

var interval;
var min;
var sec;
var timeLabel;

class Controller extends Component {
    handleClick(props, condition){
        var currentState = min + sec;
        var counter = 0;
        if(condition === true){
            props.startStop();
            function taskManger(){
                const m = Math.floor(currentState / 60);
                const s = currentState % 60;
                props.clock(m, s, timeLabel);
                currentState--;
                if(m === 0 && s === 0 && counter === 0){
                    currentState = 0;
                        props.audio()
                        props.count();
                        timeLabel = "Break";
                        currentState = props.breakLn * 60;
                        counter++;
                }else if(m === 0 && s === 0){
                    currentState = 0;
                        props.audio();
                        timeLabel = "Session";
                        currentState = props.sessionLn * 60;
                        counter = 0;
                }
            }
            interval = setInterval(taskManger, 500)
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
        min = Number(this.props.timer.min * 60);
        sec = Number(this.props.timer.sec);
        timeLabel = this.props.currentTime;
        return ( 
            <div className="controller-continer">
                <button id="start_stop" onClick={()=>this.handleClick(this.props, this.props.isPlay)}>
                <img src={playPause}/>
                </button>
                <button id="reset" onClick={() => this.handleClick(this.props, this.props.reset().type)}>
                    <img src={repeatArrow}/>
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