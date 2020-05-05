import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import API from '../../common/api';
import { Article, Category } from '../../common/types';
import ArticleCard from './ArticleCard';
import ArticleCardMenu from './ArticleCardMenu';
import ArticleEditDialog from './ArticleEditDialog';
import { ArticleActionTypes, ArticleAction } from '../../store/actions';

interface State {
    articles: Article[];
    categories: Category[];
    addArticle: Function;
}

const ArticleView = ({ articles, categories, addArticle }: State) => {

    // dialog states
    const [openDialog, setOpenDialog] = useState(false);

    // click handlers
    const handleAddArticle = (articleUpdate: Article) => {
        addArticle(articleUpdate);
        setOpenDialog(false);
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Button onClick={() => setOpenDialog(true)} variant="contained" color="secondary">
                    <AddIcon />
                </Button>
                <ArticleEditDialog open={openDialog} setOpen={setOpenDialog} article={{ name: '', price: 0.0 }} setArticle={handleAddArticle} />
            </Box>
            <Box my={4}>
                {articles.map(article => {
                    const menu = <ArticleCardMenu article={article} />;
                    const category = categories.find(category => category._id === article.category) || null;
                    return <ArticleCard key={article._id} article={article} menu={menu} category={category} />;
                })}
            </Box>
        </Container>
    );
};

// redux states
const mapStateToProps = ({ articles, categories }: State) => {
    return {
        articles,
        categories
    };
};

// redux actions
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addArticle: async (article: Article) => {
            const newArticle = await API.addArticle(article);
            if (newArticle) {
                dispatch<ArticleAction>({ type: ArticleActionTypes.ADD_ARTICLE, value: [newArticle] });
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
