import MyOrdersList from '../components/MyOrdersList';
import '../css/admin.css';
import { useOrders } from "../context/OrderProvider";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function MyOrders(){
        const { myOrders, loading } = useOrders();
        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;
        const [orders, setOrders] = useState({});

        //Gets all the data needed to make an order list from the database
        const fetchdata = useCallback(async () => {
                const data = await myOrders(userInfo.user.id);
                setOrders(data);
        }, [userInfo, myOrders]);
            
        useEffect(() => {
                fetchdata();
        }, [fetchdata]);
        
        return(
                <>
                <div className="orders-box">
                        <div className="myOrder-titel">
                                <h1>My Orders</h1>
                        </div>
                        <MyOrdersList orders={(orders && Object.keys(orders).length !== 0)?orders:"loading"}/>
                </div>
                </>
        )
}