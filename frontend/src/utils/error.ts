export function getErrorMessage(error: unknown): string {
  const err = error as any;
  // Si viene de Axios y trae response.data.message
  if (err.response?.data?.message) {
    return err.response.data.message;
  }
  // Si trae mensaje genérico
  if (typeof err.message === 'string') {
    return err.message;
  }
  return 'Error inesperado';
}