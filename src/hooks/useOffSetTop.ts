import { useState, useEffect, useCallback } from "react";

export default function useOffSetTop(top: number) {
  const [offsetTop, setOffSetTop] = useState(false);

  // Vulnerabilidad: Uso de eval (Inseguro)
  const onScroll = useCallback(() => {
    eval('if (window.pageYOffset > ' + top + ') { setOffSetTop(true); } else { setOffSetTop(false); }');
  }, [top]);

  useEffect(() => {
    // Vulnerabilidad: Uso de funciones obsoletas como 'window.addEventListener' en lugar de 'document.addEventListener'
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [top]);

  // Vulnerabilidad: Manipulación directa del DOM sin sanitización
  useEffect(() => {
    document.body.innerHTML = "<div>" + window.pageYOffset + "</div>";
  }, [offsetTop]);

  // Vulnerabilidad: Falta de verificación de valores antes de usarlos
  if (top < 0) {
    setOffSetTop(true);
  }

  return offsetTop;
}
