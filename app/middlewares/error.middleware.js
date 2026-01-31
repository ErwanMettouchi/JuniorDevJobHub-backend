export const errorMiddleware = (error, _, res, __) => {
  console.error("Erreur capturée :", error);
  // Handle "Bad Request" errors (e.g., invalid input)
  if (error.name === "BadRequestError") {
    return res.status(400).json({ message: error.message });
  }

  // Handle "Validation" errors (e.g., data validation failed)
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  // Handle Zod validation errors
  if (error.name === "ZodError") {
    const messages = error.errors.map((err) => err.message);
    return res.status(400).json({ messages });
  }

  if (error.name === "UnauthorizedError") {
    return res.status(401).json({ message: error.message });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: error.message });
  }

  if (error.name === "ForbiddenError") {
    return res.status(403).json({ message: error.message });
  }

  if (error.name === "NotFoundError") {
    return res.status(404).json({ message: error.message });
  }

  if (error.name === "ConflictError") {
    return res.status(409).json({ message: error.message });
  }

  return res.status(500).json({
    message: "Une erreur inattendue est survenue. Veuillez réessayez.",
  });
};
