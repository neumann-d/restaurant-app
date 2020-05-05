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
            if (responseArticle.data.error) {
                throw new Error(responseArticle.data.error);
            }
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
            if (responseArticle.data.error) {
                throw new Error(responseArticle.data.error);
            }
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
            if (responseArticle.data.error) {
                throw new Error(responseArticle.data.error);
            }
            updatedArticle = responseArticle.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return updatedArticle;
    },
    importArticles: async (csvContent: string) => {
        let addedData: { articles: Article[]; categories: Category[] } | null = null;
        try {
            const responseArticle = await axios.post(`${baseApiUrl}/articles/import`, { data: csvContent });
            if (responseArticle.data.error) {
                throw new Error(responseArticle.data.error);
            }
            addedData = responseArticle.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return addedData;
    },
    getArticles: async () => {
        let articles: Article[] = [];
        try {
            const responseArticles = await axios.get(`${baseApiUrl}/articles`);
            if (responseArticles.data.error) {
                throw new Error(responseArticles.data.error);
            }
            articles = responseArticles.data;
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
            if (responseCategory.data.error) {
                throw new Error(responseCategory.data.error);
            }
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
            if (responseCategory.data.error) {
                throw new Error(responseCategory.data.error);
            }
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
            if (responseCategory.data.error) {
                throw new Error(responseCategory.data.error);
            }
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
            if (responseCategories.data.error) {
                throw new Error(responseCategories.data.error);
            }
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
            if (responseOrder.data.error) {
                throw new Error(responseOrder.data.error);
            }
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
            if (responseOrder.data.error) {
                throw new Error(responseOrder.data.error);
            }
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
            if (responseOrder.data.error) {
                throw new Error(responseOrder.data.error);
            }
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
            if (responseOrders.data.error) {
                throw new Error(responseOrders.data.error);
            }
            orders = responseOrders.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
        return orders;
    }
};

export default API;
