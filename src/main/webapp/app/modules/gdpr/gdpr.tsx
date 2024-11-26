import React, { useState, useEffect } from 'react';
import { Button, ModalFooter, ModalHeader, Modal } from 'reactstrap';
import { motion } from 'framer-motion';
import { Translate } from 'react-jhipster';
import './gdpr-modal.scss';

export interface ILoginModalProps {
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

const GDPRModal: React.FC<ILoginModalProps> = ({ showModal, handleClose }) => {
    const [gdprAccepted, setGdprAccepted] = useState<boolean>(false);

    useEffect(() => {
        const consentGiven = localStorage.getItem('gdprConsent');
        if (consentGiven === 'true') {
            setGdprAccepted(true);
        }
    }, []);

    const handleGdprConsent = () => {
        localStorage.setItem('gdprConsent', 'true');
        setGdprAccepted(true);
        handleClose(); // Close the modal after consent
    };

    return (
        <>
            {!gdprAccepted && (
                <Modal 
                    isOpen={showModal} 
                    className="gdpr-modal" 
                    backdrop="static"
                    size="lg" 
                >
                    <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                        <ModalHeader toggle={handleClose}>
                            <Translate contentKey="gdprModal.mainHeading">Privacy & Cookies</Translate>
                        </ModalHeader>
                        <div className="modal-body">
                            <p>
                                <Translate contentKey="gdprModal.noticeText">
                                    We use cookies and collect personal data (such as your name, email, and interaction information) to personalize our services, improve our website, and communicate with you (with your consent). For more details, please refer to our FAQ page. By continuing to browse or clicking 'Accept,' you agree to these terms.
                                </Translate>
                            </p>
                        </div>
                        <ModalFooter>
                            <Button color="secondary" onClick={handleClose}>
                                <Translate contentKey="gdprModal.closeButton">Close</Translate>
                            </Button>
                            <Button color="primary" onClick={handleGdprConsent}>
                                <Translate contentKey="gdprModal.acceptButton">Accept</Translate>
                            </Button>
                        </ModalFooter>
                    </motion.div>
                </Modal>
            )}
        </>
    );
};

export default GDPRModal;
