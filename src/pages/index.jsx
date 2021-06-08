import { useState, useRef } from 'react';
import { createClient } from 'pexels';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextInput from '../components/TextInput';
import SectionOne from '../components/SectionOne';
import SectionTwo from '../components/SectionTwo';
import SectionThree from '../components/SectionThree';
import Modal from '../components/Modal';
import Dialog from '../components/Dialog';
import Loader from '../components/Loader';
import Button from '../components/Button';

// Styles
const styles = () => ({
    modalBox: {
        width: '90%',
        marginLeft: '5%',
        background: 'white',
        marginTop: '25px'
    },
    modalBoxHead: {
        background: '#4e4e4e',
        paddingTop: '12px',
        paddingBottom: '15px',
        textIndent: '15px'
    }
});

const Home = ({ classes }) => {
    // States
    const [searchText, setSearchText] = useState('');
    const [firstResult, setFirstResult] = useState([]);
    const [secondResult, setSecondResult] = useState([]);
    const [thirdResult, setThirdResult] = useState([]);
    const [loading, setLoading] = useState(false);

    // Refs for pane
    const firstResultPanel = useRef();
    const secondResultPanel = useRef();
    const thirdResultPanel = useRef();

    // Refs for tabs
    const firstResultTab = useRef();
    const secondResultTab = useRef();
    const thirdResultTab = useRef();

    const [errorMessage, setErrorMessage] = useState({
        error: false,
        message: ''
    });

    const [modal, setModal] = useState({
        open: false,
        imageUrl: '',
        description: ''
    });

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

        try {
            const getFirstSearchResult = await Axios.get(`https://pixabay.com/api/?key=21875002-1ad64de0d03b15dae54da65fa&q=${searchText.toLocaleLowerCase()}&image_type=photo`);
            setLoading(false);
            const { data: { hits } } = getFirstSearchResult;

            console.log('From 1st API')
            console.log(hits);
            setFirstResult(hits);

        } catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMessage({
                error: true,
                message: 'Failed to get results'
            });
        }
    }

    // Function to get results for the second image pane
    const secondSearchResult = async () => {
        // API for unsplash
        setLoading(true);

        try {
            const getSecondSearchResult = await Axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${searchText.toLocaleLowerCase()}&client_id=O0YGcWeNQDPcpP7014RI8tg7fT5tC_jxLuWHIDd1P7U`);
            console.log('Second search result');
            setLoading(false);
            const { data: { results } } = getSecondSearchResult;
            console.log('From 2nd API')
            console.log(results);
            setSecondResult(results)

        } catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMessage({
                error: true,
                message: 'Failed to get results'
            });
        }
    }

    // Function to get result from the third image pane
    const thirdSearchResult = () => {
        const client = createClient('563492ad6f917000010000010493a61d43dc44de86bf06a75f749a95');
        client.photos.search({
            query: searchText.toLocaleLowerCase(),
            per_page: 50
        }).then(response => {
            console.log('From 3rd API');
            const { photos } = response;
            console.log(photos)
            setThirdResult(photos);
        });

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
                        1st Result
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
                        2nd Result
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
                        3rd Result
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
                                    </h2>
                                ) : (
                                    <SectionOne
                                        openCloseModal={openCloseModal}
                                        sectionName="1st Result"
                                        pixData={firstResult}
                                    />
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
                                    </h2>
                                ) : (
                                    <SectionTwo
                                        openCloseModal={openCloseModal}
                                        sectionName="2nd Result"
                                        pixData={secondResult}
                                    />
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
                                    </h2>
                                ) : (
                                    <SectionThree
                                        openCloseModal={openCloseModal}
                                        sectionName="3rd Result"
                                        pixData={thirdResult}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Large image display modal */}
            <Modal isOpen={modal.open}>
                <div className={classes.modalBox}>
                    <div className={classes.modalBoxHead}>
                        <div>
                            <div style={{ width: '95%' }}>
                                <Typography
                                    variant="h5"
                                    style={{
                                        fontWeight: 'bold',
                                        paddingTop: '9px',
                                        color: 'white'
                                    }}>
                                    Full view
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <img
                        src={modal.imageUrl}
                        alt="Weaverbell shots"
                        style={{ width: '100%' }}
                        onContextMenu={event => event.preventDefault()}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '12px'
                    }}>
                        <Button
                            onClick={() => openCloseModal(false, '', '')}
                            buttonBackground="#4e4e4e"
                            buttonColor="white"
                            label="Close"
                            btnType="button"
                        />
                    </div>
                    <br />
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
            <Dialog isOpen={errorMessage.error}>
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