import React, { useState } from 'react';
import { Translate, ValidatedField, ValidatedForm, isEmail, translate } from 'react-jhipster';
import { Button } from 'reactstrap';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import './registerForm.scss';

interface RegisterFormProps {
  onSubmit: (formValues: any) => void;
  handleClose?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, handleClose }) => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const currentLocale = useAppSelector(state => state.locale.currentLocale);

  const updatePassword = event => setPassword(event.target.value);

  const handleValidSubmit = ({ firstName, lastName, email, firstPassword }) => {
    onSubmit({
      firstName,
      lastName,
      login: email,
      email,
      password: firstPassword,
      langKey: currentLocale,
    });
  };

  return (
    <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
      <ValidatedField
        name="firstName"
        label={translate('global.form.firstname.label')}
        placeholder={translate('global.form.firstname.placeholder')}
        validate={{
          required: { value: true, message: translate('global.messages.validate.firstname.required') },
        }}
        data-cy="firstName"
        labelClass="custom-label-class"
        errorClass="error-message1"
      />
      <ValidatedField
        name="lastName"
        label={translate('global.form.lastname.label')}
        placeholder={translate('global.form.lastname.placeholder')}
        validate={{
          required: { value: true, message: translate('global.messages.validate.lastname.required') },
        }}
        data-cy="lastName"
        labelClass="custom-label-class"
        errorClass="error-message1"
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
        labelClass="custom-label-class"
        errorClass="error-message1"
      />
      <ValidatedField
        name="firstPassword"
        label={translate('global.form.newpassword.label')}
        placeholder={translate('global.form.newpassword.placeholder')}
        type="password"
        onChange={updatePassword}
        validate={{
          required: { value: true, message: translate('global.messages.validate.newpassword.required') },
          minLength: { value: 4, message: translate('global.messages.validate.newpassword.minlength') },
          maxLength: { value: 50, message: translate('global.messages.validate.newpassword.maxlength') },
        }}
        data-cy="firstPassword"
        labelClass="custom-label-class"
        errorClass="error-message2"
      />
      <div className="password-strength-wrapper">
        <PasswordStrengthBar password={password} />
      </div>
      <ValidatedField
        name="secondPassword"
        label={translate('global.form.confirmpassword.label')}
        placeholder={translate('global.form.confirmpassword.placeholder')}
        type="password"
        validate={{
          required: { value: true, message: translate('global.messages.validate.confirmpassword.required') },
          validate: v => v === password || translate('global.messages.error.dontmatch'),
        }}
        data-cy="secondPassword"
        labelClass="custom-label-class"
        errorClass="error-message2"
      />
      <div className="register-footer">
        <Button color="secondary" className="custom-button btn-secondary" onClick={handleClose}>
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="register-submit" color="primary" type="submit" data-cy="submit" className="custom-button btn-primary">
          <Translate contentKey="register.form.button">Register</Translate>
        </Button>
      </div>
    </ValidatedForm>
  );
};
