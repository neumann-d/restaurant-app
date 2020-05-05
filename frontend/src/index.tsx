import { blue, grey, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import API from './common/api';
import rootReducer from './store/reducers';
import {
    ArticleAction,
    ArticleActionTypes,
    CategoryAction,
    CategoryActionTypes,
    OrderAction,
    OrderActionTypes
} from './store/actions';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: red[400]
        },
        secondary: {
            main: blue.A700
        },
        error: {
            main: red.A400
        },
        background: {
            default: grey[100]
        }
    }
});

// create redux store
const store = createStore(rootReducer);

// load initial data from API
(async () => {
    try {
        const articles = await API.getArticles();
        store.dispatch<ArticleAction>({ type: ArticleActionTypes.ARTICLES, value: articles });
        const categories = await API.getCategories();
        store.dispatch<CategoryAction>({ type: CategoryActionTypes.CATEGORIES, value: categories });
        const orders = await API.getOrders();
        store.dispatch<OrderAction>({ type: OrderActionTypes.ORDERS, value: orders });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
})();

ReactDOM.render(
    // <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Router>
            <CssBaseline />
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </Router>
    </ThemeProvider>,
    // </React.StrictMode>,
    document.getElementById('root')
);
