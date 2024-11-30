import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUser } from './user-management.reducer';

export const UserManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login));
  }, [dispatch, login]);

  const user = useAppSelector(state => state.userManagement.user);

  return (
    <div style={{ margin: '10% 5%' }}>
      <h2>{user.name}</h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="userManagement.product.description">Description</Translate>
          </dt>
          <dd>
            <strong>{user.enDescription}</strong> <br />
            <em>{user.esDescription}</em> <br />
            <span>{user.frDescription}</span> <br />
            <span>{user.nlDescription}</span>
          </dd>

          <dt>
            <Translate contentKey="userManagement.product.origin">Origin</Translate>
          </dt>
          <dd>{user.origin}</dd>

          <dt>
            <Translate contentKey="userManagement.product.weight">Weight</Translate>
          </dt>
          <dd>{user.weightKg}</dd>

          <dt>
            <Translate contentKey="userManagement.product.price">Price</Translate>
          </dt>
          <dd>{user.price}</dd>

          <dt>
            <Translate contentKey="userManagement.product.stockQuantity">Stock Quantity</Translate>
          </dt>
          <dd>{user.stockQuantity}</dd>

          <dt>
            <Translate contentKey="userManagement.product.categoryId">Category ID</Translate>
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
