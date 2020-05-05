import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CategoryIcon from '@material-ui/icons/Category';
import CreateIcon from '@material-ui/icons/Create';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ViewListIcon from '@material-ui/icons/ViewList';
import React, { useState } from 'react';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';

import AddOrderView from './pages/AddOrderView';
import ArticlesView from './pages/ArticlesView';
import CategoriesView from './pages/CategoriesView';
import OrdersView from './pages/OrdersView';

const useStyles = makeStyles(theme => ({
    logoBox: {
        display: 'flex'
    },
    title: {
        marginLeft: theme.spacing(2)
    },
    tabs: {
        flexGrow: 1
    },
    tab: {
        color: theme.palette.primary.contrastText
    }
}));

const App = () => {
    const classes = useStyles();

    const pathName = (useLocation() || {}).pathname;
    const categoriesPath = '/categories';
    const articlesPath = '/articles';
    const ordersPath = '/orders';
    const addOrderPath = '/add-order';

    const calculateTabIndex = () => {
        switch (pathName) {
            case articlesPath:
                return 1;
            case ordersPath:
                return 2;
            case addOrderPath:
                return 3;
            default:
                return 0;
        }
    };

    const calculatedTabIndex = calculateTabIndex();
    const [tabIndex, setTabIndex] = useState(calculatedTabIndex);

    // tabIndex state may not up to date, when redirected from other component
    if (tabIndex !== calculatedTabIndex) {
        setTabIndex(calculatedTabIndex);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item md={4} xs={6} className={classes.logoBox}>
                            <Typography variant="h6" className={classes.title}>
                                Restaurant App
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={6}>
                            <Tabs
                                className={classes.tabs}
                                value={tabIndex}
                                onChange={(_, newValue) => setTabIndex(newValue)}
                                indicatorColor="secondary"
                                textColor="secondary"
                                centered
                            >
                                <Tab
                                    id="categories-tab"
                                    component={Link}
                                    to={categoriesPath}
                                    className={classes.tab}
                                    icon={<CategoryIcon />}
                                    label="Categories"
                                />
                                <Tab
                                    id="articles-tab"
                                    component={Link}
                                    to={articlesPath}
                                    className={classes.tab}
                                    icon={<FastfoodIcon />}
                                    label="Articles"
                                />
                                <Tab
                                    id="orders-tab"
                                    component={Link}
                                    to={ordersPath}
                                    className={classes.tab}
                                    icon={<ViewListIcon />}
                                    label="Orders"
                                />
                                <Tab
                                    id="orders-tab"
                                    component={Link}
                                    to={addOrderPath}
                                    className={classes.tab}
                                    icon={<CreateIcon />}
                                    label="New Order"
                                />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route component={() => <CategoriesView />} exact path={categoriesPath} />
                <Route component={() => <ArticlesView />} exact path={articlesPath} />
                <Route component={() => <OrdersView />} exact path={ordersPath} />
                <Route component={() => <AddOrderView />} exact path={addOrderPath} />
                <Redirect to={categoriesPath} />
            </Switch>
        </>
    );
};

export default App;
