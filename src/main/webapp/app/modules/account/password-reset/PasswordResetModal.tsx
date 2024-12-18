import React, { useState, useEffect } from 'react';
import { Translate, isEmail, translate } from 'react-jhipster';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Alert } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handlePasswordResetInit, reset } from './password-reset.reducer';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import './password-reset-modal.scss';

interface PasswordResetModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, y: '-1000px' },
  visible: {
    opacity: 1,
    y: '0',
    transition: { type: 'tween', duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ showModal, handleClose }) => {
  const dispatch = useAppDispatch();
  const successMessage = useAppSelector(state => state.passwordReset.successMessage);

  // Local state for email input
  const [email, setEmail] = useState('');

  // Clear success message after unmount
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Handle form submission
  const handleValidSubmit = () => {
    console.log('Received email in handleValidSubmit:', email);
    if (!email) {
      console.error('Email is missing or invalid:', email);
      return;
    }
    dispatch(handlePasswordResetInit(email));
  };

  // Success toast
  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    }
  }, [successMessage]);

  return (
    <Modal isOpen={showModal} toggle={handleClose} className="password-reset-modal" backdrop="static">
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <ModalHeader toggle={handleClose}>
          <h5>
            <Translate contentKey="reset.request.title">Reset your password</Translate>
          </h5>
        </ModalHeader>
        <ModalBody>
          <Alert color="warning" className="custom-alert">
            <Translate contentKey="reset.request.messages.info">
              Enter the email address you used to register
            </Translate>
          </Alert>

          {/* Manually managed input field */}
          <input
            type="email"
            placeholder={translate('global.form.email.placeholder')}
            value={email}
            onChange={e => setEmail(e.target.value)} // Update email in state
            className="form-control"
            data-cy="emailResetPassword"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="primary" onClick={handleValidSubmit}>
            <Translate contentKey="reset.request.form.button">Reset password</Translate>
          </Button>
        </ModalFooter>
      </motion.div>
    </Modal>
  );
};

export default PasswordResetModal;
