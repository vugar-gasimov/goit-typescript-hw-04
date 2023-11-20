import React, { useReducer } from "react";

type RequestStep = "idle" | "start" | "pending" | "finished";

type State = {
  isRequestInProgress: boolean;
  requestStep: RequestStep;
};

const initialState: State = {
  isRequestInProgress: false,
  requestStep: "idle",
};

type Action =
  | { type: "START_REQUEST" }
  | { type: "PENDING_REQUEST" }
  | { type: "FINISH_REQUEST" }
  | { type: "RESET_REQUEST" };

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case "START_REQUEST":
      return { ...state, isRequestInProgress: true, requestStep: "start" };
    case "PENDING_REQUEST":
      return { ...state, isRequestInProgress: true, requestStep: "pending" };
    case "FINISH_REQUEST":
      return { ...state, isRequestInProgress: false, requestStep: "finished" };
    case "RESET_REQUEST":
      return { ...state, isRequestInProgress: false, requestStep: "idle" };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  const startRequest = () => {
    requestDispatch({ type: "START_REQUEST" });
    // We simulate a request to the server

    setTimeout(() => {
      requestDispatch({ type: "PENDING_REQUEST" });
      // We simulate receiving a response from the server

      setTimeout(() => {
        requestDispatch({ type: "FINISH_REQUEST" });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: "RESET_REQUEST" });
  };

  return (
    <div>
      <button onClick={startRequest}>Start Request</button>
      <button onClick={resetRequest}>Reset Request</button>
      <p>Request State: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
