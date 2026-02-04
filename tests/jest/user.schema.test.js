import { userSchema } from "../../app/schemas/user.schema.js";

describe("userSchema (validation Zod)", () => {
  const validUser = {
    firstName: "Erwan",
    lastName: "Mettouchi",
    email: "erwan@email.com",
    password: "MonPass1!",
  };

  // =====================
  // TEST 1 : Cas valide
  // =====================
  it("devrait accepter un utilisateur valide", () => {
    const result = userSchema.safeParse(validUser);

    // On vérifie que la validation passe
    expect(result.success).toBe(true);

    // On vérifie que les données parsées correspondent à ce qu'on a envoyé
    expect(result.data.firstName).toBe("Erwan");
    expect(result.data.email).toBe("erwan@email.com");
  });

  // =============================================
  // TEST 2 : Prénom manquant (champ vide)
  // =============================================
  it("devrait refuser si le prénom est vide", () => {
    const result = userSchema.safeParse({
      ...validUser, // on copie tout l'objet valide...
      firstName: "", // ...mais on remplace le prénom par une chaîne vide
    });

    // La validation doit échouer
    expect(result.success).toBe(false);

    // On vérifie que l'erreur concerne bien le champ "firstName"
    const issues = result.error.issues;
    const firstNameError = issues.find((issue) =>
      issue.path.includes("firstName"),
    );
    expect(firstNameError).toBeDefined();
    expect(firstNameError.message).toBe("Le prénom est requis");
  });

  // =============================================
  // TEST 3 : Email invalide
  // =============================================
  it("devrait refuser un email invalide", () => {
    const result = userSchema.safeParse({
      ...validUser,
      email: "pas-un-email",
    });

    expect(result.success).toBe(false);

    const emailError = result.error.issues.find((issue) =>
      issue.path.includes("email"),
    );
    expect(emailError).toBeDefined();
    expect(emailError.message).toBe("L'adresse mail est invalide");
  });

  // =============================================
  // TEST 4 : Mot de passe trop court
  // =============================================
  it("devrait refuser un mot de passe de moins de 8 caractères", () => {
    const result = userSchema.safeParse({
      ...validUser,
      password: "Ab1!", // seulement 4 caractères
    });

    expect(result.success).toBe(false);

    const passwordError = result.error.issues.find((issue) =>
      issue.path.includes("password"),
    );
    expect(passwordError).toBeDefined();
    expect(passwordError.message).toBe(
      "Le mot de passe doit faire au moins 8 caractères",
    );
  });

  // =============================================
  // TEST 5 : Mot de passe sans majuscule
  // =============================================
  it("devrait refuser un mot de passe sans majuscule", () => {
    const result = userSchema.safeParse({
      ...validUser,
      password: "monpass1!", // pas de majuscule
    });

    expect(result.success).toBe(false);

    const issues = result.error.issues;
    const uppercaseError = issues.find(
      (issue) => issue.message === "Une lettre majuscule requise",
    );
    expect(uppercaseError).toBeDefined();
  });

  // =============================================
  // TEST 6 : Mot de passe sans caractère spécial
  // =============================================
  it("devrait refuser un mot de passe sans caractère spécial", () => {
    const result = userSchema.safeParse({
      ...validUser,
      password: "MonPass12", // pas de caractère spécial
    });

    expect(result.success).toBe(false);

    const specialCharError = result.error.issues.find(
      (issue) => issue.message === "Un caractère spécial requis",
    );
    expect(specialCharError).toBeDefined();
  });

  // =============================================
  // TEST 7 : Prénom trop long (plus de 30 chars)
  // =============================================
  it("devrait refuser un prénom de plus de 30 caractères", () => {
    const result = userSchema.safeParse({
      ...validUser,
      firstName: "A".repeat(31), // 31 caractères
    });

    expect(result.success).toBe(false);

    const firstNameError = result.error.issues.find((issue) =>
      issue.path.includes("firstName"),
    );
    expect(firstNameError).toBeDefined();
    expect(firstNameError.message).toBe(
      "Le prénom ne peut pas dépasser 30 caractères",
    );
  });
});
