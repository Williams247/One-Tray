import { useState, useRef } from 'react';
import { createClient } from 'pexels';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import TextInput from '../components/TextInput';
import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import ErrorAlert from '../components/ErrorAlert';
import Modal from '../components/Modal';
import Dialog from '../components/Dialog';
import Loader from '../components/Loader';
import Button from '../components/Button';

// Styles
const styles = () => ({
    modalBox: {
        width: '90%',
        marginLeft: '5%',
        marginTop: '25px'
    },
    modalBoxHead: {
        background: '#4e4e4e',
        textIndent: '15px'
    }
});

const Home = ({ classes }) => {
    // States
    const [searchText, setSearchText] = useState('');
    const [firstResult, setFirstResult] = useState([]);
    const [secondResult, setSecondResult] = useState([]);
    const [thirdResult, setThirdResult] = useState([]);
    const [firstResultError, setFirstResultError] = useState({
        isError: false,
        errorMessage: ''
    });
    const [secondResultError, setSecondResultError] = useState({
        isError: false,
        errorMessage: ''
    });
    const [thirdResultError, setThirdResultError] = useState({
        isError: false,
        errorMessage: ''
    });
    const [errorMessage, setErrorMessage] = useState({
        error: false,
        message: ''
    });
    const [modal, setModal] = useState({
        open: false,
        imageUrl: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    // Refs for pane
    const firstResultPanel = useRef();
    const secondResultPanel = useRef();
    const thirdResultPanel = useRef();
    const imageLoading = useRef();
    const imageLoaded = useRef();

    // Refs for tabs
    const firstResultTab = useRef();
    const secondResultTab = useRef();
    const thirdResultTab = useRef();

    // Functionality to switch panes
    const switchResultPane = (index) => {
        if (index === 1) {
            // Pane Actions
            firstResultPanel.current.className = '';
            secondResultPanel.current.className = 'hide';
            thirdResultPanel.current.className = 'hide';

            // Tab Actions
            firstResultTab.current.id = 'active';
            secondResultTab.current.id = '';
            thirdResultTab.current.id = '';
        } else if (index === 2) {
            // Pane Actions
            firstResultPanel.current.className = 'hide';
            secondResultPanel.current.className = '';
            thirdResultPanel.current.className = 'hide';

            // Tab Actions
            firstResultTab.current.id = '';
            secondResultTab.current.id = 'active';
            thirdResultTab.current.id = '';
        } else {
            // Tab Actions
            firstResultPanel.current.className = 'hide';
            secondResultPanel.current.className = 'hide';
            thirdResultPanel.current.className = '';

            // Tab Actions
            firstResultTab.current.id = '';
            secondResultTab.current.id = '';
            thirdResultTab.current.id = 'active';
        }
    }

    // Function to get image for first result pane
    const firstSearchResult = async () => {
        // API for pixabay
        setLoading(true);
        setFirstResult([]);

        try {
            const getFirstSearchResult = await Axios.get(`https://pixabay.com/api/?key=21875002-1ad64de0d03b15dae54da65fa&q=${searchText.toLocaleLowerCase()}&image_type=photo`);
            setLoading(false);
            const { data: { hits } } = getFirstSearchResult;

            console.log('From Pixabay API');
            console.log(hits);
            setFirstResult(hits);

            setFirstResultError({
                isError: false,
                errorMessage: ''
            })

        } catch (error) {
            console.log(error);
            setLoading(false);
            setFirstResultError({
                isError: true,
                errorMessage: 'Failed to fetch images, please try again or something else.'
            })
        }
    }

    // Function to get results for the second image pane
    const secondSearchResult = async () => {
        // API for unsplash
        setLoading(true);
        setSecondResult([]);

        try {
            const getSecondSearchResult = await Axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=100&query=${searchText.toLocaleLowerCase()}&client_id=O0YGcWeNQDPcpP7014RI8tg7fT5tC_jxLuWHIDd1P7U`);
            console.log('Second search result');
            setLoading(false);
            const { data: { results } } = getSecondSearchResult;
            console.log('From Unsplash API');
            console.log(results);
            setSecondResult(results);

            setSecondResultError({
                isError: false,
                errorMessage: ''
            })

        } catch (error) {
            console.log(error);
            setLoading(false);
            setSecondResultError({
                isError: true,
                errorMessage: 'Failed to fetch images, please try again or something else.'
            })
        }
    }

    // Function to get result from the third image pane
    const thirdSearchResult = () => {
        setThirdResult([]);

        const client = createClient('563492ad6f917000010000010493a61d43dc44de86bf06a75f749a95');
        client.photos.search({
            query: searchText.toLocaleLowerCase(),
            per_page: 100
        }).then(response => {
            console.log('From Pexels API');
            const { photos } = response;
            console.log(photos)
            setThirdResult(photos);

            setThirdResultError({
                isError: false,
                errorMessage: ''
            })

        }).catch(() => {
            setThirdResultError({
                isError: true,
                errorMessage: 'Failed to fetch images, please try again or something else.'
            })
        })
    }

    // Submit function that calls all the 3 search result
    const searchForImage = event => {
        event.preventDefault();
        if (!searchText) {
            setErrorMessage({
                error: true,
                message: 'Please enter a search word, i.e meat pie, cake...'
            });
            return false
        }
        firstSearchResult();
        secondSearchResult();
        thirdSearchResult();
    }

    // Clears any error in the state
    const clearUserErrorMessage = () => {
        setErrorMessage({
            error: false,
            message: ''
        })
    }

    // General search text for all API's
    const createUpdateSearch = event => {
        setSearchText(event.target.value)
    }

    // Open and close modal function
    const openCloseModal = (open, imageUrl, description) => {
        setModal({
            open: open,
            imageUrl: imageUrl,
            description: description
        })
    }

    // Function to load an image
    const loadImage = () => {
        imageLoading.current.style.display = 'none';
        imageLoaded.current.style.display = 'block';
    }

    // A function that closes up full image view
    const closeModalOnEscapeKey = event => {
        if (event.key === 'Escape') {
            openCloseModal(false, '', '')
        }
    }

    // A function that closes up dialogs for error
    const closeErrorDialog = event => {
        if (event.key === 'Escape') {
            setErrorMessage({
                error: false,
                message: ''
            })
        }
    }

    return (
        <div>
            <div style={{ paddingTop: '2rem' }}>
                {/* User search form */}
                <form onSubmit={searchForImage}>
                    <TextInput
                        textValue={searchText}
                        TextFieldOnchange={createUpdateSearch}
                    />
                </form>

                {/* Tab controls */}
                <div style={{
                    display: 'flex',
                    width: '100%',
                    marginTop: '28px'
                }}>
                    <div
                        onClick={() => switchResultPane(1)}
                        ref={firstResultTab}
                        style={{
                            padding: '15px',
                            cursor: 'pointer'
                        }}
                        id="active"
                        className="tabs"
                    >
                        Pixabay
                        </div>
                    <div
                        onClick={() => switchResultPane(2)}
                        ref={secondResultTab}
                        style={{
                            padding: '15px',
                            cursor: 'pointer',
                            marginLeft: '20px'
                        }}
                        id=""
                        className="tabs"
                    >
                        Unsplash
                    </div>
                    <div
                        onClick={() => switchResultPane(3)}
                        ref={thirdResultTab}
                        style={{
                            marginLeft: '20px',
                            padding: '15px',
                            cursor: 'pointer'
                        }}
                        id=""
                        className="tabs"
                    >
                        Pexels
                    </div>
                </div>

                {/* Pane container */}
                <div>
                    <div ref={firstResultPanel}>
                        {/* Image section */}
                        <div style={{ marginTop: '3rem' }}>
                            {
                                firstResult.length === 0 ? (
                                    <h2 style={{ color: '#4e4e4e' }}>
                                        No Results yet!
                                        {firstResultError.isError && (
                                            <div style={{ marginTop: '35px' }}>
                                                <ErrorAlert errorMessage={firstResultError.errorMessage} />
                                            </div>
                                        )}
                                    </h2>
                                ) : (
                                    <div>
                                        {firstResultError.isError && (
                                            <div style={{ marginTop: '35px' }}>
                                                <ErrorAlert errorMessage={firstResultError.errorMessage} />
                                            </div>
                                        )}
                                        <SectionOne
                                            openCloseModal={openCloseModal}
                                            sectionName="Pixabay"
                                            pixData={firstResult}
                                        />
                                    </div>
                                )
                            }

                        </div>
                    </div>
                    <div className="hide" ref={secondResultPanel}>
                        <div style={{ marginTop: '3rem' }}>
                            {
                                firstResult.length === 0 ? (
                                    <h2 style={{ color: '#4e4e4e' }}>
                                        No Results yet!
                                        {secondResultError.isError && (
                                            <div style={{ marginTop: '35px' }}>
                                                <ErrorAlert errorMessage={secondResultError.errorMessage} />
                                            </div>
                                        )}
                                    </h2>
                                ) : (
                                    <div>
                                        {secondResultError.isError && (
                                            <div style={{ marginTop: '35px' }}>
                                                <ErrorAlert errorMessage={secondResultError.errorMessage} />
                                            </div>
                                        )}
                                        <SectionTwo
                                            openCloseModal={openCloseModal}
                                            sectionName="Unsplash"
                                            pixData={secondResult}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="hide" ref={thirdResultPanel}>
                        <div style={{ marginTop: '3rem' }}>
                            {
                                firstResult.length === 0 ? (
                                    <h2 style={{ color: '#4e4e4e' }}>
                                        No Results yet!
                                        {thirdResultError.isError && (
                                            <div style={{ marginTop: '35px' }}>
                                                <ErrorAlert errorMessage={thirdResultError.errorMessage} />
                                            </div>
                                        )}
                                    </h2>
                                ) : (
                                    <div>
                                        {thirdResultError.isError && (
                                            <div style={{ marginTop: '35px' }}>
                                                <ErrorAlert errorMessage={thirdResultError.errorMessage} />
                                            </div>
                                        )}
                                        <SectionThree
                                            openCloseModal={openCloseModal}
                                            sectionName="Pexels"
                                            pixData={thirdResult}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Large image display modal */}
            <Modal isOpen={modal.open} onKeyDown={closeModalOnEscapeKey}>
                <div className={classes.modalBox}>
                    <div className={classes.modalBoxHead}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '95%' }}>
                                <h2
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
                                >
                                    Full View
                                </h2>
                            </div>
                            <IconButton
                                onClick={() => openCloseModal(false, '', '')}
                                style={{ color: 'white' }}
                            >
                                <Close />
                            </IconButton>
                        </div>
                    </div>
                    <div ref={imageLoading} style={{ background: 'white', paddingTop: '25px', paddingBottom: '35px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '18px' }}>
                            <div style={{ display: 'flex', fontWeight: 'bold' }}>
                                <Loader /> <div style={{ margin: '8px 18px' }}>Loading....</div>
                            </div>
                        </div>
                    </div>
                    <div ref={imageLoaded} className="hide">
                        <img
                            src={modal.imageUrl}
                            alt="Weaverbell shots"
                            style={{ width: '100%' }}
                            onContextMenu={event => event.preventDefault()}
                            onLoad={loadImage}
                        />
                    </div>
                </div>
            </Modal>
            {/* Request loader */}
            <Dialog isOpen={loading}>
                <div style={{ display: 'flex' }}>
                    <Loader /> <span
                        style={{
                            fontSize: '25px',
                            marginLeft: '18px',
                            marginTop: '6px',
                            paddingBottom: '15px',
                            color: '#4e4e4e'
                        }}>Fetching data...</span>
                </div>
            </Dialog>
            {/* Error message loader */}
            <Dialog isOpen={errorMessage.error} onKeyDown={closeErrorDialog}>
                <div>
                    <h3 style={{ color: 'orangered', fontWeight: 'bold' }}>
                        {errorMessage.message}
                    </h3>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '12px',
                    paddingBottom: '15px'
                }}>
                    <Button
                        onClick={clearUserErrorMessage}
                        buttonBackground="orangered"
                        buttonColor="white"
                        label="Close"
                        btnType="button"
                    />
                </div>
            </Dialog>
        </div>
    )
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home);