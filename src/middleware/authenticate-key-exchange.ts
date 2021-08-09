export const authenticateKeyExchange = async (req, res, next) => {
  const { providerToken, provider } = req.body;

  console.log("middleware", providerToken, provider);

  if (!providerToken || !provider)
    return res.status(401).send("Authentication failed, no data");

  const user = await validateProviderTokens(provider, providerToken);

  if (!user) return res.status(401).send("Provider Authentication failed");

  res.locals.email = user.email;

  next();
};

const validateProviderTokens = async (provider, token) => {
  // You should check if provider tokens supplied are valid
  await new Promise((r) => setTimeout(r, 1000)); // simulate awaiting some checks

  if (provider !== "facebook" || token !== "asimpletoken") return null;

  const user = {
    email: "test@user.com",
  };
  return user;
};
