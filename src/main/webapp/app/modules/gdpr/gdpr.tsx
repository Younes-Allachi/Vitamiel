import React, { useState, useEffect } from 'react';
import { Button, ModalFooter, ModalHeader, Modal } from 'reactstrap';
import { motion } from 'framer-motion';
import './login-modal.scss';

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

const LoginModal: React.FC<ILoginModalProps> = ({ showModal, handleClose }) => {
    const [gdprAccepted, setGdprAccepted] = useState<boolean>(false);

    useEffect(() => {
        // Check if GDPR has been accepted before
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
            {/* GDPR Notice Modal */}
            {!gdprAccepted && (
                <Modal isOpen={showModal} className="gdpr-modal" backdrop="static">
                    <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                        <ModalHeader toggle={handleClose}>
                            <h5>GDPR Notice</h5>
                        </ModalHeader>
                        <div className="modal-body">
                            <p>
                                By using this site, you agree to our use of cookies and processing of your personal data in accordance with our privacy policy. Please read the following information regarding our data protection practices.
                            </p>
                            <h6>What Personal Data We Collect</h6>
                            <ul>
                                <li>Your name, email address, and contact information.</li>
                                <li>Information about your interactions with our website and services, such as pages visited and time spent on the site.</li>
                                <li>Payment details, if you choose to make a purchase or donation through our platform.</li>
                            </ul>
                            <h6>How We Use Your Data</h6>
                            <p>
                                We use the data we collect to:
                            </p>
                            <ul>
                                <li>Provide and personalize our services for you.</li>
                                <li>Improve our website and service offerings.</li>
                                <li>Communicate with you regarding account updates, newsletters, and marketing communications (with your consent).</li>
                                <li>Comply with legal requirements and protect our rights.</li>
                            </ul>
                            <h6>Your Rights</h6>
                        </div>
                        <ModalFooter>
                            <Button color="secondary" onClick={handleClose}>Close</Button> {/* Close the modal */}
                            <Button color="primary" onClick={handleGdprConsent}>Accept</Button>
                        </ModalFooter>
                    </motion.div>
                </Modal>
            )}
        </>
    );
};


export default LoginModal;
