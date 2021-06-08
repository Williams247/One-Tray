import Description from '../components/Description';
const About = () => {
    const openLinkInNewTab = url => {
        window.open(url)
    }
    return (
        <div>
            <div style={{ marginTop: '108px' }}>
                <Description
                    label="About us"
                    underline={true}
                />
                <div style={{ marginTop: '38px' }}>
                    <h2>OneTray helps you crawl Pexels, Unsplash and Pixabay in one single page so you don't have to spen much time combining through totally free images.</h2>
                    <h2 style={{marginTop: '45px'}}>
                        Made with love x 
                        <span
                            onClick={() => openLinkInNewTab('https://github.com/Williams247')}
                            style={{ cursor: 'pointer', marginLeft: '8px' }}
                            title="Click here"
                        >
                            Williams
                        </span> 
                        <span
                            onClick={() => openLinkInNewTab(' https://twitter.com/obiokeke_')}
                            style={{ cursor: 'pointer', marginLeft: '8px' }}
                            title="Click here"
                        >
                             x
                            Daniel
                        </span> 
                    </h2>
                    <h2>
                        &copy; Weaverbell 2021
                    </h2>
                </div>
            </div>
        </div>
    )
};

export default About;
