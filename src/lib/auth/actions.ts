"use server";

// Server Actions for authentication.
// Called from LoginForm, RegisterForm, and logout buttons.

export async function loginAction(_prev: unknown, formData: FormData) {
  // TODO: Validate with loginSchema, call Firebase REST API to exchange
  // email/password for an ID token, then create a session cookie via
  // adminAuth.createSessionCookie() and set it as an httpOnly cookie.
  void formData;
  throw new Error("Not implemented");
}

export async function registerAction(_prev: unknown, formData: FormData) {
  // TODO: Validate with registerSchema, call Firebase Auth REST API to
  // create user, then create Firestore /users doc via Cloud Function trigger.
  void formData;
  throw new Error("Not implemented");
}

export async function logoutAction() {
  // TODO: Clear session cookie and redirect to landing page.
  throw new Error("Not implemented");
}

export async function sendVerificationEmailAction(email: string) {
  // TODO: Call Firebase Auth REST API to send verification email.
  void email;
  throw new Error("Not implemented");
}
