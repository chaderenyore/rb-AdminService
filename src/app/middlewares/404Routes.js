module.exports = async function notFoundRoutes(req, res, next) {
    if (!req.route) {
        const data = {
            code: 404,
            status: "error",
            message: "This route does not exist "
        }
        await res.status(404).send(data);
    }
    next();
}