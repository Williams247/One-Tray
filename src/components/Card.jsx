import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ImageView from './ImageView';
import './style.css';

const CardComponent = ({ image, openCloseModal }) => {

    // Function to download an image
    const downLoadImage = async (imageSrc, imageDescription) => {
        const image = await fetch(imageSrc);
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);

        const link = document.createElement('a');
        link.href = imageURL;
        link.download = imageDescription;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className="card">
            <Card>
                <ImageView
                    imageUrl={image}
                    alt='Weaverbell image'
                />
                <Container style={{ paddingBottom: '23px', paddingTop: '18px' }}>
                    <div>
                        <center>
                            <Button style={{
                                background: '#4e4e4e',
                                color: 'white',
                                marginTop: '18px'
                            }}
                                onClick={() => openCloseModal(true, image)}
                            >
                                Full view
                        </Button>
                            <Button
                                onClick={() => downLoadImage(image, 'one-source-image')}
                                style={{
                                    background: '#4e4e4e',
                                    color: 'white',
                                    marginTop: '18px',
                                    marginLeft: '8px'
                                }}
                            >
                                Download
                        </Button>
                        </center>
                    </div>
                </Container>
            </Card>
        </div>
    )
};

export default CardComponent;