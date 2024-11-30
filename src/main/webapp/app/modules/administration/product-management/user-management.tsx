import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUsersAsAdmin } from './user-management.reducer';

export const UserManagement = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    activePage: 1,
    itemsPerPage: 10,
    sort: 'id',
    order: 'ASC',
  });

  const getUsersFromProps = () => {
    dispatch(
      getUsersAsAdmin({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      }),
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getUsersFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  const users = useAppSelector(state => state.userManagement.users);
  const totalItems = useAppSelector(state => state.userManagement.totalItems);
  const loading = useAppSelector(state => state.userManagement.loading);

  const getSortIconByFieldName = (fieldName) => {
    const sortFieldName = pagination.sort;
    const order = pagination.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === 'ASC' ? faSortUp : faSortDown;
  };

  const handlePagination = currentPage =>
  setPagination({
    ...pagination,
    activePage: currentPage,
  });

const handleSyncList = () => {
  getUsersFromProps();
};



  return (
    <div style={{ margin: '10% 5%' }}>
      <h2 id="user-management-page-heading" data-cy="userManagementPageHeading">
        <Translate contentKey="userManagement.product.title">Products</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={getUsersFromProps} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="userManagement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="new" className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.product.createLabel">Create a new product</Translate>
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th>#</th>
            <th className="hand">
              <Translate contentKey="userManagement.product.name">Name</Translate>
            </th>
            <th className="hand">
              <Translate contentKey="userManagement.product.description">Description</Translate>
            </th>
            <th>
              <Translate contentKey="userManagement.product.origin">Origin</Translate>
            </th>
            <th>
              <Translate contentKey="userManagement.product.weight">Weight</Translate>
            </th>
            <th>
              <Translate contentKey="userManagement.product.price">Price</Translate>
            </th>
            <th>
              <Translate contentKey="userManagement.product.stockQuantity">Stock Quantity</Translate>
            </th>
            <th>
              <Translate contentKey="userManagement.product.categoryId">Category ID</Translate> 
              <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
            </th>
            <th>
              <Translate contentKey="userManagement.product.actions">Actions</Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr id={user.login} key={`user-${i}`}>
              <td>{i + 1}</td>
              <td>
                <strong>{user.enName}</strong> <br />
                <em>{user.esName}</em> <br />
                <span>{user.frName}</span> <br />
                <span>{user.nlName}</span>
              </td>
              <td>
                <strong>{user.enDescription}</strong> <br />
                <em>{user.esDescription}</em> <br />
                <span>{user.frDescription}</span> <br />
                <span>{user.nlDescription}</span>
              </td>
              <td>{user.origin}</td>
              <td>{user.weightKg}</td>
              <td>{user.price}</td>
              <td>{user.stockQuantity}</td>
              <td>{user.categoryId}</td>

              <td className="text-end">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={user.id} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="userManagement.product.view">View</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${user.id}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="userManagement.product.edit">Edit</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${user.id}/delete`} color="danger" size="sm">
                    <FontAwesomeIcon icon="trash" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="userManagement.product.delete">Delete</Translate>
                    </span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={users?.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
               maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserManagement;
