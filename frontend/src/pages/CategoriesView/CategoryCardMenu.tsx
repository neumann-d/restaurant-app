import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import API from '../../common/api';
import { Category } from '../../common/types';
import { CategoryAction, CategoryActionTypes } from '../../store/actions';
import CategoryEditDialog from './CategoryEditDialog';

interface State {
    category: Category;
    deleteCategory: Function;
    updateCategory: Function;
}

const CategoryCardMenu = ({ category, deleteCategory, updateCategory }: State) => {
    // menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // dialog state
    const [openDialog, setOpenDialog] = useState(false);

    // click handlers
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        deleteCategory(category);
        handleCloseMenu();
    };

    const handleEdit = (categoryUpdate: Category) => {
        updateCategory(categoryUpdate);
        handleCloseMenu();
    };

    return (
        <>
            <IconButton aria-label="more" aria-controls="article-menu" aria-haspopup="true" onClick={handleClickMenu}>
                <MoreHorizIcon />
            </IconButton>
            <Menu id="article-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={() => setOpenDialog(true)}>Edit</MenuItem>
                <CategoryEditDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    category={category}
                    setCategory={handleEdit}
                />
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

// redux actions
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        deleteCategory: async (category: Category) => {
            const deletedCategoryId = await API.deleteCategory(category);
            if (deletedCategoryId) {
                dispatch<CategoryAction>({ type: CategoryActionTypes.DELETE_CATEGORY, value: [category] });
            }
        },
        updateCategory: async (category: Category) => {
            const updatedCategory = await API.updateCategory(category);
            if (updatedCategory && updatedCategory._id) {
                dispatch<CategoryAction>({ type: CategoryActionTypes.UPDATE_CATEGORY, value: [updatedCategory] });
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(CategoryCardMenu);
