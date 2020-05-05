import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import API from '../../common/api';
import { Article, Category, Order, OrderItem } from '../../common/types';
import OrderItemCard from '../OrdersView/OrderItemCard';
import AddOrderEditDialog from './AddOrderEditDialog';
import { OrderAction, OrderActionTypes } from '../../store/actions';

interface State {
    articles: Article[];
    categories: Category[];
    addOrder: Function;
}

const AddOrderView = ({ articles, categories, addOrder }: State) => {
    // order items state
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

    // dialog states
    const [openDialog, setOpenDialog] = useState(false);

    // click handlers
    const handleAddItem = (item: OrderItem) => {
        const newOrderItems = [...orderItems];
        
        // if item is already in the list, update quantity only
        const idx = newOrderItems.findIndex(i => i.article === item.article)
        if (idx >= 0) {
            newOrderItems[idx].quantity += item.quantity;
        } else {
            newOrderItems.push(item);
        }

        setOrderItems(newOrderItems);
        setOpenDialog(false);
    };

    const handlePlaceOrder = () => {
        if (orderItems.length > 0) {
            const order: Order = {
                items: orderItems,
                total_price: 0
            };
            addOrder(order);
            setOrderItems([]);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Button onClick={() => setOpenDialog(true)} variant="contained" color="primary">
                    <AddIcon />
                </Button>
                <AddOrderEditDialog open={openDialog} setOpen={setOpenDialog} setItem={handleAddItem} />
                <Button
                    style={{ marginLeft: 10 }}
                    onClick={handlePlaceOrder}
                    variant="contained"
                    color="primary"
                    disabled={orderItems.length === 0}
                >
                    Place Order
                </Button>
            </Box>
            <Box my={4}>
                {orderItems.map(item => {
                    const article = articles.find(article => article._id === item.article) || null;
                    if (article) {
                        const category = categories.find(category => category._id === article.category) || null;
                        return (
                            <OrderItemCard
                                key={article._id}
                                article={article}
                                category={category}
                                quantity={item.quantity}
                            />
                        );
                    }
                    return null;
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
        addOrder: async (order: Order) => {
            const newOrder = await API.addOrder(order);
            if (newOrder) {
                dispatch<OrderAction>({ type: OrderActionTypes.ADD_ORDER, value: [newOrder] });
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrderView);
