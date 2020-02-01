const runHttpHandler = fn => async (req, res) => {
    try {
        const result = await fn(req, res)
        return success(res, result)
    } catch (error) {
        failure(res, error)
    }
}

const failure = (res, error, status = 500) =>
    res.status(status).json({
        success: false,
        error: {
            name: !error || error.name === 'Error' ? 'Internal error' : error.name,
            message: error && error.message,
        },
    })

const success = (res, payload, status = 200) =>
    res.status(status).json({
        success: true,
        ...payload,
    })

module.exports = { runHttpHandler, failure, success }
