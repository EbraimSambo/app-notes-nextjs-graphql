import React from 'react'
interface Props{
 atributes?: {
  color: string
}
}
const Loader = ({atributes={
  color: "#15803d"
}}: Props) => {

  const spinnerStyle = {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: `conic-gradient(#0000 10%, ${atributes.color})`,
    WebkitMask: 'radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 0)',
    animation: 'spinner-zp9dbg 1s infinite linear',
  };

  const keyframes = `
    @keyframes spinner-zp9dbg {
      to {
        transform: rotate(1turn);
      }
    }
  `;

  // Adiciona os keyframes ao estilo do documento
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  return <div style={spinnerStyle}></div>;
}

export default Loader