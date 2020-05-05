import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose, { Types } from 'mongoose';

import Article, { IArticle } from './models/Article';
import Category, { ICategory } from './models/Category';
import Order, { IOrder } from './models/Order';

const app = express();
const port = 8888; // default port to listen
const apiVersion = 'v1';

// enable cores (only needed for development where fronted is running on localhost:3000 and backend on localhost:8888)
app.use(cors());
app.use(bodyParser.json()); // parse application/json

// connect to database
(async () => {
    await mongoose.connect('mongodb://db/restaurant_app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
})();

// define REST API
app.get(`/api/${apiVersion}/articles`, async (_, res) => {
    try {
        const articles = await Article.find({});
        res.send(articles);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/articles/add`, async (req, res) => {
    try {
        const article: IArticle = new Article();
        article.name = String(req.body.name);
        article.price = Number(req.body.price);
        if (req.body.category) {
            article.category = new mongoose.Types.ObjectId(req.body.category);
        }
        await article.save();
        res.send(article);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/articles/delete`, async (req, res) => {
    try {
        const article = await Article.findById(req.body._id);
        await article.remove();
        res.send({ _id: req.body._id });
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/articles/update`, async (req, res) => {
    try {
        const article = await Article.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.send(article);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.get(`/api/${apiVersion}/categories`, async (_, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/categories/add`, async (req, res) => {
    try {
        const category: ICategory = new Category();
        category.name = String(req.body.name);
        await category.save();
        res.send(category);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/categories/delete`, async (req, res) => {
    try {
        const category = await Category.findById(req.body._id);
        await category.remove();
        res.send({ _id: req.body._id });
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/categories/update`, async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
        res.send(category);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.get(`/api/${apiVersion}/orders`, async (_, res) => {
    try {
        const orders = await Order.find({});
        res.send(orders);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/orders/add`, async (req, res) => {
    try {
        const items: IOrder['items'] = req.body.items;
        const totalPrice = await items.reduce(async (acc: Promise<number>, curr: { article: Types.ObjectId; quantity: number }) => {
            const accumulator = await acc;
            const article = await Article.findById(curr.article);
            return accumulator + curr.quantity * article.price;
        }, Promise.resolve(0));
        const order: IOrder = new Order();
        order.items = items;
        order.total_price = totalPrice;
        await order.save();
        res.send(order);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/orders/delete`, async (req, res) => {
    try {
        const order = await Order.findById(req.body._id);
        await order.remove();
        res.send({ _id: req.body._id });
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

app.post(`/api/${apiVersion}/orders/update`, async (req, res) => {
    try {
        const items: IOrder['items'] = req.body.items;
        const totalPrice = await items.reduce(async (acc: Promise<number>, curr: { article: Types.ObjectId; quantity: number }) => {
            const accumulator = await acc;
            const article = await Article.findById(curr.article);
            return accumulator + curr.quantity * article.price;
        }, Promise.resolve(0));
        const orderUpdate = {
            _id: req.body._id,
            items,
            total_price: totalPrice
        };
        const order = await Order.findOneAndUpdate({ _id: req.body._id }, orderUpdate, { new: true });
        res.send(order);
    } catch (e) {
        res.send({ error: `${e}` });
    }
});

// start the Express server
app.listen(port, () => {
    console.log(`🚀 server started at http://localhost:${port}`);
});
