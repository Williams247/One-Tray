import { useRef } from 'react';
import Loader from './Loader';

const ImageView = ({ imageUrl, alt }) => {
    // Refs
    const loading = useRef();
    const loaded = useRef();

    // Function to display images when the image if fully loaded
    const loadImage = () => {
        loading.current.style.display = 'none'
        loaded.current.style.display = 'block'
    }

    return (
        <div>
            <div className="" ref={loading}>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '18px' }}>
                    <div style={{ display: 'flex', fontWeight: 'bold' }}>
                        <Loader /> <div style={{ margin: '8px 18px' }}>Loading....</div>
                    </div>
                </div>
            </div>
            <div className="hide" ref={loaded}>
                <img
                    src={imageUrl}
                    alt={alt}
                    style={{ width: '100%', height: '250px' }}
                    onContextMenu={event => event.preventDefault()}
                    onLoad={loadImage}
                />
            </div>
        </div>
    )
};

export default ImageView;