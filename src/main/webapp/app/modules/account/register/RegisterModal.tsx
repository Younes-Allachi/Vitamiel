import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { useAppDispatch } from 'app/config/store';
import { handleRegister } from './register.reducer';
import { RegisterForm } from './registerForm/RegisterForm';
import { Translate } from 'react-jhipster';
import { motion } from 'framer-motion';

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

interface RegisterModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ showModal, handleClose }) => {
  const dispatch = useAppDispatch();

  const handleRegisterSubmit = formValues => {
    dispatch(handleRegister(formValues));
    handleClose();
  };

  return (
    <Modal isOpen={showModal} toggle={handleClose} className="register-modal" backdrop="static">
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
        <ModalHeader toggle={handleClose}>
          <h5>
            <Translate contentKey="register.title">Sign up for an account</Translate>
          </h5>
        </ModalHeader>
        <ModalBody>
          <RegisterForm onSubmit={handleRegisterSubmit} handleClose={handleClose} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
        </ModalFooter>
      </motion.div>
    </Modal>
  );
};

export default RegisterModal;
