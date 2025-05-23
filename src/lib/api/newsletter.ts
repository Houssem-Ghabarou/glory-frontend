import { subscribeToNewsletter } from "./newsletter-api";

export const handleNewsletterSubmit = async (
  email: string,
  onSuccess?: () => void,
  onError?: (message: string) => void
) => {
  const result = await subscribeToNewsletter(email);

  if (result.success) {
    onSuccess?.();
  } else {
    onError?.(result.message);
  }

  return result;
};
