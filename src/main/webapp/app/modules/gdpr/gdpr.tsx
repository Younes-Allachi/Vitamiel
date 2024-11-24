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
                <Modal isOpen={showModal} className="gdpr-modal" backdrop="static">
                    <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                        <ModalHeader toggle={handleClose}>
                            <Translate contentKey="gdprModal.mainHeading">GDPR Notice</Translate>{' '}
                        </ModalHeader>
                        <div className="modal-body">
                            <p>
                                <Translate contentKey="gdprModal.noticeText">
                                    By using this site, you agree to our use of cookies and processing of your personal data in accordance with our privacy policy. Please read the following information regarding our data protection practices.
                                </Translate>
                            </p>
                            <h6>
                                <Translate contentKey="gdprModal.personalDataTitle">What Personal Data We Collect</Translate>
                            </h6>
                            <ul>
                                <li>
                                    <Translate contentKey="gdprModal.dataName">Your name, email address, and contact information.</Translate>
                                </li>
                                <li>
                                    <Translate contentKey="gdprModal.dataInteractions">Information about your interactions with our website and services, such as pages visited and time spent on the site.</Translate>
                                </li>
                                <li>
                                    <Translate contentKey="gdprModal.dataPayment">Payment details, if you choose to make a purchase or donation through our platform.</Translate>
                                </li>
                            </ul>
                            <h6>
                                <Translate contentKey="gdprModal.dataUsageTitle">How We Use Your Data</Translate>
                            </h6>
                            <p>
                                <Translate contentKey="gdprModal.dataUsageText">We use the data we collect to:</Translate>
                            </p>
                            <ul>
                                <li>
                                    <Translate contentKey="gdprModal.dataUsagePersonalize">Provide and personalize our services for you.</Translate>
                                </li>
                                <li>
                                    <Translate contentKey="gdprModal.dataUsageImprove">Improve our website and service offerings.</Translate>
                                </li>
                                <li>
                                    <Translate contentKey="gdprModal.dataUsageCommunicate">Communicate with you regarding account updates, newsletters, and marketing communications (with your consent).</Translate>
                                </li>
                                <li>
                                    <Translate contentKey="gdprModal.dataUsageLegal">Comply with legal requirements and protect our rights.</Translate>
                                </li>
                            </ul>
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
