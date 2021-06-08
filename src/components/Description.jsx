import Typography from '@material-ui/core/Typography';

const Description = ({label, underline}) => {
    return (
        <div>
            <div style={{ marginTop: '18px' }}>
                <Typography variant="h4">
                    <div>{label}</div>
                    {underline && (
                        <div style={{
                            width: '45px',
                            height: '5px',
                            marginTop: '5px',
                            background: 'black'
                        }}></div>
                    )}
                </Typography>
            </div>
        </div>
    )
};

export default Description;