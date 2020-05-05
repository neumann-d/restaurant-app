import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

import { Article, Category, Order } from '../../common/types';
import OrderItemCard from './OrderItemCard';

interface State {
    order: Order;
    articles: Article[];
    categories: Category[];
    menu: JSX.Element | null;
}

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(1),
        height: '6ch',
        width: '6ch'
    },
    cardRoot: {
        minWidth: 275,
        marginBottom: theme.spacing(2),
        fontSize: 14
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200
    },
    progressWrapper: {
        position: 'relative'
    },
    progressValue: {
        position: 'absolute',
        top: '10px',
        left: '6px',
        fontSize: 12
    },
    itemBox: {
        width: '100%'
    }
}));

const OrderCard = ({ menu, order, articles, categories }: State) => {
    const classes = useStyles();

    return (
        <ExpansionPanel key={order._id} className={classes.cardRoot}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={11}>
                        <Typography variant="h6" component="h2">
                            Order {order._id}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {order.total_price}€
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {menu}
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Box my={1} className={classes.itemBox}>
                    {order.items.map(item => {
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
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default OrderCard;
