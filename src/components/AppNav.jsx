import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const AppNav = ({openCloseSlideNav}) => {
    return (
       <AppBar style={{background: '#4e4e4e'}}>
           <ToolBar>
               <IconButton onClick={openCloseSlideNav}>
                    <MenuIcon style={{color: 'white'}}/>
               </IconButton>
               <h3 style={{ color: 'white' }}>OneTray</h3>
           </ToolBar>
       </AppBar>
    );
}

export default AppNav;