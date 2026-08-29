import { ChangeDetectionStrategy, Component, effect, inject, model, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff, lucideMail, lucideX } from '@ng-icons/lucide';

import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import {
  HlmField,
  HlmFieldDescription,
  HlmFieldLabel,
  HlmFieldSeparator,
} from '@spartan-ng/helm/field';
import { HlmButton } from '@spartan-ng/helm/button';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';

@Component({
  selector: 'login-model',
  standalone: true,
  imports: [
    HlmInputGroupImports,
    NgIcon,
    HlmField,
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
      lucideMail,
      lucideEye,
      lucideEyeOff,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <!-- Modal Backdrop -->
    <div
      class="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-4 "
      (click)="closeLoginModel()"
    >
      <!-- Modal Content Card -->
      <div
        (click)="$event.stopPropagation()"
        class="relative flex w-full max-w-100 flex-col rounded-xl border border-border bg-card p-6 shadow-lg"
      >
        <!-- Close Button -->
        <button
          type="button"
          (click)="closeLoginModel()"
          class="absolute right-4 top-4 rounded-sm text-muted-foreground transition-opacity hover:text-foreground focus:outline-none "
        >
          <ng-icon name="lucideX" size="23" class="cursor-pointer" />
        </button>

        <!-- Logo -->
        <div class="mb-4 flex justify-center">
          <img src="/logo1.png" alt="Make my trip" class="h-13 object-contain" />
        </div>

        <div class="flex flex-col gap-4 mt-3">
          <!-- Google Login Button -->
          <button
            hlmBtn
            variant="outline"
            size="lg"
            type="button"
            class="w-full gap-2.5 rounded-xl border border-primary/80 cursor-pointer py-2 "
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="size-6 shrink-0">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span class="text-sm text-primary font-semibold">Login with Google</span>
          </button>

          <hlm-field-separator class="my-1 text-sm">Or continue with</hlm-field-separator>

          <!-- Login Form -->
          <form [formRoot]="form" class="flex flex-col gap-4">
            <!-- Email Field -->
            <hlm-field>
              <label hlmFieldLabel for="form-email">Email</label>
              <hlm-input-group class="h-11!">
                <input
                  hlmInputGroupInput
                  type="email"
                  placeholder="Enter your email"
                  id="form-email"
                  [formField]="form.email"
                  class="placeholder:text-sm"
                />
              </hlm-input-group>
              <p class="text-xs">
                @if (form.email().invalid() && form.email().touched()) {
                  {{ form.email().errors()[0]?.message }}
                }
              </p>
            </hlm-field>
            <!-- Password Field -->
            <hlm-field>
              <label hlmFieldLabel for="form-password">Password</label>
              <hlm-input-group class="h-11!">
                <input
                  hlmInputGroupInput
                  [type]="showPassword() ? 'text' : 'password'"
                  placeholder="Enter password"
                  id="form-password"
                  [formField]="form.password"
                  class="placeholder:text-sm"
                />
                <hlm-input-group-addon
                  align="inline-end"
                  class="cursor-pointer"
                  (click)="toggleShowPassword()"
                >
                  <ng-icon [name]="showPassword() ? 'lucideEyeOff' : 'lucideEye'" size="20" />
                </hlm-input-group-addon>
              </hlm-input-group>
              <p class="text-xs">
                @if (form.password().invalid() && form.password().touched()) {
                  {{ form.password().errors()[0]?.message }}
                }
              </p>
            </hlm-field>

            <button hlmBtn size="lg" type="submit" class="mt-2 w-full hover:bg-primary/80 text-sm">
              Submit
            </button>
          </form>

          <div>
            <p hlmFieldDescription class="text-center">
              Don't have an account?
              <a
                (click)="onSignUpClick()"
                class="font-medium underline underline-offset-4 hover:text-primary cursor-pointer"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Login {
  Auth = inject(Auth);
  showLoginModal = this.Auth.showLoginModal;
  showPassword = signal<boolean>(false);
  showSignUpModal = this.Auth.showSignUpModal;

  protected readonly _model = signal({
    email: '',
    password: '',
  });

  public readonly form = form(
    this._model,

    (schemaPath) => {
      required(schemaPath.email, {
        message: 'Email is required',
      });

      email(schemaPath.email, {
        message: 'Enter a valid email address',
      });

      required(schemaPath.password, {
        message: 'Password is required',
      });

      minLength(schemaPath.password, 8, {
        message: 'Password must be at least 8 characters',
      });

      pattern(schemaPath.password, /[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      });

      pattern(schemaPath.password, /[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character',
      });
    },

    {
      submission: {
        action: async () => {
          this.Auth.Login(this._model());

          if (this.Auth.isLoggedIn()) {
            this.showLoginModal.set(false);
          }
        },
      },
    },
  );

  toggleShowPassword() {
    this.showPassword.update((bool) => !bool);
  }

  closeLoginModel() {
    this.showLoginModal.set(false);
  }

  onSignUpClick() {
    this.showLoginModal.set(false);
    this.showSignUpModal.set(true);
  }
}
