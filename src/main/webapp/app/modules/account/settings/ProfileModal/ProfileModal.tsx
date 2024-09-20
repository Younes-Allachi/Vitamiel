import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isEmail, translate } from 'react-jhipster';
import { motion } from 'framer-motion';
import './profile-modal.scss';

interface ProfileModalProps {
  showModal: boolean;
  handleClose: () => void;
  handleValidSubmit: (values: any) => void;
  account: any;
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

const ProfileModal: React.FC<ProfileModalProps> = ({ showModal, handleClose, handleValidSubmit, account }) => {
  return (
    <Modal isOpen={showModal} toggle={handleClose} backdrop="static" className="profile-modal">
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <ModalHeader toggle={handleClose}>
          <Translate contentKey="settings.title" interpolate={{ username: account.login }}>
            User settings for {account.login}
          </Translate>
        </ModalHeader>
        <ModalBody>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label={translate('settings.form.firstname')}
              id="firstName"
              placeholder={translate('settings.form.firstname.placeholder')}
              validate={{
                required: { value: true, message: translate('settings.messages.validate.firstname.required') },
                minLength: { value: 1, message: translate('settings.messages.validate.firstname.minlength') },
                maxLength: { value: 50, message: translate('settings.messages.validate.firstname.maxlength') },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label={translate('settings.form.lastname')}
              id="lastName"
              placeholder={translate('settings.form.lastname.placeholder')}
              validate={{
                required: { value: true, message: translate('settings.messages.validate.lastname.required') },
                minLength: { value: 1, message: translate('settings.messages.validate.lastname.minlength') },
                maxLength: { value: 50, message: translate('settings.messages.validate.lastname.maxlength') },
              }}
              data-cy="lastname"
            />
            <ValidatedField
              name="deliveryAddress"
              label={translate('settings.form.deliveryAddress')}
              id="deliveryAddress"
              placeholder={translate('settings.form.deliveryAddress.placeholder')}
              data-cy="deliveryAddress"
            />
            <ValidatedField
              name="email"
              label={translate('global.form.email.label')}
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, message: translate('global.messages.validate.email.required') },
                minLength: { value: 5, message: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, message: translate('global.messages.validate.email.maxlength') },
                validate: v => isEmail(v) || translate('global.messages.validate.email.invalid'),
              }}
              data-cy="email"
            />
          </ValidatedForm>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button color="primary" form="settings-form" type="submit">
            <Translate contentKey="settings.form.button">Save</Translate>
          </Button>
        </ModalFooter>
      </motion.div>
    </Modal>
  );
};

export default ProfileModal;
