import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Input } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { createUser, getRoles, getUser, reset, updateUser } from './user-management.reducer';

export const ProductManagementUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { login } = useParams<'login'>(); // Using product ID for the route
  const isNew = login === undefined;

  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isNew) {
      dispatch(getUser(login)); // Fetch product details if it's an edit
    }
    return () => {
      dispatch(reset());
    };
  }, [login]);

  const handleClose = () => {
    navigate('/admin/product-management');
  };

  const saveProduct = (values) => {

    if (image) {
      values.imageFile = image; // Attach the new image file if present
    } else if (product.imageUrl && !image) {
      // If image is deleted, remove imageFile to ensure it's not sent
      values.imageFile = null; // Ensure that no image is sent
      values.imageUrl = null; // Update the imageUrl in the payload to null
    }

    if (isNew) {
      dispatch(createUser(values));
    } else {
      console.log('Product before update:', values);
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string); // Convert image to base64 for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setImagePreviewUrl('');
  };

  const product = useAppSelector(state => state.userManagement.user);
  const loading = useAppSelector(state => state.userManagement.loading);
  const updating = useAppSelector(state => state.userManagement.updating);

  const imageUrl = product.imageUrl ? product.imageUrl : null;

  return (
    <div style={{ margin: '10% 5%' }}>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="userManagement.product.createLabel">Create or edit a Product</Translate>
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

              {/* Language Fields for Name */}
              <ValidatedField
                type="text"
                name="enName"
                label={translate('userManagement.product.name')} // English Name
                validate={{
                  required: { value: true, message: translate('userManagement.messages.validate.name.required') },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                type="text"
                name="esName"
                label={translate('userManagement.product.name')} // Spanish Name
                validate={{
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                type="text"
                name="frName"
                label={translate('userManagement.product.name')} // French Name
                validate={{
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                type="text"
                name="nlName"
                label={translate('userManagement.product.name')} // Dutch Name
                validate={{
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />

              {/* Language Fields for Description */}
              <ValidatedField
                type="textarea"
                name="enDescription"
                label={translate('userManagement.product.description')} // English Description
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                type="textarea"
                name="esDescription"
                label={translate('userManagement.product.description')} // Spanish Description
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                type="textarea"
                name="frDescription"
                label={translate('userManagement.product.description')} // French Description
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                type="textarea"
                name="nlDescription"
                label={translate('userManagement.product.description')} // Dutch Description
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />

              {/* Other Product Fields */}
              <ValidatedField
                type="text"
                name="origin"
                label={translate('userManagement.product.origin')}
                validate={{
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                type="number"
                name="weightKg"
                label={translate('userManagement.product.weight')}
                validate={{
                  required: { value: true, message: translate('userManagement.messages.validate.weightKg.required') },
                  min: { value: 0, message: translate('userManagement.messages.validate.weightKg.min') },
                }}
              />
              <ValidatedField
                type="text"
                name="price"
                label={translate('userManagement.product.price')}
                validate={{
                  required: { value: true, message: translate('userManagement.product.priceError') },
                }}
              />

              <ValidatedField
                type="number"
                name="stockQuantity"
                label={translate('userManagement.product.stockQuantity')}
                validate={{
                  required: { value: true, message: translate('userManagement.messages.validate.stockQuantity.required') },
                  min: { value: 0, message: translate('userManagement.messages.validate.stockQuantity.min') },
                }}
              />
              <ValidatedField
                type="text"
                name="categoryId"
                label={translate('userManagement.product.categoryId')}
                validate={{
                  required: { value: true, message: translate('userManagement.messages.validate.categoryId.required') },
                }}
              />

              <div>
                <ValidatedField
                  type="file"
                  name="imageUrl"
                  label={translate('userManagement.imageUrl')}
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {imagePreviewUrl ? (
                  <div className="mt-2">
                    <img
                      src={imagePreviewUrl}
                      alt="Product preview"
                      style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                    <Button color="danger" onClick={handleImageDelete}>Delete Image</Button>
                  </div>
                ) : imageUrl ? (
                  <div className="mt-2">
                    <img
                      src={`http://localhost:8080/${imageUrl}`}
                      alt="Product"
                      style={{ maxWidth: '100%', maxHeight: '300px' }}
                    />
                    <Button color="danger" onClick={handleImageDelete}>Delete Image</Button>
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
              <Button color="primary" type="submit" disabled={updating}>
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