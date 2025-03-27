export const fetchEvents = async () => {
  try {
    const response = await fetch("eventos.json");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao carregar eventos:", err);
    return [];
  }
};
