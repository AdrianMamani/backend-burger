// Devuelve la fecha actual en formato dd/mm/yyyy
export const getFechaActual = () => {
  const today = new Date();
  return today.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
