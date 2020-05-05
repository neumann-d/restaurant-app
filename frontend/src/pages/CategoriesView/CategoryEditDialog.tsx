import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';

import { Category } from '../../common/types';

interface State {
    open: boolean;
    setOpen: Function;
    category: Category;
    setCategory: Function;
}

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        height: '6ch',
        width: '6ch'
    },
    cardRoot: {
        minWidth: 275,
        marginBottom: theme.spacing(2),
        fontSize: 14
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        width: '100%'
    },
    progressWrapper: {
        position: 'relative'
    },
    progressValue: {
        position: 'absolute',
        top: '10px',
        left: '6px',
        fontSize: 12
    }
}));

const CategoryEditDialog = ({ open, setOpen, category, setCategory }: State) => {
    const classes = useStyles();

    // dialog form states
    const [name, setName] = useState<string>(category.name);

    // click handlers
    const handleConfirm = () => {
        const categoryUpdate = {
            _id: category._id,
            name
        };
        setCategory(categoryUpdate);
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Category</DialogTitle>
            <DialogContent>
                <form className={classes.formContainer}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Name"
                            id="category-name-label"
                            variant="outlined"
                            onChange={event => setName(event.target.value)}
                            value={name}
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleConfirm} variant="contained" color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default (CategoryEditDialog);
