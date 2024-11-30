import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import axios for API requests

export const OrderManagement = () => {
  const { i18n } = useTranslation(); // Accessing the current language from i18n
  
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const currentLocale = useSelector((state: any) => state.locale.currentLocale);

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const [orders, setOrders] = useState<any[]>([]); // Store orders data
  const [totalItems, setTotalItems] = useState<number>(0); // Total count of orders
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Fetch orders from API
  const getOrders = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/orders`)
      .then(response => {
        console.log('Response of getting orders:',response.data);
        setOrders(response.data); // Assuming orders are in `orders` field
        setTotalItems(response.data.totalElements); // Assuming totalItems are in `totalItems` field
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
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

  const sort = (p: string) => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = (currentPage: number) =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getOrders();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = pagination.sort;
    const order = pagination.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div style={{ margin: '10% 5%' }}>
      <h2 id="order-management-page-heading" data-cy="orderManagementPageHeading">
        <Translate contentKey="userManagement.order.title">Orders</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="userManagement.home.refreshListLabel">Refresh List</Translate>
          </Button>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('orderId')}>
              <Translate contentKey="userManagement.order.Order ID">Order ID</Translate>{' '}
            </th>
            <th className="hand" onClick={sort('orderDate')}>
              <Translate contentKey="userManagement.order.Order Date">Order Date</Translate>{' '}
            </th>
            <th className="hand" onClick={sort('orderDate')}>
              <Translate contentKey="userManagement.order.Product ID">Product ID</Translate>{' '}
            </th>
            <th className="hand" onClick={sort('customerName')}>
              <Translate contentKey="userManagement.order.Customer Name">Customer Name</Translate>{' '}
            </th>
            <th className="hand" onClick={sort('customerName')}>
              <Translate contentKey="userManagement.order.Email">Email</Translate>{' '}
            </th>
            <th className="hand" onClick={sort('status')}>
              <Translate contentKey="userManagement.order.Status">Status</Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders && orders?.map((order, i) => (
            <tr id={order.id} key={`order-${i}`}>
              <td>{order.orderId}</td>
              <td>{order.orderDate}</td>
              <td>
                {order.productIds.map(id => (
                  <div key={id}>{id}</div>
                ))}
              </td>
              <td>{order.username}</td>
              <td>{order.email}</td>
              <td>
                <Badge color={order.status === 'PAID' ? 'success' : 'warning'}>{order.status}</Badge>
              </td>
              {/* <td className="text-end">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`/orders/${order.orderId}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="userManagement.View">View</Translate>
                    </span>
                  </Button>
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={orders?.length > 0 ? '' : 'd-none'}>
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

export default OrderManagement;
