const awaitHandlerFactory = handler => async (req, res, next) => {
  return await handler(req, res, next)
    .catch(err => {
      return res.status(err.status || INTERNAL_SERVER).send(err);
    })
};
