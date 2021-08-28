import { Component } from "react";
import { connect } from "react-redux";
import beep from "./sound/beep.mp3";


class AudioDiv extends Component {    
    componentDidUpdate(){
    const audioTag = document.getElementById("beep");
    if(this.props.audioState > 0){
        audioTag.play();
    }else {
        audioTag.pause();
        audioTag.currentTime = 0;
    }
    }
    render() {
        return ( 
            <div>
                <audio id="beep" preload="auto" src={beep}></audio>
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        audioState: state.audioState
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