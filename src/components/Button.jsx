import Button from '@material-ui/core/Button';

const AppButton = ({
        buttonBackground,
        buttonColor,
        label,
        btnType,
        onClick
    }) => {
    return (
        <Button
            onClick={onClick}
            type={btnType}
            style={{
                background: buttonBackground,
                color: buttonColor
            }}>
            {label}
        </Button>
    )
};

export default AppButton;