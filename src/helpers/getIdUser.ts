const { response, request } = require('express');

export const getId =  (req = response) => {
    return req.user._id.toString()
}