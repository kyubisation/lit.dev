import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
// NOTE: `html` is imported from the `@lit-labs/signals` package.
import {SignalWatcher, signal} from '@lit-labs/signals';
import {effect} from 'signal-utils/subtle/microtask-effect';

const count = signal(0);

@customElement('my-element')
export class MyElement extends SignalWatcher(LitElement) {
  @state() reactiveProp = 0;
  #loggerEffect = effect(() => {
    console.log('Do effect here!');
    console.log('The current count is:', count.get());
  });

  render() {
    return html`
      <p>
        The count is: ${count.get()}
        <button @click=${this.#onClick}>Increment</button>
      </p>
      <p>
        Try changing this reactive property: ${this.reactiveProp}
        <button @click=${() => this.reactiveProp++}>Increment</button>
      </p>
    `;
  }

  #onClick() {
    count.set(count.get() + 1);
  }
}
