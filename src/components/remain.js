import { Component } from "react";
import { connect } from "react-redux";

class RemainedSessions extends Component {
    render() { 
        return ( 
            <div>
                <p>{(this.props.counter > 0) ? `How Many Sesssion: ${this.props.counter}` : "No Pain, No Gain!"}</p>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}
export default connect(mapStateToProps)(RemainedSessions);