const ImageView = ({ imageUrl, alt }) => {
    return (
        <div>
            <img
                src={imageUrl}
                alt={alt}
                style={{ width: '100%', height: '250px' }}
                onContextMenu={event => event.preventDefault()}
            />
        </div>
    )
};

export default ImageView;