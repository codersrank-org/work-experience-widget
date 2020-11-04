import { fetchData } from './shared/fetch-data';
import { render } from './shared/render';
import { renderError } from './shared/render-error';
import { renderLoading } from './shared/render-loading';
import { formatData } from './shared/format-data';

// eslint-disable-next-line
const COMPONENT_TAG = 'codersrank-work-experience';
const STATE_IDLE = 0;
const STATE_LOADING = 1;
const STATE_ERROR = 2;
const STATE_SUCCESS = 3;

// eslint-disable-next-line
const STYLES = `$_STYLES_$`;

// eslint-disable-next-line
class CodersrankWorkExperience extends HTMLElement {
  constructor() {
    super();

    this.shadowEl = this.attachShadow({ mode: 'closed' });
    this.tempDiv = document.createElement('div');

    this.stylesEl = document.createElement('style');
    this.stylesEl.textContent = STYLES;
    this.shadowEl.appendChild(this.stylesEl);

    this.mounted = false;

    this.state = STATE_IDLE;

    this.data = null;
  }

  static get observedAttributes() {
    return ['username', 'logos', 'grid', 'max-items'];
  }

  get username() {
    return this.getAttribute('username');
  }

  set username(value) {
    this.setAttribute('username', value);
  }

  get logos() {
    const logos = this.getAttribute('logos');
    if (logos === 'true' || logos === '') return true;
    return false;
  }

  set logos(value) {
    this.setAttribute('logos', value);
  }

  get grid() {
    const grid = this.getAttribute('grid');
    if (grid === 'true' || grid === '') return true;
    return false;
  }

  set grid(value) {
    this.setAttribute('grid', value);
  }

  get maxItems() {
    const maxItems = parseInt(this.getAttribute('max-items') || 0, 10) || 0;
    return maxItems;
  }

  set maxItems(value) {
    this.setAttribute('max-items', value);
  }

  set ['max-items'](value) {
    this.setAttribute('max-items', value);
  }

  render() {
    const { username, mounted, state, shadowEl, data, logos, grid } = this;
    const ctx = {
      data,
      logos,
      grid,
    };

    if (!username || !mounted) return;
    if (state === STATE_SUCCESS) {
      this.tempDiv.innerHTML = render(ctx);
    } else if (state === STATE_ERROR) {
      this.tempDiv.innerHTML = renderError(ctx);
    } else if (state === STATE_IDLE || state === STATE_LOADING) {
      this.tempDiv.innerHTML = renderLoading(ctx);
    }

    let widgetEl = shadowEl.querySelector('.codersrank-work-experience');
    if (widgetEl) {
      widgetEl.parentNode.removeChild(widgetEl);
    }
    widgetEl = this.tempDiv.querySelector('.codersrank-work-experience');
    if (!widgetEl) return;
    this.widgetEl = widgetEl;
    shadowEl.appendChild(widgetEl);
  }

  loadAndRender() {
    const { username } = this;
    this.state = STATE_LOADING;
    this.render();
    fetchData(username)
      .then((profile) => {
        this.data = formatData(profile, this.maxItems);
        console.log(this.data);
        this.state = STATE_SUCCESS;
        this.render();
      })
      .catch(() => {
        this.state = STATE_ERROR;
        this.render();
      });
  }

  attributeChangedCallback() {
    if (!this.mounted) return;
    this.loadAndRender();
  }

  connectedCallback() {
    this.width = this.offsetWidth;
    this.mounted = true;
    this.loadAndRender();
  }

  disconnectedCallback() {
    this.mounted = false;
  }
}

// EXPORT
