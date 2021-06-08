import { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import AboutIcon from '@material-ui/icons/Dashboard';

const SlideMenu = ({
    openCloseSlideNav,
    slideNav
}) => {
    const [urls] = useState([
        {name: 'Home', link: '/', icon: <HomeIcon /> },
        {name: 'About', link: '/about', icon: <AboutIcon />}
    ])
    return (
        <Drawer
            open={slideNav}
            onClick={openCloseSlideNav}
        >
            <div style={{width: '250px'}}>
            <div style={{marginTop: '18px'}}>
                <h2 style={{  color: '#4e4e4e', textAlign: 'center' }}>OneTray</h2>
            </div>
            <div style={{
                marginTop: '13px'
            }}>
                <List>
                    {
                        urls.map((data, index) => {
                            return (
                            <Link
                                key={index}
                                to={data.link}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black'
                                }}
                            >
                               <ListItem
                                button
                                  style={{
                                    fontWeight: 'bold',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    marginTop: '8px',
                                    color: '#4e4e4e'
                                }}
                              >
                               {data.icon} 
                               <span
                                    style={{
                                        marginTop: '1px',
                                        marginLeft: '7px'
                                    }}
                                >
                                    {data.name}
                                </span>
                              </ListItem>
                            </Link>
                            )
                        })
                    }
                </List>
            </div>
          </div>
        </Drawer>
    )
};

export default SlideMenu;