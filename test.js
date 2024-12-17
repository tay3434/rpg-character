import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import { WiredButton, WiredInput } from "wired-elements";
import 'wired-elements/lib/wired-slider.js';
import 'wired-elements/lib/wired-checkbox.js';
import 'wired-elements/lib/wired-combo.js';
import 'wired-elements/lib/wired-item.js';

export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.accessories = 0;
    this.base = 0;
    this.leg = "0";
    this.face = 0;
    this.faceItem = 0;
    this.hair = 0;
    this.pants = 0;
    this.shirt = 0;
    this.skin = 0;
    this.hatColor = 0;
    this.hat = "none";
    this.fire = false;
    this.walking = false;
    this.circle = false;
    this.seed = "0000000000";
    this.scale = 2.5;
    this._applySeed();
  }

  static get properties() {
    return {
      ...super.properties,
      accessories: { type: Number },
      base: { type: Number },
      leg: { type: Number },
      face: { type: Number },
      faceItem: { type: Number },
      hair: { type: Number },
      pants: { type: Number },
      shirt: { type: Number },
      skin: { type: Number },
      hatColor: { type: Number },
      hat: { type: String },
      fire: { type: Boolean },
      walking: { type: Boolean },
      circle: { type: Boolean },
      seed: { type: String },
      scale: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-default-coalyGray);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-secondary);
        --rpg-character-scale: 2.5;
      }
      .wrapper {
        display: flex;
        padding: var(--ddd-spacing-4);
        flex-wrap: wrap;
      }
      .character-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-pughBlue);
        border-radius: var(--ddd-radius-md);
        outline-style: double;
        outline-color: var(--ddd-theme-default-potential70);
        outline-width: var(--ddd-spacing-4);
        box-sizing: border-box;
      }
      rpg-character {
        transform: scale(var(--rpg-character-scale, 2.5));
        margin: var(--ddd-spacing-28);
      }
      .seed, #share-button, a {
        padding: var(--ddd-spacing-2);
      }
      #share-button {
        font-size: var(--ddd-font-size-xxs);
      }
      .elements-box {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--ddd-theme-default-skyLight);
        border-radius: var(--ddd-radius-md);
        margin-left: var(--ddd-spacing-12);
        outline-style: double;
        outline-color: var(--ddd-theme-default-potential70);
        outline-width: var(--ddd-spacing-4);
      }
      table {
        width: 100%;
        height: 80%;
        border-spacing: var(--ddd-spacing-5);
        table-layout: fixed;
      }
      td {
        vertical-align: top;
        width: 33%;
        font-family: var(--ddd-font-secondary);
      }
      label {
        font-size: var(--ddd-font-size-ms);
        display: block;
        margin-bottom: var(--ddd-spacing-3);
        font-family: var(--ddd-font-secondary);
      }
      wired-slider, wired-combo {
        width: 100%;
        height: var(--ddd-spacing-10);
        margin-bottom: var(--ddd-spacing-6);
        font-family: var(--ddd-font-secondary);
      }
      wired-checkbox {
        height: auto;
        margin-top: var(--ddd-spacing-4);
        margin-bottom: var(--ddd-spacing-4);
        font-family: var(--ddd-font-secondary);
      }
      wired-item {
        opacity: 1;
      }
      .notification {
          position: fixed;
          bottom: var(--ddd-spacing-5);
          right: var(--ddd-spacing-6);
          background-color: var(--ddd-theme-default-opportunityGreen);
          color: var(--ddd-theme-default-white);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          border-radius: var(--ddd-radius-sm);
          font-size: var(--ddd-font-size-4xs);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .notification.show {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .wrapper {
            flex-direction: column;
            padding: var(--ddd-spacing-2);
          }
          .elements-box {
            margin-left: var(--ddd-spacing-0);
            margin-top: var(--ddd-spacing-4);
          }
          rpg-character {
            transform: scale(1.5);
          }
          table td {
            width: 100%;
          }
          label {
            font-size: var(--ddd-font-size-xxs);
          }
        }
    `];
  }

  render() {
    return html`
    <div class="wrapper">
      <div class="character-box">
        <rpg-character
          style="--rpg-character-scale: ${this.scale}"
          .accessories="${this.accessories}"
          .base="${this.base}"
          .leg="${this.leg}"
          .face="${this.face}"
          .faceItem="${this.faceItem}"
          .hair="${this.hair}"
          .pants="${this.pants}"
          .shirt="${this.shirt}"
          .skin="${this.skin}"
          .hatColor="${this.hatColor}"
          .hat="${this.hat}"
          .walking="${this.walking}"
          .circle="${this.circle}"
          .fire="${this.fire}">
        </rpg-character>
        <div class="seed">Seed: ${this.seed}</div>
        <wired-button id="share-button" @click="${this._generateLink}">Share</wired-button>
        <a href="https://github.com/haxtheweb/issues/issues/1414" target="_blank">Issue</a>
      </div>
      <div id="notification" class="notification"></div>
      <div class="elements-box">
        <table>
          <tr>
            <td>
              <label for="accessories">Accessories</label>
                <wired-slider id="accessories" value="0" min="0" max="9"  
                  @change="${(e) => this._updateSetting('accessories', parseInt(e.detail.value))}">
                </wired-slider>
                <label for="base">Hair</label>
                <wired-slider id="base" value="0" min="0" max="1" 
                  @change="${(e) => this._updateSetting('base', parseInt(e.detail.value))}">
                </wired-slider>
              <label for="face">Face</label>
                <wired-slider id="face" value="0" min="0" max="5" 
                  @change="${(e) => this._updateSetting('face', parseInt(e.detail.value))}">
                </wired-slider>
                <wired-checkbox id="fire" ?checked="${this.fire === 1}"
                  @change="${(e) => this._updateSetting('fire', e.target.checked ? 1 : 0)}">On Fire
                </wired-checkbox>
                <wired-checkbox id="walking" ?checked="${this.walking === 1}"
                  @change="${(e) => this._updateSetting('walking', e.target.checked ? 1 : 0)}">Walking
                </wired-checkbox>
                <wired-checkbox id="circle" ?checked="${this.circle === 1}"
                  @change="${(e) => this._updateSetting('circle', e.target.checked ? 1 : 0)}">Circle
                </wired-checkbox>
            </td>
            <td>
              <label for="faceItem">Face Item</label>
                <wired-slider id="faceItem" value="0" min="0" max="9"
                  @change="${(e) => this._updateSetting('faceItem', parseInt(e.detail.value))}">
                </wired-slider>
              <label for="hair">Hair Color</label>
                <wired-slider id="hair" value="0" min="0" max="9"
                  @change="${(e) => this._updateSetting('hair', parseInt(e.detail.value))}">
                </wired-slider>
              <label for="pants">Pants</label>
                <wired-slider id="pants" value="0" min="0" max="9" step="1"
                  @change="${(e) => this._updateSetting('pants', parseInt(e.detail.value))}">
                </wired-slider>
              <label for="hatColor">Hat Color</label>
                <wired-slider id="hatColor" value="0" min="0" max="9"
                  @change="${(e) => this._updateSetting('hatColor', parseInt(e.detail.value))}">
                </wired-slider>  
            </td>
            <td>
              <label for="hat">Hat</label>
                <wired-combo id="hat" .selected="${this.hat}"
                @selected="${(e) => this._updateSetting('hat', e.detail.selected)}">
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
                <label for="shirt">Shirt</label>
                <wired-slider id="shirt" value="0" min="0" max="9"
                  @change="${(e) => this._updateSetting('shirt', parseInt(e.detail.value))}">
                </wired-slider>
                <label for="skin">Skin</label>
                <wired-slider id="skin" value="0" min="0" max="9"
                  @change="${(e) => this._updateSetting('skin', parseInt(e.detail.value))}">
                </wired-slider>
                <label for="scale">Size</label>
                <wired-slider id="scale" value="2.5" min="1" max="3" step=".5"
                  @change="${(e) => this._updateSetting('scale', parseFloat(e.detail.value))}">
                </wired-slider>
            </td>
          </tr>
        </table>
      </div>
    </div>`;
  }

  _applySeed() {
    const seed = this.seed;
    const paddedSeed = seed.padStart(10, "0").slice(0, 10);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
  
      this.accessories = values[0];
      this.base = values[1];
      this.leg = values[2];
      this.face = values[3];
      this.faceItem = values[4];
      this.hair = values[5];
      this.pants = values[6];
      this.shirt = values[7];
      this.skin = values [8];
      this.hatColor = values[9];

    this.requestUpdate();
  }

  _updateSetting(key, value) {
    this[key] = value;
    this._generateSeed();
    this.requestUpdate();
  }

  _generateSeed() {
    this.seed = `${this.accessories}${this.base}${this.leg}${this.face}${this.faceItem}${this.hair}${this.pants}${this.shirt}${this.skin}${this.hatColor}`;
  }

  _generateLink() {
    const baseUrl = window.location.href.split("?")[0];
    const params = new URLSearchParams({ seed: this.seed }).toString();
    const shareLink = `${baseUrl}?${params}`;
  
    navigator.clipboard.writeText(shareLink).then(
      () => this._showNotification("Link copied!"),
      (err) => this._showNotification(`Error: ${err}`)
    );
  }

  _showNotification(message) {
    const notification = this.shadowRoot.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);

    if (params.has("seed")) {
      this.seed = params.get("seed");
      this._applySeed();
    }
    this.requestUpdate();
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgMe.tag, RpgMe);