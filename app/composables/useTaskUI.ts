export const useTaskUI = () => {
  const statusLabels: Record<string, string> = {
    todo: "Por hacer",
    progress: "En progreso",
    done: "Completado",
  };

  const statusColors: Record<string, string> = {
    todo: "grey-lighten-3 text-grey-darken-2",
    progress: "blue-lighten-4 text-blue-darken-2",
    done: "green-lighten-4 text-green-darken-2",
  };

  const getStatusColor = (status: string) => {
    return statusColors[status] || "grey";
  };

  const getStatusLabel = (status: string) => {
    return statusLabels[status] || status;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return {
    getStatusColor,
    getStatusLabel,
    formatDate,
  };
};
