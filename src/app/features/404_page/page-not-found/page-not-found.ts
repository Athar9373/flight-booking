import { Component, inject } from '@angular/core';
import { Navbar } from '../../home/components/navbar/navbar';
import { Button } from '../../home/components/button/button';
import { Router } from '@angular/router';

@Component({
  imports: [Navbar, Button],
  selector: 'app-page-not-found',
  styleUrl: './page-not-found.css',
  template: ` <app-navbar></app-navbar>
    <div class="h-screen w-screen flex justify-center items-center flex-col gap-5">
      <div class="mt-20 flex justify-center flex-col items-center gap-6">
        <h1 class="text-4xl font-bold">Page not found!</h1>
        <p>With MakeMyTrip you can go anywhere. But first you need to go back to the homepage.</p>
        <spartan-button
          buttonName="Go back"
          (actionTriggered)="HomePageRedirect()"
        ></spartan-button>
      </div>
      <div>
        <img src="./404.svg" alt="Page Not Found" class="w-500 h-110" />
      </div>
    </div>`,
})
export class PageNotFound {
  private router = inject(Router);

  HomePageRedirect() {
    this.router.navigateByUrl('');
  }
}
