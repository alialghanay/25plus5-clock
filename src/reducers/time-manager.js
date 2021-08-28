export function TimeManager(action, currentState){
    switch (action){
      case "Increment":
        return (currentState < 60) ? currentState + 1 : currentState;
      case "Decrement":
        return (currentState > 1) ? currentState - 1 : currentState;
      default:
        return currentState;
    }
}

export const minFManger = (value) => (value < 10) ? `0${value}` : value;