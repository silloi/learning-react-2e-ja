import React, { useState, Suspense, lazy } from "react";
import Agreement from "./Agreement";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ErrorBoundary, { ErrorScreen } from "./ErrorBoundary";
import GridLoader from "react-spinners/GridLoader";

const Main = lazy(() => import("./Main"));

const loadStatus = (function() {
  let error, response;
  const promise = new Promise(resolves => setTimeout(resolves, 3000))
    .then(() => (response = "success"))
    .catch(e => (error = e));

  return function() {
    if (error) throw error;
    if (response) return response;
    throw promise;
  };
})();

const threeSecondsToGnar = new Promise(resolves => setTimeout(() => resolves({ gnar: "gnarly!" }), 3000));

const resource = createResource(threeSecondsToGnar);

function Gnar() {
  const result = resource.read();
  return <h1>Gnar: {result.gnar}</h1>;
}

// const result = resource.read();

function createResource(pending) {
  let error, response;
  pending.then(r => (response = r)).catch(e => (error = e));
  return {
    read() {
      if (error) throw error;
      if (response) return response;
      throw pending;
    }
  };
}

function safe(fn) {
  try {
    fn();
  } catch (error) {
    if (error instanceof Promise) {
      error.then(() => safe(fn));
    } else {
      throw error;
    }
  }
}

function Status() {
  const status = loadStatus();
  return <h1>status: {status}</h1>
}

export default function App() {
  // const [agree, setAgree] = useState(false);

  // if (!agree)
  //   return <Agreement onAgree={() => setAgree(true)} />

  // return (
  //   <ErrorBoundary fallback={ErrorScreen}>
  //     <Suspense fallback={<ClimbingBoxLoader />}>
  //       <Main />
  //     </Suspense>
  //   </ErrorBoundary>
  // );

  // return (
  //   <Suspense fallback={<GridLoader />}>
  //     <ErrorBoundary>
  //       <Status />
  //     </ErrorBoundary>
  //   </Suspense>
  // );

  return (
    <Suspense fallback={<GridLoader />}>
      <ErrorBoundary>
        <Gnar />
      </ErrorBoundary>
    </Suspense>
  )
}
