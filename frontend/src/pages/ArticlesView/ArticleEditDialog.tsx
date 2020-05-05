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

import { Article, Category } from '../../common/types';

interface State {
    open: boolean;
    setOpen: Function;
    article: Article;
    setArticle: Function;
    categories: Category[];
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

const ArticleEditDialog = ({ open, setOpen, article, setArticle, categories }: State) => {
    const classes = useStyles();

    // dialog form states
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>(article.name);
    const [price, setPrice] = useState<number>(article.price);

    if (article.category && !category) {
        setCategory(article.category);
    }

    // click handlers
    const handleConfirm = () => {
        const articleUpdate = {
            _id: article._id,
            name,
            price,
            category
        };
        setArticle(articleUpdate);
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Article</DialogTitle>
            <DialogContent>
                <form className={classes.formContainer}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Name"
                            id="article-name-label"
                            variant="outlined"
                            onChange={event => setName(event.target.value)}
                            value={name}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Price"
                            id="article-price-label"
                            variant="outlined"
                            type="number"
                            onChange={event => setPrice(Number(event.target.value))}
                            value={price}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="article-category-label">Category</InputLabel>
                        <Select
                            labelId="article-category-label"
                            id="article-category-select"
                            value={category}
                            onChange={event => setCategory(String(event.target.value) || '')}
                            input={<Input />}
                        >
                            {categories.map(c => {
                                return (
                                    <MenuItem key={c._id} value={c._id}>
                                        {c.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
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

// redux states
const mapStateToProps = ({ categories }: { categories: Category[] }) => {
    return {
        categories
    };
};

export default connect(mapStateToProps)(ArticleEditDialog);
