import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import API from '../../common/api';
import { Order } from '../../common/types';
import { OrderActionTypes, OrderAction } from '../../store/actions';

interface State {
    order: Order;
    deleteOrder: Function;
}

const OrderCardMenu = ({ order, deleteOrder }: State) => {

    // menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // click handlers
    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        deleteOrder(order);
        handleCloseMenu();
    };

    return (
        <>
            <IconButton aria-label="more" aria-controls="article-menu" aria-haspopup="true" onClick={handleClickMenu}>
                <MoreHorizIcon />
            </IconButton>
            <Menu id="article-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

// redux actions
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        deleteOrder: async (order: Order) => {
            const deletedOrderId = await API.deleteOrder(order);
            if (deletedOrderId) {
                dispatch<OrderAction>({ type: OrderActionTypes.DELETE_ORDER, value: [order] });
            }
        },
    };
};

export default connect(null, mapDispatchToProps)(OrderCardMenu);
