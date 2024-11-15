import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUser } from './category-management.reducer';

export const CategoryManagementDetail = () => {
  const dispatch = useAppDispatch();

  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login));
  }, []);

  const user = useAppSelector(state => state.userManagement.user);

  console.log('Categories in detail:',user)
  return (
    <div style={{margin:'10% 5%'}}>
      <h2>
        <Translate contentKey="userManagement.category.title">Categories</Translate> [<strong>{user.name}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="userManagement.firstName">Cateogry Name</Translate>
          </dt>
          <dd>{user.name}</dd>
          <dt>
            <Translate contentKey="userManagement.category.Category ID">Category ID</Translate>
          </dt>
          <dd>{user.categoryId}</dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/category-management" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  );
};

export default CategoryManagementDetail;
