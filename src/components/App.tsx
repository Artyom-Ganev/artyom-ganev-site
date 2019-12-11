import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import './App.scss';
import Menu from './Navigation/Menu';
import About from './Page/About';
import Blog from './Page/Blog';
import Career from './Page/Career';
import Contacts from './Page/Contacts';
import Gallery from './Page/Gallery';
import Main from './Page/Main';

/**
 * Main application
 */
export default () => (
    <HashRouter>
        <Menu/>
        <div className='components-app__background'/>
        <div className='flexBox flexColumn components-app__content'>
            <Route exact={true} path='/' component={Main}/>
            <Route path='/about' component={About}/>
            <Route path='/blog' component={Blog}/>
            <Route path='/career' component={Career}/>
            <Route path='/contacts' component={Contacts}/>
            <Route path='/gallery' component={Gallery}/>
        </div>
        <div className='components-app__rights'>© 2019 All rights reserved</div>
    </HashRouter>
);
