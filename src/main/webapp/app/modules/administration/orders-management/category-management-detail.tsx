import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUser } from './category-management.reducer';

export const CategoryManagementDetail = () => {
  const dispatch = useAppDispatch();
  const { login } = useParams<'login'>();

  useEffect(() => {
    dispatch(getUser(login));
  }, [login, dispatch]);

  const user = useAppSelector(state => state.userManagement.user);
  const currentLocale = useSelector((state: any) => state.locale.currentLocale);

  // Function to get the category name based on the current locale
  const getCategoryName = (category, lang) => {
    switch (lang) {
      case 'en':
        return category.nameEn;
      case 'nl':
        return category.nameNl;
      case 'es':
        return category.nameEs;
      case 'fr':
        return category.nameFr;
      default:
        return category.nameEn; // Fallback to English if the language is not supported
    }
  };

  return (
    <div style={{ margin: '10% 5%' }}>
      <h2>
        <Translate contentKey="userManagement.category.title">Categories</Translate> 
        [<strong>{getCategoryName(user, currentLocale)}</strong>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="userManagement.firstName">Category Name</Translate>
          </dt>
          <dd>{getCategoryName(user, currentLocale)}</dd>
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
