import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Styles
const styles = () => ({
    alertBox: {
        background: 'orangered',
        fontSize: '26px',
        padding: '15px'
    }
});

const ErrorAlert = ({ classes, errorMessage }) => {
    return (
        <div className={classes.alertBox}>
            {errorMessage}
        </div>
    )
}

ErrorAlert.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ErrorAlert);
