import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*
  Archivo: ContadorTextoColorDemo.jsx
  Contiene dos componentes React:
   - Contador: un contador simple que incrementa según la prop `paso`.
   - TextoColor: muestra un texto con color inicial y permite cambiarlo a través de una caja de texto.

  Comentarios y documentación inline para que sea fácil de entender.
*/

// ------------------
// Componente: Contador
// ------------------
export function Contador({ paso }) {
  // Normalizamos `paso` a número. Si viene mal, usamos 1 como fallback.
  const step = Number(paso) || 1;

  // Estado del contador (inicia en 0)
  const [count, setCount] = useState(0);

  // Manejador para sumar el paso
  const handleIncrement = () => {
    setCount(prev => prev + step);
  };

  return (
    <div className="p-4 border rounded max-w-sm" style={{ background: '#fbfbfb' }}>
      <h3 style={{ margin: 0, marginBottom: 8 }}>Contador</h3>
      {/* Número visible */}
      <p aria-live="polite" style={{ fontSize: 28, margin: '8px 0' }}>{count}</p>

      {/* Botón para sumar */}
      <button onClick={handleIncrement} style={{ padding: '8px 12px', cursor: 'pointer' }}>
        Sumar
      </button>

      {/* Nota: se deja minimalista para que puedas adaptar estilos */}
    </div>
  );
}

Contador.propTypes = {
  // Permitimos que `paso` sea número o string (por ejemplo si viene de un input).
  paso: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Contador.defaultProps = {
  paso: 1,
};

// ------------------
// Componente: TextoColor
// ------------------
export function TextoColor({ colorInicial, texto }) {
  // Estado que mantiene el color actual del texto
  const [color, setColor] = useState(colorInicial || 'black');

  // Estado para el input que introduce el nuevo color
  const [inputColor, setInputColor] = useState('');

  // Actualiza el input controlado
  const handleInputChange = (e) => {
    setInputColor(e.target.value);
  };

  // Cambia el color si el input no está vacío
  const handleCambiarColor = () => {
    const val = inputColor.trim();
    if (val === '') return;
    // Aquí aceptamos valores CSS: nombres (red), hex (#ff0000), rgb(), etc.
    setColor(val);
    setInputColor(''); // limpiamos el input
  };

  return (
    <div className="p-4 border rounded max-w-sm mt-4" style={{ background: '#fff' }}>
      <h3 style={{ margin: 0, marginBottom: 8 }}>TextoColor</h3>

      {/* Texto mostrado con el color actual */}
      <p style={{ color, fontSize: 18, margin: '8px 0' }}>{texto}</p>

      {/* Control para cambiar color */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {/* Input de texto donde el usuario escribe el color deseado */}
        <input
          value={inputColor}
          onChange={handleInputChange}
          placeholder="ej: red o #ff0000"
          aria-label="Color nuevo"
          style={{ padding: '6px 8px' }}
        />

        {/* Botón para aplicar el cambio */}
        <button onClick={handleCambiarColor} style={{ padding: '6px 10px', cursor: 'pointer' }}>
          Cambiar color
        </button>
      </div>

      {/* Consejo: puedes cambiar el input por <input type="color" /> si quieres un picker */}
    </div>
  );
}

TextoColor.propTypes = {
  colorInicial: PropTypes.string,
  texto: PropTypes.string,
};

TextoColor.defaultProps = {
  colorInicial: 'black',
  texto: 'Este es un texto de ejemplo',
};

// ------------------
// Componente Demo (export default)
// ------------------
export default function AppDemo() {
  return (
    <div style={{ padding: 20, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h2 style={{ marginBottom: 12 }}>Demo: Contador y TextoColor</h2>

      {/* Usos de ejemplo */}
      <div style={{ display: 'grid', gap: 12 }}>
        {/* Contador con paso = 2 */}
        <Contador paso={2} />

        {/* TextoColor con color inicial y texto */}
        <TextoColor colorInicial="#333" texto="Texto que puede cambiar de color" />
      </div>
    </div>
  );
}
