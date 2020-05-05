import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import API from '../../common/api';
import { Article } from '../../common/types';
import { ArticleActionTypes, ArticleAction } from '../../store/actions';
import ArticleEditDialog from './ArticleEditDialog';

interface State {
    article: Article;
    deleteArticle: Function;
    updateArticle: Function;
}

const ArticleCardMenu = ({ article, deleteArticle, updateArticle }: State) => {
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
        deleteArticle(article);
        handleCloseMenu();
    };

    const handleEdit = (articleUpdate: Article) => {
        updateArticle(articleUpdate);
        handleCloseMenu();
    };

    return (
        <>
            <IconButton aria-label="more" aria-controls="article-menu" aria-haspopup="true" onClick={handleClickMenu}>
                <MoreHorizIcon />
            </IconButton>
            <Menu id="article-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={() => setOpenDialog(true)}>Edit</MenuItem>
                <ArticleEditDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    article={article}
                    setArticle={handleEdit}
                />
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

// redux actions
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        deleteArticle: async (article: Article) => {
            const deletedArticleId = await API.deleteArticle(article);
            if (deletedArticleId) {
                dispatch<ArticleAction>({ type: ArticleActionTypes.DELETE_ARTICLE, value: [article] });
            }
        },
        updateArticle: async (article: Article) => {
            const updatedArticle = await API.updateArticle(article);
            if (updatedArticle && updatedArticle._id) {
                dispatch<ArticleAction>({ type: ArticleActionTypes.UPDATE_ARTICLE, value: [updatedArticle] });
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(ArticleCardMenu);
