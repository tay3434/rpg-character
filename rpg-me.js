import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { WiredButton, WiredCombo, WiredItem, WiredCheckbox } from "wired-elements";
import "@haxtheweb/rpg-character/rpg-character.js";
// import "wired-elements";

export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.seed = "0000000000";
    this.base = 0;
    this.accessories = 0;
    this.hair = 0;
    this.face = 0;
    this.faceItem = 0;
    this.shirt = 0;
    this.skin = 0;
    this.pants = 0;
    this.hatColor = 0;
    this.hat = "none";
    this.fire = false;
    this.walking = false;
    this.circle = false;
    this.size = 200;
  }

  static get properties() {
    return {
      seed: { type: String },
      hat: { type: String },
      fire: { type: Boolean },
      walking: { type: Boolean },
      circle: { type: Boolean },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          padding: var(--ddd-spacing-4);
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ddd-spacing-4);
        }
        .character-panel {
          text-align: center;
        }
        .inputs-panel {
          background-color: var(--ddd-theme-background-secondary);
          padding: var(--ddd-spacing-4);
        }
        .dropdown-row {
          display: flex;
          gap: var(--ddd-spacing-4);
          margin-bottom: var(--ddd-spacing-4);
        }
        .dropdown-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        wired-combo {
          flex: 1;
          width: 100%;
        }
        wired-checkbox {
          display: block;
          margin-top: var(--ddd-spacing-4);
        }
        wired-button {
          margin-top: var(--ddd-spacing-4);
        }
        .seed-display {
          margin-top: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-m);
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="character-panel">
          <rpg-character
            seed="${this.seed}"
            hat="${this.hat}"
            ?fire="${this.fire}"
            ?walking="${this.walking}"
            ?circle="${this.circle}"
          ></rpg-character>
          <div class="seed-display">Seed: ${this.seed}</div>
        </div>
        <div class="inputs-panel">
          <h2>Customize Your Character</h2>
          ${this._renderDropdownRow([
            { label: "Accessories", key: "accessories", range: 10 },
            { label: "Base", key: "base", range: 10 },
          ])}
          ${this._renderDropdownRow([
            { label: "Face", key: "face", range: 6 },
            { label: "Face Item", key: "faceItem", range: 10 },
          ])}
          ${this._renderDropdownRow([
            { label: "Hair", key: "hair", range: 10 },
            { label: "Pants", key: "pants", range: 10 },
          ])}
          ${this._renderDropdownRow([
            { label: "Shirt", key: "shirt", range: 10 },
            { label: "Skin", key: "skin", range: 10 },
          ])}
          ${this._renderDropdownRow([
            { label: "Hat Color", key: "hatColor", range: 10 },
            { label: "Hat", key: "hat", values: [
              "none",
              "bunny",
              "coffee",
              "construction",
              "cowboy",
              "education",
              "knight",
              "ninja",
              "party",
              "pirate",
              "watermelon",
            ] },
          ])}
          ${this._renderCheckbox("Fire", "fire")}
          ${this._renderCheckbox("Walking", "walking")}
          ${this._renderCheckbox("Circle", "circle")}
          <wired-button class="share" @click="${this._generateShareLink}">Share</wired-button>
        </div>
      </div>
    `;
  }

  _renderDropdownRow(dropdowns) {
    return html`
      <div class="dropdown-row">
        ${dropdowns.map((dropdown) =>
          html`<div class="dropdown-container">
            <label>${dropdown.label}</label>
            ${dropdown.values
              ? this._renderDropdownWithValues(dropdown.key, dropdown.values)
              : this._renderDropdown(dropdown.key, dropdown.range)}
          </div>`
        )}
      </div>
    `;
  }

  _renderDropdown(key, range) {
    return html`
      <wired-combo
        @selected="${(e) => this._updateSeed(key, e.detail.value)}"
      >
        ${Array.from({ length: range }, (_, i) => html`<wired-item value="${i}">${i}</wired-item>`)}
      </wired-combo>
    `;
  }

  _renderDropdownWithValues(key, values) {
    return html`
      <wired-combo
        @selected="${(e) => this._updateSeed(key, e.detail.value)}"
      >
        ${values.map((value) => html`<wired-item value="${value}">${value}</wired-item>`)}
      </wired-combo>
    `;
  }

  _renderCheckbox(label, key) {
    return html`
      <wired-checkbox
        ?checked="${this[key]}"
        @change="${(e) => this._updateCheckbox(key, e.target.checked)}"
      >
        ${label}
      </wired-checkbox>
    `;
  }

  _updateSeed(key, value) {
    const seedArray = this.seed.padEnd(10, "0").split("");
    const index = this._getSeedIndex(key);
    if (index >= 0) {
      seedArray[index] = value;
      this.seed = seedArray.join("");
    }
  }

  _getSeedIndex(key) {
    const mapping = {
      accessories: 0,
      base: 1,
      face: 2,
      faceItem: 3,
      hair: 4,
      pants: 5,
      shirt: 6,
      skin: 7,
      hatColor: 8,
    };
    return mapping[key] ?? -1;
  }

  _updateCheckbox(key, value) {
    this[key] = value;
  }

  _generateShareLink() {
    const link = `${location.origin}${location.pathname}?seed=${this.seed}&hat=${this.hat}&fire=${this.fire}&walking=${this.walking}&circle=${this.circle}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  }
}

globalThis.customElements.define(RpgMe.tag, RpgMe);

