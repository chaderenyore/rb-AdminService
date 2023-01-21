module.exports = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema(req[property]);
    const valid = error == null;
    try {
      if (valid) {
        next();
      } else {
        const data = Array.isArray(error.details)
          ? error.details.map((error) => ({
              [String(error.path[0])]: error.message,
            }))
          : [
              {
                [String(error.message.split(" ")[0])]: error.message,
              },
            ];
        const err = {
          code: 422,
          status: "error",
          message: "validation failed",
          data,
        };
        return res.status(422).json(err);
      }
    } catch (error) {
        const err = {
            code: 422,
            status: "error",
            message: error.message,
          };
          return res.status(500).json(err);
    }
  };
};
