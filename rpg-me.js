import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { WiredButton, WiredCombo, WiredItem, WiredCheckbox, WiredSlider } from "wired-elements";
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
    if (urlseed){
      this.seed = urlseed;
    }
    else {
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
      size: { type: Number},
      accessories: { type: Number },
      base: { type: Number },
      face: { type: Number },
      faceItem: { type: Number },
      hair: { type: Number },
      pants: { type: Number },
      shirt: { type: Number },
      skin: { type: Number },
      size: { type: Number },
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
        wired-combo {
          flex: 1;
          width: 100%;
          height: var(--ddd-spacing-10);
          margin-bottom: var(--ddd-spacing-6);
       
        }
        wired-item{
          opacity: 1;
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
          opacity: 1;
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
          <label for="accessories">Accessories:</label>
          <wired-input type="number" min="0" max="9" value="${this.accessories}" @input="${this.updateProperty('accessories')}"></wired-input>

          <label for="base">Base:</label>
          <wired-input type="number" min="0" max="1" value="${this.base}" @input="${this.updateProperty('base')}"></wired-input>

          <label for="face">Face:</label>
          <wired-input type="number" min="0" max="9" value="${this.face}" @input="${this.updateProperty('face')}"></wired-input>

          <label for="faceItem">Face Item:</label>
          <wired-input type="number" min="0" max="9" value="${this.faceItem}" @input="${this.updateProperty('faceItem')}"></wired-input>

          <label for="hair">Hair:</label>
          <wired-input type="number" min="0" max="9" value="${this.hair}" @input="${this.updateProperty('hair')}"></wired-input>

          <label for="pants">Pants:</label>
          <wired-input type="number" min="0" max="9" value="${this.pants}" @input="${this.updateProperty('pants')}"></wired-input>

          <label for="shirt">Shirt:</label>
          <wired-input type="number" min="0" max="9" value="${this.shirt}" @input="${this.updateProperty('shirt')}"></wired-input>

          <label for="skin">Skin:</label>
          <wired-input type="number" min="0" max="9" value="${this.skin}" @input="${this.updateProperty('skin')}"></wired-input>

          <label for="hatColor">Hat Color:</label>
          <wired-input type="number" min="0" max="9" value="${this.hatColor}" @input="${this.updateProperty('hatColor')}"></wired-input>

          <label for="hat">Hat:</label>
          <wired-combo id="hat" .selected="${this.hat}"
                @selected="${(e) => this._updateCheckbox('hat', e.detail.selected)}">
                  <wired-item value="none">None</wired-item>
                  <wired-item value="bunny">Bunny</wired-item>
                  <wired-item value="coffee">Coffee</wired-item>
                  <wired-item value="construction">Construction</wired-item>
                  <wired-item value="cowboy">Cowboy</wired-item>
                  <wired-item value="education">Education</wired-item>
                  <wired-item value="knight">Knight</wired-item>
                  <wired-item value="ninja">Ninja</wired-item>
                  <wired-item value="party">Party</wired-item>
                  <wired-item value="pirate">Pirate</wired-item>
                  <wired-item value="watermelon">Watermelon</wired-item>
                </wired-combo>

 
          <label for="size">Character Size:</label>
          <wired-slider 
          id="size"
          value="200" 
          min="100" max="600" 
          step="100"
          @change="${(e) => this._updateCheckbox('size', parseFloat(e.detail.value))}">
                </wired-slider>
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

  _updateSize(e) {
    const newSize = e.detail.value;
    this.size = newSize;
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
  updateProperty(property) {
    return (e) => {
      const value = e.target.selected ? e.target.selected.value : e.target.value;
      this[property] = value;
      this.updateSeed();
    };
  }
}

globalThis.customElements.define(RpgMe.tag, RpgMe);



