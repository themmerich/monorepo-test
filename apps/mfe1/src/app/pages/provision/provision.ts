import { Component } from '@angular/core';

@Component({
  selector: 'app-provision',
  standalone: true,
  template: `
    <section class="page">
      <h2>Provision</h2>
      <p>Detailseite einer einzelnen Provision (Testinhalt).</p>
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
export class Provision {}
