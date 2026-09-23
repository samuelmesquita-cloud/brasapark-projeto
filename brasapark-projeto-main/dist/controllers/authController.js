"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const SendMail_1 = require("../services/SendMail");
const register = async (req, res) => {
    const result = await authService_1.AuthService.register(req.body);
    if (process.env.NODE_ENV !== "test") {
        try {
            await (0, SendMail_1.sendWelcomeEmail)(result.user);
        }
        catch (error) {
            console.error("[email] Falha ao enviar boas-vindas; cadastro mantido:", error);
        }
    }
    res.status(201).json(result);
};
exports.register = register;
const login = async (req, res) => {
    const result = await authService_1.AuthService.login(req.body);
    res.status(200).json(result);
};
exports.login = login;
const me = async (req, res) => {
    const authReq = req;
    res.json({ user: authReq.user });
};
exports.me = me;
