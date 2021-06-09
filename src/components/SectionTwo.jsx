import Description from './Description';
import Card from './Card';

const Section = ({ pixData, sectionName, openCloseModal }) => {
    return (
        <div>
            <div style={{ color: '#4e4e4e' }}>
                <Description
                    label={sectionName}
                />
            </div>

            <div style={{
                width: '100%',
                height: '3px',
                background: '#4e4e4e',
                marginTop: '8px',
                marginBottom: '35px'
            }}>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {
                    pixData.map((data, index) => {
                        return (
                            <Card
                                pixFrom="Unsplash-image"
                                image={data.urls.full}
                                key={index}
                                openCloseModal={openCloseModal}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Section;