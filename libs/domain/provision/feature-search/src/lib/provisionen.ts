import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-provisionen',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page">
      <h2>Provisionen</h2>
      <p>Hier erscheint später die Liste der Provisionen.</p>
      <p><a routerLink="../provision">Zur Provision-Detailseite</a></p>
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
export class Provisionen {}
