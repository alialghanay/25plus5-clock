import { Component } from "react";
import { connect } from "react-redux";
import "../style-sheet/session.css";
import dUArrow from "../icons/down-up-arrow.png";

class Session extends Component {
    render() { 
        return ( 
            <div>
                <h3 id="session-label">Session Length</h3>
                <div className="session-btt">
                    <button id="session-decrement" onClick={this.props.sessionD}>
                    <img src={dUArrow}/>
                    </button>
                    <button id="session-increment" onClick={this.props.sessionI}>
                    <img src={dUArrow}/>
                    </button>
                </div>
                <p id="session-length">{this.props.sessionLength}</p>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        sessionLength: state.sessionLength
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sessionI: () => dispatch({
            type: "sessionI"
        }),
        sessionD: () => dispatch({
            type: "sessionD"
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Session);