"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    sendSuccess(res, data, message = 'Success', statusCode = 200) {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    sendError(res, message = 'Internal Server Error', statusCode = 500) {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}
exports.BaseController = BaseController;
