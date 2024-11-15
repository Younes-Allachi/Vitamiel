import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUser } from './user-management.reducer';

export const UserManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login));
  }, []);

  const user = useAppSelector(state => state.userManagement.user);

  return (
    <div style={{margin:'10% 5%'}}>
      <h2>
          <dd>{user.name}</dd>
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
              <Translate contentKey="userManagement.email">Description</Translate>
          </dt>
          <dd>{user.description}</dd>
          <dt>
              <Translate contentKey="userManagement.profiles">Origin</Translate>
          </dt>
          <dd>{user.origin}</dd>
          <dt>
              <Translate contentKey="userManagement.profiles">Weight</Translate>
          </dt>
          <dd>{user.weightKg}</dd>
          <dt>
              <Translate contentKey="userManagement.profiles">Price</Translate>
          </dt>
          <dd>{user.price}</dd>
          <dt>
              <Translate contentKey="userManagement.profiles">Stock Quantity</Translate>
          </dt>
          <dd>
            {user.stockQuantity}
          </dd>
          <dt>
            <Translate contentKey="userManagement.category.Category ID">Category ID</Translate>
          </dt>
          <dd>{user.categoryId}</dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/product-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  );
};

export default UserManagementDetail;
