import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { Alert, Button, Form, ModalFooter, ModalHeader, Modal } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import './login-modal.scss';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  isAuthenticated: boolean;
  handleLogin: (username: string, password: string) => void;
  handleClose: () => void;
  handleSignup: () => void;
  openPasswordResetModal: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, y: '-1000px' },
  visible: {
    opacity: 1,
    y: '0',
    transition: {
      type: 'tween',
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const LoginModal: React.FC<ILoginModalProps> = ({
  showModal,
  loginError,
  isAuthenticated,
  handleLogin,
  handleClose,
  handleSignup,
  openPasswordResetModal,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');

  const onSubmit = (data: { username: string; password: string }) => {
    handleLogin(data.username, data.password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setAlertMessage(translate('login.success'));
      setAlertColor('success');
      setShowAlert(true);

      handleClose();
    } else if (loginError) {
      setAlertMessage(translate('login.error'));
      setAlertColor('danger');
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [isAuthenticated, loginError, handleClose]);

  return (
    <>
      <Modal isOpen={showModal} toggle={handleClose} className="login-modal" backdrop="static">
        <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            <ModalHeader toggle={handleClose}>
              <h5>
                <Translate contentKey="login.title">Sign in to your account</Translate>
              </h5>
            </ModalHeader>
            <div className="modal-body">
              {showAlert && (
                <Alert color={alertColor} className="custom-alert">
                  {alertMessage}
                </Alert>
              )}

              <div className="form-group position-relative">
                <input
                  name="username"
                  placeholder={translate('login.username.placeholder')}
                  className={`form-control ${errors.username ? 'invalid' : touchedFields.username ? 'valid' : ''}`}
                  {...register('username', { required: true })}
                />
                {errors.username && <i className="fa fa-times field-icon error"></i>}
                {!errors.username && touchedFields.username && <i className="fa fa-check field-icon success"></i>}
                {errors.username && <span className="error-message1">{translate('login.username.required')}</span>}
              </div>
              <div className="form-group position-relative">
                <input
                  name="password"
                  type="password"
                  placeholder={translate('login.password.placeholder')}
                  className={`form-control ${errors.password ? 'invalid' : touchedFields.password ? 'valid' : ''}`}
                  {...register('password', { required: true })}
                />
                {errors.password && <i className="fa fa-times field-icon error"></i>}
                {!errors.password && touchedFields.password && <i className="fa fa-check field-icon success"></i>}
                {errors.password && <span className="error-message2">{translate('login.password.required')}</span>}
              </div>
              <div className="login-links">
                <Link to="#" onClick={openPasswordResetModal}>
                  <Translate contentKey="login.forgot">Forgot password?</Translate>
                </Link>
                <div className="custom-signup-link" onClick={handleSignup}>
                  <Translate contentKey="login.signup">Sign up</Translate>
                </div>
              </div>
            </div>
            <ModalFooter>
              <Button color="secondary" onClick={handleClose}>
                <Translate contentKey="entity.action.cancel">Cancel</Translate>
              </Button>{' '}
              <Button color="primary" type="submit">
                <Translate contentKey="login.button">Sign in</Translate>
              </Button>
            </ModalFooter>
          </Form>
        </motion.div>
      </Modal>
    </>
  );
};

export default LoginModal;
