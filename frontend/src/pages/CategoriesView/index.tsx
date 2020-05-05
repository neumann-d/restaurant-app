import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import API from '../../common/api';
import { Category } from '../../common/types';
import CategoryCard from './CategoryCard';
import CategoryCardMenu from './CategoryCardMenu';
import CategoryEditDialog from './CategoryEditDialog';
import { CategoryAction, CategoryActionTypes } from '../../store/actions';

interface State {
    categories: Category[];
    addCategory: Function;
}

const CategoriesView = ({ categories, addCategory }: State) => {

    // dialog states
    const [openDialog, setOpenDialog] = useState(false);

    // click handlers
    const handleAddCategory = (categoryUpdate: Category) => {
        addCategory(categoryUpdate);
        setOpenDialog(false);
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Button onClick={() => setOpenDialog(true)} variant="contained" color="secondary">
                    <AddIcon />
                </Button>
                <CategoryEditDialog open={openDialog} setOpen={setOpenDialog} category={{ name: '' }} setCategory={handleAddCategory} />
            </Box>
            <Box my={4}>
                {categories.map(category => {
                    const menu = <CategoryCardMenu category={category} />;
                    return <CategoryCard key={category._id} category={category} menu={menu} />;
                })}
            </Box>
        </Container>
    );
};

// redux states
const mapStateToProps = ({ categories }: State) => {
    return {
        categories
    };
};

// redux actions
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addCategory: async (category: Category) => {
            const newCategory = await API.addCategory(category);
            if (newCategory) {
                dispatch<CategoryAction>({ type: CategoryActionTypes.ADD_CATEGORY, value: [newCategory] });
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesView);
