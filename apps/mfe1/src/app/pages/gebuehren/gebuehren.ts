import { Component } from '@angular/core';

@Component({
  selector: 'app-gebuehren',
  standalone: true,
  template: `
    <section class="page">
      <h2>Gebühren</h2>
      <p>Platzhalter für die Gebühren-Definitionen.</p>
    </section>
  `,
  styles: [
    `
      .page {
        padding: 1.5rem;
        font-family: system-ui, sans-serif;
      }
      h2 {
        margin-top: 0;
      }
    `,
  ],
})
export class Gebuehren {}
