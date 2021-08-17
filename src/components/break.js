import { Component } from "react";
import { connect } from "react-redux";
import "../style-sheet/break.css";
import dUArrow from "../icons/down-up-arrow.png"

class Break extends Component {
    render() { 
        return ( 
            <div className="break">
                <h3 id="break-label">Break Length</h3>
                <div className="break-btt">
                    <button id="break-decrement" onClick={this.props.breakD}>
                        <img src={dUArrow}/>
                    </button>
                    <button id="break-increment" onClick={this.props.breakI}>
                    <img src={dUArrow}/>
                    </button>
                </div>
                <p id="break-length">{this.props.breakLength}</p>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        breakLength: state.breakLength
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        breakD: () => dispatch({
            type: "breakD"
        }),
        breakI: () => dispatch({
            type: "breakI"
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Break);