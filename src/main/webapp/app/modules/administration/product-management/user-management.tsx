import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getUsersAsAdmin, updateUser } from './user-management.reducer';

export const UserManagement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

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

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getUsersFromProps();
  };


  const account = useAppSelector(state => state.authentication.account);
  const users = useAppSelector(state => state.userManagement.users);
  const totalItems = useAppSelector(state => state.userManagement.totalItems);
  const loading = useAppSelector(state => state.userManagement.loading);
  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = pagination.sort;
    const order = pagination.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div style={{margin:'10% 5%'}}>
      <h2 id="user-management-page-heading" data-cy="userManagementPageHeading">
        <Translate contentKey="userManagement.home.title">Products</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="userManagement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="new" className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel">Create a new product</Translate>
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th>
              #
            </th>
            <th className="hand">
              <Translate contentKey="userManagement.login">Name</Translate>
            </th>
            <th className="hand">
              <Translate contentKey="userManagement.email">Description</Translate>
            </th>
            <th />
            <th>
              <Translate contentKey="userManagement.profiles">Origin</Translate>
            </th>
            <th>
              <Translate contentKey="userManagement.profiles">Weight</Translate>
            </th>
            <th>
              <Translate contentKey="userManagement.profiles">Price</Translate>
            </th>
            <th>
              <Translate contentKey="userManagement.profiles">Stock Quantity</Translate>
            </th>
            <th>
            <Translate contentKey="userManagement.category.Category ID">Category ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
            </th>
            <th>
              <Translate contentKey="userManagement.category.Actions">Actions</Translate>
            </th>  
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr id={user.login} key={`user-${i}`}>
              <td>{i+1}</td>
              <td>{user.name}</td>
              <td>{user.description}</td>
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
                    <Translate contentKey="userManagement.View">View</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${user.id}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                    <Translate contentKey="userManagement.Edit">Edit</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${user.id}/delete`} color="danger" size="sm">
                    <FontAwesomeIcon icon="trash" />{' '}
                    <span className="d-none d-md-inline">
                    <Translate contentKey="userManagement.Delete">Delete</Translate>
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
