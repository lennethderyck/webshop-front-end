import { Redirect, Route, useLocation } from "react-router-dom"
import {useMemo} from 'react';
import {useSelector} from 'react-redux';

export default function PrivateRoute ({children, role, ...rest}){

    const {pathname} = useLocation();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const canShowRoute = useMemo (()=>{
      if(!role) return false;

      if (!userInfo.user){
          return false;
      }
      return userInfo.user.roles.includes(role);

  }, [role, userInfo]);

    return(
      <Route {...rest}>
        {
          canShowRoute ? (
            children
          ) : (
            <Redirect from={pathname} to="/signIn" />
          )
        }
      </Route>
    );
}