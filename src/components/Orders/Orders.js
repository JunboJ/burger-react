import React, { Component } from "react";
import axios from "../../axios_orders";
import errorHandler from "../../hoc/errorHandler/errorHandler";

import Order from "../Order/Order";
import classes from "./Orders.module.css";

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	};
	componentDidMount() {
		axios
			.get("/orders.json")
			.then(res => {
				const orders_arr = [];
				for (let key in res.data) {
					orders_arr.push({
						id: key,
						...res.data[key],
					});
				}
				console.log(orders_arr);
				this.setState({ loading: false, orders: orders_arr });
			})
			.catch(err => {
				this.setState({ loading: false });
				console.log(err);
			});
	}

	render() {
		return (
			<div className={classes.ordersWrapper}>
				{this.state.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.totalPrice}
						customer={order.customer.name}
					/>
				))}
			</div>
		);
	}
}

export default errorHandler(Orders, axios);
