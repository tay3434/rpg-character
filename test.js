import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { WiredButton, WiredCombo, WiredItem, WiredCheckbox, WiredSlider, WiredInput } from "wired-elements";
import "@haxtheweb/rpg-character/rpg-character.js";

export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const urlseed = urlParams.get('seed');
    console.log(urlseed);
    if (urlseed) {
      this.seed = urlseed;
    } else {
      this.seed = "0000000000";
    }
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
      size: { type: Number },
      accessories: { type: Number },
      base: { type: Number },
      face: { type: Number },
      faceItem: { type: Number },
      hair: { type: Number },
      pants: { type: Number },
      shirt: { type: Number },
      skin: { type: Number },
      hatColor: { type: Number },
      hat: { type: String },
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
        wired-item {
          opacity: 1;
        }
        wired-combo {
          flex: 1;
          width: 100%;
        }
        wired-checkbox {
          display: block;
          margin-top: var(--ddd-spacing-4);
          opacity: 1;
        }
        wired-button {
          margin-top: var(--ddd-spacing-4);
        }
        wired-slider {
          display: block;
          margin-bottom: var(--ddd-spacing-4);
          max-width: 300px;
        }
        wired-input {
          width: 100%;
          margin-bottom: var(--ddd-spacing-4);
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
            accessories="${this.accessories}"
            base="${this.base}"
            face="${this.face}"
            faceitem="${this.faceItem}"
            hair="${this.hair}"
            pants="${this.pants}"
            shirt="${this.shirt}"
            skin="${this.skin}"
            size="${this.size}"
            hatColor="${this.hatColor}"
            hat="${this.hat}"
            ?fire="${this.fire}"
            ?walking="${this.walking}"
            ?circle="${this.circle}"
            style="--character-size: ${this.size}px;" 
          ></rpg-character>
          <div class="seed-display">Seed: ${this.seed}</div>
        </div>
        <div class="inputs-panel">
          <h2>Customize Your Character</h2>
          ${this._renderNumericInputRow([
            { label: "Accessories", key: "accessories" },
            { label: "Base", key: "base" },
          ])}
          ${this._renderNumericInputRow([
            { label: "Face", key: "face" },
            { label: "Face Item", key: "faceItem" },
          ])}
          ${this._renderNumericInputRow([
            { label: "Hair", key: "hair" },
            { label: "Pants", key: "pants" },
          ])}
          ${this._renderNumericInputRow([
            { label: "Shirt", key: "shirt" },
            { label: "Skin", key: "skin" },
          ])}
          <label for="hat">Hat:</label>
          <wired-combo value="${this.hat}" @change="${this.updateProperty('hat')}">
            <option value="none" ?selected="${this.hat === 'none'}">None</option>
            <option value="bunny" ?selected="${this.hat === 'bunny'}">Bunny</option>
            <option value="coffee" ?selected="${this.hat === 'coffee'}">Coffee</option>
            <option value="construction" ?selected="${this.hat === 'construction'}">Construction</option>
            <option value="cowboy" ?selected="${this.hat === 'cowboy'}">Cowboy</option>
            <option value="education" ?selected="${this.hat === 'education'}">Education</option>
            <option value="knight" ?selected="${this.hat === 'knight'}">Knight</option>
            <option value="ninja" ?selected="${this.hat === 'ninja'}">Ninja</option>
            <option value="party" ?selected="${this.hat === 'party'}">Party</option>
            <option value="pirate" ?selected="${this.hat === 'pirate'}">Pirate</option>
            <option value="watermelon" ?selected="${this.hat === 'watermelon'}">Watermelon</option>
          </wired-combo>
          <label for="size">Character Size:</label>
          <wired-slider
            id="size"
            value="${this.size}"
            min="100"
            max="600"
            @change="${this._updateSize}"
          ></wired-slider>
          ${this._renderCheckbox("Fire", "fire")}
          ${this._renderCheckbox("Walking", "walking")}
          ${this._renderCheckbox("Circle", "circle")}
          <wired-button class="share" @click="${this._generateShareLink}">Share</wired-button>
        </div>
      </div>
    `;
  }

  _renderNumericInputRow(inputs) {
    return html`
      <div class="dropdown-row">
        ${inputs.map(
          (input) => html`
            <div class="dropdown-container">
              <label>${input.label}</label>
              <wired-input
                type="number"
                min="0"
                max="9"
                .value="${this[input.key]}"
                @input="${this.updateProperty(input.key)}"
              ></wired-input>
            </div>
          `
        )}
      </div>
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

  updateProperty(property) {
    return (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      this[property] = value;
      this.updateSeed();
    };
  }

  _updateSize(e) {
    const newSize = e.detail
  }
}