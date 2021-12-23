import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useContext
    } from 'react';
    import axios from 'axios';
    import config from '../config.json';
    import * as orderApi from '../api/orders';
  
  export const OrderContext = createContext();
  export const useOrders = () => useContext(OrderContext);
  
  export const OrderProvider = ({
      children
    }) => {
      const [orders, setOrders] = useState([]);
      const [error, setError] = useState();
      const [loading, setLoading] = useState(false);
      const [currentOrder, setCurrentOrder] = useState({});
  
      const refreshOrders = useCallback(async () => {
        try {
          setError();
          setLoading(true);
          const data = await orderApi.getAllOrders();
          setOrders(data.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }, []);

      const myOrders = useCallback(async (id) => {
        try {
          setError();
          setLoading(true);
          const data = await orderApi.getMyOrders(id);
          return data;
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }, []);
  
      useEffect(() => {
        if (orders?.length === 0) {
          refreshOrders();
        }
      }, [orders, refreshOrders]);

      const createOrUpdateOrder = useCallback(
        async ({id, paintings, total, user_id }) => {
          setError();
          setLoading(true);
          const date = new Date();
          try {
            const changedOrder = await orderApi.saveOrder({
              id, 
              paintings, 
              total, 
              user_id,
              date,
            });
            await refreshOrders();
            return changedOrder;
          } catch (error) {
            console.log(error);
            throw error;
          } finally {
            setLoading(false);
          }
        },
        [refreshOrders]
      );
    
  
      const deleteOrder = useCallback(async (id) => {
        try {
          setError();
          setLoading(true);
          const {
            data
          } = await axios({
            method: 'delete',
            url: `${config.base_url}paintings/${id}`,
          });
          refreshOrders();
          return data;
        } catch (error) {
          console.log(error);
          throw error;
        } finally {
          setLoading(false);
        }
      }, [refreshOrders]);
  
      const setOrderToUpdate = useCallback((id) => {
        setCurrentOrder(id === null ? {} : orders.find((t) => t.id === id));
      }, [orders]);
    
      const value = useMemo(() => ({
          orders,
          error,
          loading,
          currentOrder,
          myOrders,
          createOrUpdateOrder,
          deleteOrder,
          setOrderToUpdate,
      }), [orders, error, loading, currentOrder,myOrders, createOrUpdateOrder, deleteOrder, setOrderToUpdate])
    
      return (
        <OrderContext.Provider value={value}>
          {children}
        </OrderContext.Provider>
      );
    };