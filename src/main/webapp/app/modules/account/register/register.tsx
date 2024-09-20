import React, { useEffect } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { reset, handleRegister } from './register.reducer';
import { RegisterForm } from './registerForm/RegisterForm';
import { toast } from 'react-toastify';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    }
  }, [successMessage]);

  const handleRegisterSubmit = formValues => {
    dispatch(handleRegister(formValues));
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            <Translate contentKey="register.title">Registration</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <RegisterForm onSubmit={handleRegisterSubmit} />
          <Alert color="warning">
            <span>
              <Translate contentKey="global.messages.info.authenticated.prefix">If you want to</Translate>{' '}
            </span>
            <Link to="/login" className="alert-link">
              <Translate contentKey="global.messages.info.authenticated.link">sign in</Translate>
            </Link>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
