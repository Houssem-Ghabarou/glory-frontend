import { ErrorMessages } from "./erreurMessages";

export function getErrorMessage(errorCode: number): string {
  return ErrorMessages[errorCode] ?? "Une erreur inconnue est survenue.";
}
