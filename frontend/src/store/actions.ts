import { Article, Category, Order } from '../common/types';

export enum ArticleActionTypes {
    ARTICLES = 'ARTICLES',
    ADD_ARTICLE = 'ADD_ARTICLE',
    UPDATE_ARTICLE = 'UPDATE_ARTICLE',
    DELETE_ARTICLE = 'DELETE_ARTICLE'
}

export interface ArticleAction {
    type: ArticleActionTypes;
    value: Article[];
}

export enum CategoryActionTypes {
    CATEGORIES = 'CATEGORIES',
    ADD_CATEGORY = 'ADD_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY',
    DELETE_CATEGORY = 'DELETE_CATEGORY'
}

export interface CategoryAction {
    type: CategoryActionTypes;
    value: Category[];
}

export enum OrderActionTypes {
    ORDERS = 'ORDERS',
    ADD_ORDER = 'ADD_ORDER',
    UPDATE_ORDER = 'UPDATE_ORDER',
    DELETE_ORDER = 'DELETE_ORDER'
}

export interface OrderAction {
    type: OrderActionTypes;
    value: Order[];
}
