import React from 'react';
import ReactDOM from 'react-dom';
import {createGlobalStyle} from "styled-components";
import App from './App';


const Global = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    width: 100vw;
    overflow-x: hidden;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    color: #212121;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }


`

ReactDOM.render(
    <React.StrictMode>
        <Global/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

