import { Component } from '@angular/core';

@Component({
  selector: 'app-provisionstypen',
  standalone: true,
  template: `
    <section class="page">
      <h2>Provisionstypen</h2>
      <p>Platzhalter für die Verwaltung der Provisionstypen.</p>
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
export class Provisionstypen {}
