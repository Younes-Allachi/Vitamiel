import React, { useState, ChangeEvent, FormEvent } from 'react';
import { translate } from 'react-jhipster';

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  notes: string;
  error: Record<string, string>;
}

const ContactForm: React.FC = () => {
  const [state, setState] = useState<ContactFormState>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    notes: '',
    error: {},
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = { ...state.error };
    error[name] = '';

    setState(prevState => ({
      ...prevState,
      [name]: value,
      error,
    }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstName, lastName, email, subject, notes } = state;

    const newError: Record<string, string> = {};
    if (firstName === '') {
      newError.firstName = translate('contactForm.errors.firstName');
    }
    if (lastName === '') {
      newError.lastName = translate('contactForm.errors.lastName');
    }
    if (email === '') {
      newError.email = translate('contactForm.errors.email');
    }
    if (subject === '') {
      newError.subject = translate('contactForm.errors.subject');
    }
    if (notes === '') {
      newError.notes = translate('contactForm.errors.notes');
    }

    if (Object.keys(newError).length > 0) {
      setState(prevState => ({
        ...prevState,
        error: newError,
      }));
      return;
    }

    // Send data to backend
    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, subject, notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Success, reset the form and show success message
      setState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        notes: '',
        error: {},
      });

      // Optionally show success message
      alert(translate('contactForm.successMessage'));

    } catch (error) {
      // Handle error (e.g., show an error message)
      alert(translate('contactForm.errorMessage'));
      console.error('Error submitting the contact form:', error);
    }
  };

  const { firstName, lastName, email, subject, notes, error } = state;

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-field">
            <input
              value={firstName}
              onChange={changeHandler}
              type="text"
              name="firstName"
              placeholder={translate('contactForm.name')}
            />
            <p>{error.firstName}</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-field">
            <input
              value={lastName}
              onChange={changeHandler}
              type="text"
              name="lastName"
              placeholder={translate('contactForm.lastname')}
            />
            <p>{error.lastName}</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-field">
            <input
              value={email}
              onChange={changeHandler}
              type="email"
              name="email"
              placeholder={translate('contactForm.email')}
            />
            <p>{error.email}</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-field">
            <select value={subject} onChange={changeHandler} name="subject" className="form-control">
              <option value="">{translate('contactForm.subject')}</option>
              <option value="orderInProgress">{translate('contactForm.subjectt.orderInProgress')}</option>
              <option value="productInfo">{translate('contactForm.subjectt.productInfo')}</option>
              <option value="deliveryIssue">{translate('contactForm.subjectt.deliveryIssue')}</option>
              <option value="returnOrExchange">{translate('contactForm.subjectt.returnOrExchange')}</option>
              <option value="paymentIssue">{translate('contactForm.subjectt.paymentIssue')}</option>
              <option value="promotionalOffers">{translate('contactForm.subjectt.promotionalOffers')}</option>
              <option value="partnershipRequest">{translate('contactForm.subjectt.partnershipRequest')}</option>
              <option value="generalInformation">{translate('contactForm.subjectt.generalInformation')}</option>
              <option value="suggestionOrComplaint">{translate('contactForm.subjectt.suggestionOrComplaint')}</option>
              <option value="other">{translate('contactForm.subjectt.other')}</option>
            </select>
            <p>{error.subject}</p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-field">
            <textarea
              name="notes"
              value={notes}
              onChange={changeHandler}
              placeholder={translate('contactForm.message')}
            />
            <p>{error.notes}</p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-submit">
            <button type="submit" className="theme-btn">
              {translate('contactForm.submit')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
