export default async (req, res, next) => {
  const isValidUUID = new RegExp(
    /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
  );
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      error: { message: 'Favor informar o identificador do cliente' },
    });
  }
  if (isValidUUID.test(id)) {
    return next();
  }
  return res.status(400).json({
    error: { message: 'Favor informar o identificador corretamente' },
  });
};
