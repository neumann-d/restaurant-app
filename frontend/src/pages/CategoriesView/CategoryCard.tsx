import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Category } from '../../common/types';

interface State {
    category: Category;
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
    }
}));

const CategoryCard = ({ menu, category }: State) => {
    const classes = useStyles();

    return (
        <Card key={category._id} className={classes.cardRoot}>
            <CardContent>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={11}>
                        <Typography variant="h6" component="h2">
                            {category.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {menu}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;
