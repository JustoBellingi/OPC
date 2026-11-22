// Error personalizado que además del mensaje guarda un código de estado HTTP.
// Lo lanzamos desde cualquier capa con: throw new HttpError(404, "No encontrado")
// y el middleware de errores sabe qué status responder.
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
