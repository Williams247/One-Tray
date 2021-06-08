import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from './Button';

const styles = () => ({
    textField: {
        width: '95%'
    },
    label: {
        '&$focused': {
            color: '#4e4e4e'
        },
    },
    focused: {},
    outlinedInput: {
        '&$focused $notchedOutline': {
            border: '1px solid #4e4e4e'
        },
    },
    notchedOutline: {},
    flex: {
        display: 'flex'
    },
    color: {
        color: 'white'
    }
});

const TextInput = ({ classes, TextFieldOnchange, textValue }) => (
    <div className={classes.flex}>
        <TextField
            onChange={TextFieldOnchange}
            value={textValue}
            label="Search image....."
            className={classes.textField}
            type="text"
            name="text"
            autoComplete="text"
            variant="outlined"
            InputLabelProps={{
                classes: {
                    root: classes.label,
                    focused: classes.focused
                },
            }}
            InputProps={{
                classes: {
                    root: classes.outlinedInput,
                    focused: classes.focused,
                    notchedOutline: classes.notchedOutline
                },
            }}
        />
        <Button
            buttonBackground="#4e4e4e"
            buttonColor="white"
            label="Search"
            btnType="submit"
        />
    </div>
)

TextInput.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextInput);