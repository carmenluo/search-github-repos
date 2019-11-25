import React from "react";
export default function Status(props) {
  return <main className="repo__card-status">
  <img
    className="repo__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 className="text--semi-bold">{props.message}</h1>
</main>
}