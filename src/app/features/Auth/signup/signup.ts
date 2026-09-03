import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff, lucideX } from '@ng-icons/lucide';

import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import {
  HlmField,
  HlmFieldDescription,
  HlmFieldGroup,
  HlmFieldLabel,
  HlmFieldSeparator,
} from '@spartan-ng/helm/field';
import { HlmButton } from '@spartan-ng/helm/button';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
  selector: 'signup-model',
  standalone: true,
  imports: [
    HlmInputGroupImports,
    HlmSelectImports,
    NgIcon,
    HlmField,
    HlmFieldGroup,
    HlmFieldLabel,
    HlmFieldDescription,
    HlmFieldSeparator,
    HlmButton,
    FormRoot,
    FormsModule,
    FormField,
  ],
  providers: [
    provideIcons({
      lucideX,
      lucideEye,
      lucideEyeOff,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './signup.html',
})
export class Signup {
  Auth = inject(Auth);
  showSignupModel = this.Auth.showSignUpModal;
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  showLoginModal = this.Auth.showLoginModal;

  readonly countryCodes = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+1', flag: '🇺🇸', name: 'US' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
  ];

  itemToString = (code: string | null) => {
    const match = this.countryCodes.find((c) => c.code === code);
    return match ? `${match.flag} ${match.code}` : '';
  };

  protected readonly _model = signal({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  public readonly form = form(
    this._model,

    (schemaPath) => {
      required(schemaPath.firstName, {
        message: 'First name is required',
      });

      required(schemaPath.lastName, {
        message: 'Last name is required',
      });

      required(schemaPath.email, {
        message: 'Email is required',
      });
      email(schemaPath.email, {
        message: 'Enter a valid email address',
      });

      required(schemaPath.countryCode);

      required(schemaPath.mobile, {
        message: 'Mobile number is required',
      });
      pattern(schemaPath.mobile, /^[0-9]{10}$/, {
        message: 'Enter a valid 10-digit mobile number',
      });

      required(schemaPath.password, {
        message: 'Password is required',
      });
      minLength(schemaPath.password, 8, {
        message: 'Password must be at least 8 characters',
      });
      pattern(schemaPath.password, /[A-Z]/, {
        message: 'Must contain at least one uppercase letter',
      });
      pattern(schemaPath.password, /[^A-Za-z0-9]/, {
        message: 'Must contain at least one special character',
      });

      required(schemaPath.confirmPassword, {
        message: 'Confirm password is required',
      });
      validate(schemaPath.confirmPassword, (ctx) => {
        if (ctx.value() !== ctx.valueOf(schemaPath.password)) {
          return {
            kind: 'error',
            message: 'Passwords do not match',
          };
        }
        return null;
      });
    },

    {
      submission: {
        action: async () => {
          const { confirmPassword, countryCode, mobile, ...rest } = this._model();
          const fullMobileNumber = `${countryCode}${mobile}`;

          this.Auth.Signup({
            ...rest,
            mobile: fullMobileNumber,
          });

          if (this.Auth.isLoggedIn()) {
            this.showSignupModel.set(false);
          }
        },
      },
    },
  );

  toggleShowPassword() {
    this.showPassword.update((bool) => !bool);
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword.update((bool) => !bool);
  }

  closeSignupModel() {
    this.showSignupModel.set(false);
  }

  onLoginClicked() {
    this.showSignupModel.set(false);
    this.showLoginModal.set(true);
  }
}
