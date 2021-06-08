import logo from '../assets/icon.png';

const NotFound = () => {
    return (
        <div>
            <div style={{
                marginTop: '168px',
                display: 'flex',
                justifyContent: 'center',
                color: '#4e4e4e'
            }}>
                <div>
                    <center>
                        <img style={{ width: '128px' }} src={logo} alt="Logo" />
                    </center>
                    <div style={{ marginTop: '48px', textAlign: 'center' }}>
                        <h1>4O4</h1>
                        <h3>Sorry, the route you request is not valid, please use try a valid route</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;