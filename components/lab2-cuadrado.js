class Lab2Cuadrado extends HTMLElement {
  static get observedAttributes() {
    return ['items', 'final'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._items = [];
    this._final = 'UCR';
  }

  connectedCallback() {
    this._parseAttributes();
    this.render();
  }

  attributeChangedCallback() {
    this._parseAttributes();
    if (this.isConnected) this.render();
  }

  set items(value) {
    this._items = Array.isArray(value) ? value : [];
    this.render();
  }

  get items() {
    return this._items;
  }

  set final(value) {
    this._final = String(value ?? '');
    this.render();
  }

  get final() {
    return this._final;
  }

  _parseAttributes() {
    const raw = this.getAttribute('items');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) this._items = parsed;
      } catch {
        this._items = raw.split('|').map((s) => s.trim()).filter(Boolean);
      }
    }
    const finalAttr = this.getAttribute('final');
    if (finalAttr !== null) this._final = finalAttr;
  }

  render() {
    const filas = this._items
      .map(
        (texto) => `
          <div class="fila" part="fila">
            <span part="fila-texto">${texto}</span>
            <span part="flecha">&#10140;</span>
          </div>`
      )
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Variables CSS personalizables desde fuera */
          --cuadrado-ancho: 300px;
          --cuadrado-alto: 300px;
          --cuadrado-bg: #2980b9;
          --cuadrado-borde: #1a6fa0;
          --cuadrado-texto-color: #ffffff;
          --cuadrado-texto-tam: 14px;
          --cuadrado-final-bg: #ffffff;
          --cuadrado-final-color: #2980b9;
          --cuadrado-final-tam: 16px;
          --cuadrado-fuente: 'Segoe UI', sans-serif;

          display: inline-block;
        }

        .cuadrado {
          width: var(--cuadrado-ancho);
          height: var(--cuadrado-alto);
          background-color: var(--cuadrado-bg);
          border: 2px solid var(--cuadrado-borde);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: var(--cuadrado-fuente);
        }

        .cabecera {
          padding: 6px 10px;
          color: var(--cuadrado-texto-color);
          font-weight: 700;
          text-align: center;
        }

        ::slotted([slot="cabecera"]) {
          color: var(--cuadrado-texto-color);
        }

        .fila {
          flex: 1;
          border-bottom: 2px solid var(--cuadrado-texto-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          color: var(--cuadrado-texto-color);
          font-size: var(--cuadrado-texto-tam);
          font-weight: 500;
        }

        .fila-final {
          flex: 1;
          border-bottom: none;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fila-final::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 390px;
          height: 120px;
          background: var(--cuadrado-final-bg);
          border-radius: 50%;
        }

        .fila-final .contenido-final {
          position: relative;
          z-index: 1;
          color: var(--cuadrado-final-color);
          font-size: var(--cuadrado-final-tam);
          font-weight: 700;
        }
      </style>

      <div class="cuadrado" part="contenedor">
        <slot name="cabecera"></slot>
        ${filas}
        <div class="fila-final" part="fila-final">
          <span class="contenido-final" part="final-texto">
            <slot name="final">${this._final}</slot>
          </span>
        </div>
      </div>
    `;
  }
}

customElements.define('lab2-cuadrado', Lab2Cuadrado);
