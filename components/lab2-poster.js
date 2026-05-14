class Lab2Poster extends HTMLElement {
  static get observedAttributes() {
    return ['imagen'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const imagen = this.getAttribute('imagen') || 'imagenes/imagenchicos.png';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          /* Variables CSS personalizables */
          --poster-ancho: 300px;
          --poster-bg: #c8922a;
          --poster-radius: 10px;
          --poster-padding: 20px 16px 0;
          --poster-margin-top: 30px;
          --poster-fuente: 'Segoe UI', sans-serif;

          --badge-radius: 6px;
          --badge-padding: 6px 12px;
          --badge-tam: 18px;
          --badge-color: #ffffff;
          --badge-morado-bg: #6a1fc2;
          --badge-verde-bg: #00b89c;

          --texto-color: #4a2000;
          --texto-tam: 15px;
          --texto-tam-negrita: 17px;

          --qr-color: #4a2000;
          --qr-tam: 11px;
          --qr-placeholder-bg: #ffffff;

          --footer-bg: #c8922a;
          --footer-ucr-tam: 20px;
          --footer-ucr-color: #ffffff;
          --footer-texto-tam: 10px;
          --footer-texto-color: #ffffff;
          --footer-divider-color: rgba(255, 255, 255, 0.5);

          display: inline-block;
        }

        .poster {
          width: var(--poster-ancho);
          background-color: var(--poster-bg);
          border-radius: var(--poster-radius);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--poster-padding);
          margin-top: var(--poster-margin-top);
          font-family: var(--poster-fuente);
          animation: fadeSlideUp 0.8s ease forwards;
        }

        .poster-header {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
          margin-bottom: 16px;
        }

        ::slotted([slot^="badge"]) {
          padding: var(--badge-padding);
          border-radius: var(--badge-radius);
          font-size: var(--badge-tam);
          font-weight: 900;
          color: var(--badge-color);
          text-transform: uppercase;
          letter-spacing: 1px;
          animation: pulse 2s ease-in-out infinite;
        }

        ::slotted([slot="badge1"]),
        ::slotted([slot="badge3"]) {
          background-color: var(--badge-morado-bg);
        }

        ::slotted([slot="badge2"]) {
          background-color: var(--badge-verde-bg);
          animation-delay: 0.3s;
        }

        ::slotted([slot="mensaje1"]),
        ::slotted([slot="mensaje2"]) {
          color: var(--texto-color);
          font-size: var(--texto-tam);
          font-weight: 600;
          text-align: center;
          margin: 4px 0;
          display: block;
        }

        ::slotted([slot="mensaje2"]) {
          font-size: var(--texto-tam-negrita);
          font-weight: 900;
        }

        .poster-qr {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 12px 0;
          color: var(--qr-color);
          font-size: var(--qr-tam);
          text-align: center;
        }

        ::slotted([slot="qr-texto"]) {
          color: var(--qr-color);
          font-size: var(--qr-tam);
          text-align: center;
        }

        .qr-placeholder {
          width: 60px;
          height: 60px;
          background: var(--qr-placeholder-bg);
          border: 2px solid var(--qr-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: var(--qr-color);
          margin-top: 6px;
          border-radius: 4px;
        }

        .poster-imagen {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          overflow: hidden;
          max-height: 200px;
        }

        .poster-imagen img {
          width: 100%;
          height: 200px;
          object-fit: contain;
          object-position: bottom;
          mix-blend-mode: multiply;
          animation: float 3s ease-in-out infinite;
        }

        .poster-footer {
          width: 100%;
          background-color: var(--footer-bg);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 0;
          margin-top: 8px;
        }

        .footer-ucr {
          font-size: var(--footer-ucr-tam);
          font-weight: 900;
          color: var(--footer-ucr-color);
        }

        .footer-divider {
          width: 1px;
          height: 30px;
          background: var(--footer-divider-color);
        }

        ::slotted([slot^="footer-"]) {
          font-size: var(--footer-texto-tam);
          color: var(--footer-texto-color);
          font-weight: 600;
          line-height: 1.4;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes float {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      </style>

      <div class="poster" part="poster">
        <div class="poster-header" part="header">
          <slot name="badge1"></slot>
          <slot name="badge2"></slot>
          <slot name="badge3"></slot>
        </div>

        <slot name="mensaje1"></slot>
        <slot name="mensaje2"></slot>

        <div class="poster-qr" part="qr">
          <slot name="qr-texto"></slot>
          <div class="qr-placeholder" part="qr-placeholder"></div>
        </div>

        <div class="poster-imagen" part="imagen">
          <img src="${imagen}" alt="poster">
        </div>

        <div class="poster-footer" part="footer">
          <span class="footer-ucr" part="footer-ucr">UCR</span>
          <div class="footer-divider"></div>
          <slot name="footer-titulo"></slot>
          <div class="footer-divider"></div>
          <slot name="footer-subtitulo"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('lab2-poster', Lab2Poster);
