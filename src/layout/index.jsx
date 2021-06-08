import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppNav from '../components/AppNav';
import SlideMenu from '../components/SlideMenu';
import Home from '../pages/index';
import About from '../pages/about';
import PageNotFound from '../pages/notfound';

const Layout = () => {
    const [slideNav, setSlideNav] = useState(false);
    const openCloseSlideNav = () => setSlideNav(!slideNav);
    return (
        <div>
            <Container>
                <BrowserRouter>
                    <AppNav 
                        openCloseSlideNav={openCloseSlideNav} 
                    />
                    <div style={{
                        marginTop: '88px'
                    }}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/about" exact component={About} />
                            <Route exact component={PageNotFound} />
                        </Switch>
                    </div>
                    <SlideMenu 
                        slideNav={slideNav}
                        openCloseSlideNav={openCloseSlideNav}
                    />
                </BrowserRouter>
            </Container>
        </div>
    )
};

export default Layout;