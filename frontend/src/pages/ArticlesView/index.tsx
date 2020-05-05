import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import Files from 'react-files';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import API from '../../common/api';
import { Article, Category } from '../../common/types';
import ArticleCard from './ArticleCard';
import ArticleCardMenu from './ArticleCardMenu';
import ArticleEditDialog from './ArticleEditDialog';
import { ArticleActionTypes, ArticleAction, CategoryActionTypes, CategoryAction } from '../../store/actions';

interface State {
    articles: Article[];
    categories: Category[];
    addArticle: Function;
    importArticles: Function;
}

const ArticleView = ({ articles, categories, addArticle, importArticles }: State) => {
    // dialog states
    const [openDialog, setOpenDialog] = useState(false);

    // click handlers
    const handleAddArticle = (articleUpdate: Article) => {
        addArticle(articleUpdate);
        setOpenDialog(false);
    };

    const handleFileUpload = (files: any) => {
        if (files && files.length > 0) {

            // read csv upload and send string content to backend
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const content = e.target.result;
                importArticles(content);
            };
            reader.readAsText(file);
        } else {
            console.log('No file uploaded');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={4} style={{ display: 'flex', width: '100%' }}>
                <Button onClick={() => setOpenDialog(true)} variant="contained" color="secondary">
                    <AddIcon />
                </Button>
                <ArticleEditDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    article={{ name: '', price: 0.0 }}
                    setArticle={handleAddArticle}
                />
                <Files
                    clickable
                    accepts={['text/csv']}
                    maxFileSize={10000000}
                    minFileSize={0}
                    multiple={false}
                    onChange={handleFileUpload}
                    onError={(e: any) => {
                        console.log(e);
                    }}
                    style={{ marginLeft: 10 }}
                >
                    <Button variant="contained" color="secondary">
                        Import CSV
                    </Button>
                </Files>
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
        },
        importArticles: async (csvContent: string) => {
            const newData = await API.importArticles(csvContent);
            if (newData) {
                dispatch<ArticleAction>({ type: ArticleActionTypes.ARTICLES, value: newData.articles });
                dispatch<CategoryAction>({ type: CategoryActionTypes.CATEGORIES, value: newData.categories });
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView);
