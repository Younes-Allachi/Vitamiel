import React, { useState, useEffect } from 'react';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { savePassword, reset } from '../password.reducer';
import { motion } from 'framer-motion';
import './PasswordModal.scss';

interface PasswordModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, y: '1000px' },
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

const PasswordModal: React.FC<PasswordModalProps> = ({ showModal, handleClose }) => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const successMessage = useAppSelector(state => state.password.successMessage);
  const errorMessage = useAppSelector(state => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      console.log(translate('password.messages.success'));
      handleClose();
    } else if (errorMessage) {
      console.log(translate('password.messages.error'));
    }
    dispatch(reset());
  }, [successMessage, errorMessage]);

  const handleValidSubmit = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <Modal isOpen={showModal} toggle={handleClose} backdrop="static" className="password-modal">
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <ModalHeader toggle={handleClose}>
          <Translate contentKey="password.title" interpolate={{ username: account.login }}>
            Password for {account.login}
          </Translate>
        </ModalHeader>
        <ModalBody>
          <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="currentPassword"
              label={translate('global.form.currentpassword.label')}
              placeholder={translate('global.form.currentpassword.placeholder')}
              type="password"
              validate={{
                required: { value: true, message: translate('global.messages.validate.newpassword.required') },
              }}
              data-cy="currentPassword"
            />
            <ValidatedField
              name="newPassword"
              label={translate('global.form.newpassword.label')}
              placeholder={translate('global.form.newpassword.placeholder')}
              type="password"
              validate={{
                required: { value: true, message: translate('global.messages.validate.newpassword.required') },
                minLength: { value: 4, message: translate('global.messages.validate.newpassword.minlength') },
                maxLength: { value: 50, message: translate('global.messages.validate.newpassword.maxlength') },
              }}
              onChange={updatePassword}
              data-cy="newPassword"
            />
            <div className="password-strength-wrapper">
              <PasswordStrengthBar password={password} />
            </div>
            <ValidatedField
              name="confirmPassword"
              label={translate('global.form.confirmpassword.label')}
              placeholder={translate('global.form.confirmpassword.placeholder')}
              type="password"
              validate={{
                required: { value: true, message: translate('global.messages.validate.confirmpassword.required') },
                minLength: { value: 4, message: translate('global.messages.validate.confirmpassword.minlength') },
                maxLength: { value: 50, message: translate('global.messages.validate.confirmpassword.maxlength') },
                validate: v => v === password || translate('global.messages.error.dontmatch'),
              }}
              data-cy="confirmPassword"
            />
          </ValidatedForm>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>{' '}
          <Button color="primary" form="password-form" type="submit">
            <Translate contentKey="password.form.button">Save</Translate>
          </Button>
        </ModalFooter>
      </motion.div>
    </Modal>
  );
};

export default PasswordModal;
