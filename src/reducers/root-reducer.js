import IniState from "./iniState.json";
import {TimeManager}  from "./time-manager";

function rootReducer(state = IniState, action){
    switch (action.type){
        case 'breakI':
            if(state.isPlay){
                return {
                    ...state,
                    "breakLength": TimeManager("Increment", state.breakLength)
                }
            }else return {...state};
        case 'breakD':
            if(state.isPlay){
                return {
                    ...state,
                    "breakLength": TimeManager("Decrement", state.breakLength)
                }
            }else return {...state};
        case 'sessionI':
            if(state.isPlay){
                return {
                    ...state,
                    "sessionLength": TimeManager("Increment", state.sessionLength),
                    "timer": {
                        "min": TimeManager("Increment", state.sessionLength),
                        "sec": 0
                    }
                }
            }else return {...state};
        case 'sessionD':
            if(state.isPlay){
                return {
                    ...state,
                    "sessionLength": TimeManager("Decrement", state.sessionLength),
                    "timer": {
                        "min": TimeManager("Decrement", state.sessionLength),
                        "sec": 0
                    }
                }
            }else return {...state};
        case 'play':
            return {
                ...state,
                "isPlay": !state.isPlay
            }
        case 'clock':
            return {
                ...state,
                "timer": {
                    "min": action.min,
                    "sec": action.sec
                },
                "currentTime": action.ct
            }
        case 'count':
            const a = state.counter + 1;
            return{
                ...state,
                "counter": a
            }
        case 'audio':
        const b = state.audioState + 1;
            return{
                ...state,
                "audioState": b
            }
        case 'reset':
            return IniState
        default:
            return state;
    }
}

export default rootReducer;