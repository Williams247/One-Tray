import Modal from '@material-ui/core/Modal';

const AppModal = ({isOpen, children}) => {
    return (
        <Modal open={isOpen}
            style={{
                overflow: 'auto',
                paddingBottom: '33px'
            }}
        >
            {children}
        </Modal>
    )
};

export default AppModal;
