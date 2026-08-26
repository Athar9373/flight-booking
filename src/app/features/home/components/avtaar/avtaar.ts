import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideLogOut, lucideSettings, lucideUser } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'spartan-avatar',
  imports: [HlmAvatarImports, HlmDropdownMenuImports, HlmButtonImports, NgIcon, RouterLink],
  providers: [provideIcons({ lucideUser, lucideSettings, lucideLogOut })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      hlmBtn
      variant="ghost"
      size="icon"
      class="rounded-full"
      [hlmDropdownMenuTrigger]="menu"
      class="cursor-pointer"
    >
      <hlm-avatar>
        <img hlmAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" />
        <span hlmAvatarFallback>U</span>
      </hlm-avatar>
    </button>

    <ng-template #menu>
      <hlm-dropdown-menu>
        <hlm-dropdown-menu-group>
          <a routerLink="/profile">
            <button hlmDropdownMenuItem (click)="Profile()">
              <ng-icon name="lucideUser" />
              Profile
            </button>
          </a>
          <a routerLink="/settings">
            <button hlmDropdownMenuItem (click)="Settings()">
              <ng-icon name="lucideSettings" />
              Settings
            </button>
          </a>
        </hlm-dropdown-menu-group>
        <hlm-dropdown-menu-separator />
        <hlm-dropdown-menu-group>
          <button hlmDropdownMenuItem variant="destructive" (click)="Logout()">
            <ng-icon name="lucideLogOut" />
            Log out
          </button>
        </hlm-dropdown-menu-group>
      </hlm-dropdown-menu>
    </ng-template>
  `,
})
export class Avatar {
  private router = inject(Router);
  Profile() {
    this.router.navigate(['/profile']);
  }

  Settings() {
    this.router.navigate(['/settings']);
  }

  Logout() {
    this.router.navigate(['/logout']);
  }
}
