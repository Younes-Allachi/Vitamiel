import React, { useEffect } from 'react';
import { Translate, ValidatedField, ValidatedForm, isEmail, translate } from 'react-jhipster';
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
    transition: {
      type: 'tween',
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ showModal, handleClose }) => {
  const dispatch = useAppDispatch();
  const successMessage = useAppSelector(state => state.passwordReset.successMessage);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleValidSubmit = ({ email }) => {
    dispatch(handlePasswordResetInit(email));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(translate(successMessage));
    }
  }, [successMessage]);

  return (
    <Modal isOpen={showModal} toggle={handleClose} className="password-reset-modal" backdrop="static">
      {/* Appliquer Framer Motion ici */}
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <ValidatedForm onSubmit={handleValidSubmit}>
          <ModalHeader toggle={handleClose}>
            <h5>
              <Translate contentKey="reset.request.title">Reset your password</Translate>
            </h5>
          </ModalHeader>
          <ModalBody>
            <Alert color="warning" className="custom-alert">
              <Translate contentKey="reset.request.messages.info">Enter the email address you used to register</Translate>
            </Alert>

            <ValidatedField
              name="email"
              labelClass="custom-label"
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, message: translate('global.messages.validate.email.required') },
                minLength: { value: 5, message: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, message: translate('global.messages.validate.email.maxlength') },
                validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
              }}
              data-cy="emailResetPassword"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>
            <Button color="primary" type="submit">
              <Translate contentKey="reset.request.form.button">Reset password</Translate>
            </Button>
          </ModalFooter>
        </ValidatedForm>
      </motion.div>
    </Modal>
  );
};

export default PasswordResetModal;
