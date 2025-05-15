import { getErrorMessage } from "./getErrorMessage";

export async function login(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      // ici on suppose que `data.errorCode` est bien renvoyé par le backend
      return {
        success: false,
        error: getErrorMessage(data.errorCode),
        errorCode: data.errorCode,
      };
    }

    return {
      success: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erreur réseau ou inconnue",
    };
  }
}
