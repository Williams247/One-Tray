import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
const AppDialog = ({ children, isOpen, ...props }) => {
    return (
        <Dialog open={isOpen} {...props}>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
};

export default AppDialog