import { Component } from "react";
import { connect } from "react-redux";
import beep from "./sound/beep.mp3";

let playAudio = (a, t) => {
    if(a){
        t.play();
    } else if (a) {
        t.pause();
        t.currentTime = 0;
    }
};

class AudioDiv extends Component {
    render() {
        const audioTag = document.getElementById("beep");
        return ( 
            <div>
                <audio id="beep" preload="auto" src={beep}>{(this.props.min === "00" && Number(this.props.sec) < 10) ? playAudio(this.props.audio, audioTag) : this.props.audioC}</audio>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        audio: state.audio,
        min: state.timer.min,
        sec: state.timer.sec
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        audioC: () => dispatch({
            type: 'audioC'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioDiv);

/*
<audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
*/