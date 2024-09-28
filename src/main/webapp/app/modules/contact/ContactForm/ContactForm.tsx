import React, { useState, ChangeEvent, FormEvent } from 'react';
import { translate } from 'react-jhipster';

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  lastname: string;
  events: string;
  notes: string;
  error: Record<string, string>;
}

const ContactForm: React.FC = () => {
  const [state, setState] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    lastname: '',
    events: '',
    notes: '',
    error: {},
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = { ...state.error };
    error[name] = '';

    setState(prevState => ({
      ...prevState,
      [name]: value,
      error,
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, subject, lastname, events, notes } = state;

    const newError: Record<string, string> = {};
    if (name === '') {
      newError.name = translate('contactForm.errors.name');
    }
    if (email === '') {
      newError.email = translate('contactForm.errors.email');
    }
    if (subject === '') {
      newError.subject = translate('contactForm.errors.subject');
    }
    if (lastname === '') {
      newError.lastname = translate('contactForm.errors.lastname');
    }
    if (events === '') {
      newError.events = translate('contactForm.errors.events');
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

    setState({
      name: '',
      email: '',
      subject: '',
      lastname: '',
      events: '',
      notes: '',
      error: {},
    });
  };

  const { name, email, subject, lastname, notes, error } = state;

  return (
    <form onSubmit={submitHandler} className="form">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-field">
            <input value={name} onChange={changeHandler} type="text" name="name" placeholder={translate('contactForm.name')} />
            <p>{error.name}</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-field">
            <input value={lastname} onChange={changeHandler} type="text" name="lastname" placeholder={translate('contactForm.lastname')} />
            <p>{error.lastname}</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-field">
            <input value={email} onChange={changeHandler} type="email" name="email" placeholder={translate('contactForm.email')} />
            <p>{error.email}</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <div className="form-field">
            <input value={subject} onChange={changeHandler} type="text" name="subject" placeholder={translate('contactForm.subject')} />
            <p>{error.subject}</p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-field">
            <textarea name="notes" value={notes} onChange={changeHandler} placeholder={translate('contactForm.message')} />
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
