import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";

import {
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  pattern,
  required,
} from "@angular/forms/signals";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { lucideEye, lucideEyeOff, lucideMail, lucideX } from "@ng-icons/lucide";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { HlmFieldImports } from "@spartan-ng/helm/field";
import { HlmInputGroupImports } from "@spartan-ng/helm/input-group";
import { Auth } from "../../../core/auth/auth";

@Component({
  imports: [
    HlmInputGroupImports,
    NgIcon,
    HlmFieldImports,
    HlmButtonImports,
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
  selector: "app-login-dialog",
  styleUrl: "./login-dialog.css",
  templateUrl: "./login-dialog.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "block" },
})
export class LoginDialog {
  Auth = inject(Auth);
  showLoginModal = this.Auth.showLoginModal;
  showPassword = signal<boolean>(false);
  showSignUpModal = this.Auth.showSignUpModal;
  showForgotPasswordModal = this.Auth.showForgotPasswordModal;

  protected readonly _model = signal({
    email: "",
    password: "",
  });

  public readonly form = form(
    this._model,
    (schemaPath) => {
      required(schemaPath.email, {
        message: "Email is required",
      });
      email(schemaPath.email, {
        message: "Enter a valid email address",
      });
      required(schemaPath.password, {
        message: "Password is required",
      });
      minLength(schemaPath.password, 8, {
        message: "Password must be at least 8 characters",
      });
      pattern(schemaPath.password, /[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      });
      pattern(schemaPath.password, /[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
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

  onForgotPasswordClick() {
    this.showLoginModal.set(false);
    if (this.showForgotPasswordModal) {
      this.showForgotPasswordModal.set(true);
    }
  }
}
