import React, { useEffect,useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row, Input } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createUser, getRoles, getUser, reset, updateUser } from './user-management.reducer';


export const ProductManagementUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useParams<'login'>();
  const isNew = login === undefined;

  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(login));
    }
    return () => {
      dispatch(reset());
    };
  }, [login]);

  const handleClose = () => {
    navigate('/admin/product-management');
  };

  const saveProduct = values => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);

      // Show the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string); // Convert the image to base64
      };
      reader.readAsDataURL(file);
    }
  };

  const isInvalid = false;
  const product = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);

  const imageUrl = product.imageUrl ? product.imageUrl : null;

  return (
    <div style={{ margin: '10% 5%' }}>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="productManagement.home.createOrEditLabel">Create or edit a Product</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveProduct} defaultValues={product}>
              {product.id ? (
                <ValidatedField
                  type="text"
                  name="id"
                  required
                  readOnly
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                type="text"
                name="name"
                label={translate('productManagement.name')}
                validate={{
                  required: {
                    value: true,
                    message: translate('productManagement.messages.validate.name.required'),
                  },
                  maxLength: {
                    value: 100,
                    message: translate('entity.validation.maxlength', { max: 100 }),
                  },
                }}
              />
              <ValidatedField
                type="textarea"
                name="description"
                label={translate('productManagement.description')}
                validate={{
                  maxLength: {
                    value: 500,
                    message: translate('entity.validation.maxlength', { max: 500 }),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="origin"
                label={translate('productManagement.origin')}
                validate={{
                  maxLength: {
                    value: 100,
                    message: translate('entity.validation.maxlength', { max: 100 }),
                  },
                }}
              />
              <ValidatedField
                type="number"
                name="weightKg"
                label={translate('productManagement.weightKg')}
                validate={{
                  required: {
                    value: true,
                    message: translate('productManagement.messages.validate.weightKg.required'),
                  },
                  min: {
                    value: 0,
                    message: translate('productManagement.messages.validate.weightKg.min'),
                  },
                }}
              />
              <ValidatedField
                type="number"
                name="price"
                label={translate('productManagement.price')}
                validate={{
                  required: {
                    value: true,
                    message: translate('productManagement.messages.validate.price.required'),
                  },
                  min: {
                    value: 0,
                    message: translate('productManagement.messages.validate.price.min'),
                  },
                }}
              />
              <ValidatedField
                type="number"
                name="stockQuantity"
                label={translate('productManagement.stockQuantity')}
                validate={{
                  required: {
                    value: true,
                    message: translate('productManagement.messages.validate.stockQuantity.required'),
                  },
                  min: {
                    value: 0,
                    message: translate('productManagement.messages.validate.stockQuantity.min'),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="imageUrl"
                label={translate('productManagement.imageUrl')}
                validate={{
                  maxLength: {
                    value: 200,
                    message: translate('entity.validation.maxlength', { max: 200 }),
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="categoryId"
                label={translate('productManagement.category')}
                validate={{
                  required: {
                    value: true,
                    message: translate('productManagement.messages.validate.categoryId.required'),
                  },
                }}
              >
              
              </ValidatedField>

              <div>
                <ValidatedField
                  type="file"
                  name="imageUrl"
                  label={translate('productManagement.imageUrl')}
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {imagePreviewUrl ? (
                  <div className="mt-2">
                    <img
                      src={`http://localhost:8080/${imagePreviewUrl}`}
                      alt="Product preview"
                      style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                  </div>
                ) : imageUrl ? (
                  <div className="mt-2">
                    <img
                      src={`http://localhost:8080/${imageUrl}`}
                      alt="Product"
                      style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                  </div>
                ) : null}
              </div>

              <Button tag={Link} to="/admin/product-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductManagementUpdate;
