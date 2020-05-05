import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Article, Category } from '../../common/types';

interface State {
    article: Article;
    category: Category | null;
    quantity: number;
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
    }
}));

const OrderItemCard = ({ article, category, quantity }: State) => {
    const classes = useStyles();

    if (!article) {
        return null;
    }

    return (
        <Card key={article._id} className={classes.cardRoot}>
            <CardContent>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={10}>
                        <Typography variant="h6" component="h2">
                            {article.name}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {article.price}€
                        </Typography>
                        <Chip size="small" label={category && category.name && category.name.toUpperCase()} />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="h2">
                            x {quantity}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrderItemCard;
