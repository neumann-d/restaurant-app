import { combineReducers } from 'redux';
import lodash from 'lodash';

import { Article, Category, Order } from '../common/types';
import {
    ArticleAction,
    ArticleActionTypes,
    CategoryAction,
    CategoryActionTypes,
    OrderAction,
    OrderActionTypes
} from './actions';

// TODO: better use Immutable.JS objects for state updates
const articleReducer = (articles: Article[] = [], action: ArticleAction) => {
    switch (action.type) {
        case ArticleActionTypes.ADD_ARTICLE:
            if (action.value.length > 0) {
                const newArticles = lodash.cloneDeep(articles);
                newArticles.push(action.value[0]);
                return newArticles;
            }
            break;
        case ArticleActionTypes.DELETE_ARTICLE:
            if (action.value.length > 0) {
                const { _id } = action.value[0];
                if (_id) {
                    const newArticles = lodash.cloneDeep(articles);
                    return newArticles.filter(article => article._id !== _id);
                }
            }
            break;
        case ArticleActionTypes.UPDATE_ARTICLE:
            if (action.value.length > 0 && action.value[0]._id) {
                const newArticle = action.value[0];
                const newArticles = lodash.cloneDeep(articles);
                const idx = newArticles.findIndex(article => article._id === newArticle._id);
                newArticles[idx] = newArticle;
                return newArticles;
            }
            break;
        case ArticleActionTypes.ARTICLES:
            return action.value;
    }
    return articles;
};

const categoryReducer = (categories: Category[] = [], action: CategoryAction) => {
    switch (action.type) {
        case CategoryActionTypes.ADD_CATEGORY:
            if (action.value.length > 0) {
                const newCategories = lodash.cloneDeep(categories);
                newCategories.push(action.value[0]);
                return newCategories;
            }
            break;
        case CategoryActionTypes.DELETE_CATEGORY:
            if (action.value.length > 0) {
                const { _id } = action.value[0];
                if (_id) {
                    const newCategories = lodash.cloneDeep(categories);
                    return newCategories.filter(category => category._id !== _id);
                }
            }
            break;
        case CategoryActionTypes.UPDATE_CATEGORY:
            if (action.value.length > 0 && action.value[0]._id) {
                const newCategory = action.value[0];
                const newCategories = lodash.cloneDeep(categories);
                const idx = newCategories.findIndex(category => category._id === newCategory._id);
                newCategories[idx] = newCategory;
                return newCategories;
            }
            break;
        case CategoryActionTypes.CATEGORIES:
            return action.value;
    }
    return categories;
};

const orderReducer = (orders: Order[] = [], action: OrderAction) => {
    switch (action.type) {
        case OrderActionTypes.ADD_ORDER:
            if (action.value.length > 0) {
                const newOrders = lodash.cloneDeep(orders);
                newOrders.push(action.value[0]);
                return newOrders;
            }
            break;
        case OrderActionTypes.DELETE_ORDER:
            if (action.value.length > 0) {
                const { _id } = action.value[0];
                if (_id) {
                    const newOrders = lodash.cloneDeep(orders);
                    return newOrders.filter(order => order._id !== _id);
                }
            }
            break;
        case OrderActionTypes.UPDATE_ORDER:
            if (action.value.length > 0 && action.value[0]._id) {
                const newOrder = action.value[0];
                const newOrders = lodash.cloneDeep(orders);
                const idx = newOrders.findIndex(order => order._id === newOrder._id);
                newOrders[idx] = newOrder;
                return newOrders;
            }
            break;
        case OrderActionTypes.ORDERS:
            return action.value;
    }
    return orders;
};

const rootReducer = combineReducers({ articles: articleReducer, categories: categoryReducer, orders: orderReducer });

export default rootReducer;
