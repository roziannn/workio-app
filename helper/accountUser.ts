interface UserForm {
  name: string;
  email: string;
  role: string;
}

export const validateUser = (form: UserForm) => {
  const errors: Partial<Record<keyof UserForm, string>> = {};

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Invalid email";
  if (!form.role.trim()) errors.role = "Role is required";

  return errors;
};
