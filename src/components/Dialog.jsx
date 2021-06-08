import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
const AppDialog = ({ children, isOpen }) => {
    return (
        <Dialog open={isOpen}>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
};

export default AppDialog