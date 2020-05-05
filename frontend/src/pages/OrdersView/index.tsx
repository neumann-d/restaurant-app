import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import React from 'react';
import { connect } from 'react-redux';

import { Article, Category, Order } from '../../common/types';
import OrderCard from './OrderCard';
import OrderCardMenu from './OrderCardMenu';

interface State {
    orders: Order[];
    articles: Article[];
    categories: Category[];
}

const OrdersView = ({ articles, categories, orders }: State) => {
    return (
        <Container maxWidth="sm">
            <Box my={4}>
                {orders.map(order => {
                    const menu = <OrderCardMenu order={order} />;
                    return (
                        <OrderCard
                            key={order._id}
                            order={order}
                            articles={articles}
                            categories={categories}
                            menu={menu}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};

// redux states
const mapStateToProps = ({ articles, categories, orders }: State) => {
    return {
        articles,
        categories,
        orders
    };
};

export default connect(mapStateToProps)(OrdersView);
