async function response(res, data) {
  return await res.status(data.code).json(data);
}

module.exports = {
  response,
};
