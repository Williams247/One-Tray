import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Description from '../components/Description';

// Styles
const styles = () => ({
    about: {
        color: '#4e4e4e'
    },
    link: {
        marginLeft: '8px',
        textDecoration: 'underline',
        '&:hover': {
            color: 'black'
        }
    }
});

const About = ({ classes }) => {
    const openLinkInNewTab = url => {
        window.open(url)
    }
    return (
        <div className={classes.about}>
            <div style={{ marginTop: '108px', color: '#4e4e4e' }}>
                <Description
                    label="About us"
                    underline={true}
                />
                <div style={{ marginTop: '38px' }}>
                    <h2>OneTray helps you crawl Pexels, Unsplash and Pixabay in one single page so you don't have to spend much time combining through free images.</h2>
                    <h2 style={{ marginTop: '45px' }}>
                        Made with love x
                        <span
                            onClick={() => openLinkInNewTab('https://github.com/Williams247')}
                            style={{ cursor: 'pointer' }}
                            title="Click here"
                        >
                            <span className={classes.link}>Williams</span>
                        </span>
                        <span style={{ marginLeft: '8px' }}>x</span>
                        <span
                            onClick={() => openLinkInNewTab(' https://twitter.com/obiokeke_')}
                            style={{ cursor: 'pointer' }}
                            title="Click here"
                        >
                            <span className={classes.link}>Daniel</span>
                        </span>
                    </h2>
                    <h2>
                        &copy; Weaverbell 2021
                    </h2>
                </div>
            </div>
        </div>
    )
};

About.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(About);
