import React, { useLayoutEffect } from 'react';
import { useAppDispatch } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';

export const Logout = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return null;
};

export default Logout;
