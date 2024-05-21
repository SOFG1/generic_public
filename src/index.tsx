import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import reportWebVitals from './reportWebVitals';
import Providers from "./Providers";
import "./i18nextInit";
import "./MapBoxGlInit"
import styled from 'styled-components';
import { Loader } from './UI/Spinners';


const App = React.lazy(() => import("./App"));

const StyledLoader = styled(Loader)`
  height: 200px;
  width: 200px;
    margin: auto;
    margin-top: 30vh;
`

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Providers>
        <Suspense fallback={<StyledLoader />}>
            <App />
        </Suspense>
    </Providers>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
