import * as authService from "../services/auth.service.js";

export const login = (req, res) => {
  const token = authService.login(req.body);
  res.status(200).json({ type: "Bearer", token });
};
