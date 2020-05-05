import axios from 'axios';

import { Article, Category, Order } from './types';
import CONSTANTS from './constants';

const baseApiUrl = `http://localhost:8888/api/${CONSTANTS.API_VERSION}`;

export const API = {
    // articles
    addArticle: async (article: Article) => {
        let addedArticle: Article | null = null;
        try {
            const responseArticle = await axios.post(`${baseApiUrl}/articles/add`, article);
            addedArticle = responseArticle.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return addedArticle;
    },
    deleteArticle: async (article: Article) => {
        let deletedArticleId: string | null = null;
        try {
            const responseArticle = await axios.post(`${baseApiUrl}/articles/delete`, article);
            deletedArticleId = responseArticle.data && responseArticle.data._id;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return deletedArticleId;
    },
    updateArticle: async (article: Article) => {
        let updatedArticle: Article | null = null;
        try {
            const responseArticle = await axios.post(`${baseApiUrl}/articles/update`, article);
            updatedArticle = responseArticle.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return updatedArticle;
    },
    getArticles: async () => {
        let articles: Article[] = [];
        try {
            const responseArticle = await axios.get(`${baseApiUrl}/articles`);
            articles = responseArticle.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return articles;
    },

    // categories
    addCategory: async (category: Category) => {
        let addedCategory: Category | null = null;
        try {
            const responseCategory = await axios.post(`${baseApiUrl}/categories/add`, category);
            addedCategory = responseCategory.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return addedCategory;
    },
    deleteCategory: async (category: Category) => {
        let deletedCategoryId: string | null = null;
        try {
            const responseCategory = await axios.post(`${baseApiUrl}/categories/delete`, category);
            deletedCategoryId = responseCategory.data && responseCategory.data._id;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return deletedCategoryId;
    },
    updateCategory: async (category: Category) => {
        let updatedCategory: Category | null = null;
        try {
            const responseCategory = await axios.post(`${baseApiUrl}/categories/update`, category);
            updatedCategory = responseCategory.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return updatedCategory;
    },
    getCategories: async () => {
        let categories: Category[] = [];
        try {
            const responseCategories = await axios.get(`${baseApiUrl}/categories`);
            categories = responseCategories.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return categories;
    },

    // orders
    addOrder: async (order: Order) => {
        let addedOrder: Order | null = null;
        try {
            const responseOrder = await axios.post(`${baseApiUrl}/orders/add`, order);
            addedOrder = responseOrder.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return addedOrder;
    },
    deleteOrder: async (order: Order) => {
        let deletedOrderId: string | null = null;
        try {
            const responseOrder = await axios.post(`${baseApiUrl}/orders/delete`, order);
            deletedOrderId = responseOrder.data && responseOrder.data._id;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return deletedOrderId;
    },
    updateOrder: async (order: Order) => {
        let updatedOrder: Order | null = null;
        try {
            const responseOrder = await axios.post(`${baseApiUrl}/orders/update`, order);
            updatedOrder = responseOrder.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return updatedOrder;
    },
    getOrders: async () => {
        let orders: Order[] = [];
        try {
            const responseOrders = await axios.get(`${baseApiUrl}/orders`);
            orders = responseOrders.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return orders;
    }
};

export default API;
