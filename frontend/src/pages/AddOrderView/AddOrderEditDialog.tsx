import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Article, OrderItem } from '../../common/types';

interface State {
    open: boolean;
    setOpen: Function;
    setItem: Function;
    articles: Article[];
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

const AddOrderEditDialog = ({ open, setOpen, articles, setItem }: State) => {
    const classes = useStyles();

    // dialog form states
    const [selectedArticle, setSelectedArticle] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    // click handlers
    const handleConfirm = () => {
        const orderItem: OrderItem = {
            article: selectedArticle,
            quantity
        };
        setItem(orderItem);
        setQuantity(1);
        setSelectedArticle('');
        setOpen(false);
    };

    // input validation
    const handleQuantityChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const quantityValue = parseInt(event.target.value) || 0
        setQuantity(Math.max(quantityValue, 0));
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Article</DialogTitle>
            <DialogContent>
                <form className={classes.formContainer}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="article-select-label">Article</InputLabel>
                        <Select
                            labelId="article-select-label"
                            id="article-select"
                            value={selectedArticle}
                            onChange={event => setSelectedArticle(String(event.target.value) || '')}
                            input={<Input />}
                        >
                            {articles.map(a => {
                                return (
                                    <MenuItem key={a._id} value={a._id}>
                                        {a.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Quantity"
                            id="article-quantity-label"
                            variant="outlined"
                            type="number"
                            onChange={handleQuantityChange}
                            value={quantity}
                        />
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleConfirm} variant="contained" color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// redux states
const mapStateToProps = ({ articles }: { articles: Article[] }) => {
    return {
        articles
    };
};

export default connect(mapStateToProps)(AddOrderEditDialog);
