import { z } from "zod";
import { BloodType } from "./common";

export const validationChangePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Please enter correct old password."),
  newPassword: z.string().min(6, "New Password nust be at least 6 characters."),
  confirmPassword: z
    .string()
    .min(6, "New Password nust be at least 6 characters."),
});

export const validationLoginSchema = z.object({
  email: z.string().email("Please enter your valid email address."),
  password: z.string().min(6, "Password nust be at least 6 characters."),
});

const bloodTypeValues = BloodType.map((type) => type.value);

export const validationRegisterSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  location: z.string().min(1, "Please enter your location."),
  bloodType: z
    .string()
    .refine(
      (val) => bloodTypeValues.includes(val),
      "Please enter a valid blood type."
    ),
  email: z.string().email("Please enter your valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password must be no more than 100 characters long."),
  isBloodDonate: z.boolean(),
});
