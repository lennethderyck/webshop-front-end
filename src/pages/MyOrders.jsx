import MyOrdersList from '../components/MyOrdersList';
import '../css/admin.css';


export default function MyOrders(){
        
        return(
                <>
                <div className="orders-box">
                        <div className="myOrder-titel">
                                <h1>My Orders</h1>
                        </div>
                    <MyOrdersList/>
                </div>
                </>
        )
}