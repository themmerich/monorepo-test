import { Component } from '@angular/core';

@Component({
  selector: 'app-mfe1-test-page',
  standalone: true,
  template: `
    <section class="test-page">
      <h2>MFE1 test page</h2>
      <p>This page is served from microfrontend <strong>mfe1</strong>.</p>
    </section>
  `,
  styles: [
    `
      .test-page {
        padding: 1.5rem;
        font-family: system-ui, sans-serif;
      }
      h2 {
        margin-top: 0;
      }
    `,
  ],
})
export class TestPage {}
