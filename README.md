# Lab 10

Continuación del [Lab 9](https://github.com/harmar03/lab9). En este laboratorio se aplican cuatro características de Web Components al código existente:

1. **Shadow DOM** — los componentes encapsulan su estructura y estilos.
2. **Slots** — el contenido se proyecta desde fuera con `<slot>` (default y nombrados).
3. **Variables CSS** — cada componente expone variables (`--cuadrado-bg`, `--poster-bg`, etc.) que el consumidor puede sobrescribir.
4. **CSS Parts** — los elementos internos del Shadow DOM se exponen con `part="..."` para ser estilizados desde fuera con `::part()`.

## Componentes

- `lab2-cuadrado` — Cuadrado con filas. Slot `final` para el texto destacado, `cabecera` opcional. Parts: `contenedor`, `fila`, `fila-texto`, `flecha`, `fila-final`, `final-texto`.
- `lab2-poster` — Poster de campaña. Slots: `badge1`, `badge2`, `badge3`, `mensaje1`, `mensaje2`, `qr-texto`, `footer-titulo`, `footer-subtitulo`. Parts: `poster`, `header`, `qr`, `qr-placeholder`, `imagen`, `footer`, `footer-ucr`.

## Cómo correrlo

```bash
npm install
npm start
```

Servidor en `http://localhost:8080`.
