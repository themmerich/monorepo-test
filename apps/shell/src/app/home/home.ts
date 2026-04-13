import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="home">
      <h1>monorepo-test shell</h1>
      <p>Use the navigation above to load one of the microfrontends.</p>
    </section>
  `,
  styles: [
    `
      .home {
        padding: 1.5rem;
        font-family: system-ui, sans-serif;
      }
      h1 {
        margin-top: 0;
      }
    `,
  ],
})
export class Home {}
