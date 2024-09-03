import { Request, Response } from "express";
import * as bcryptjs from "bcryptjs";
import { generateJWT } from "./../helpers/jwt";
import { login, register } from "./../controllers/UsersController";
import Users from "../models/User";

jest.mock("bcryptjs");
jest.mock("./../helpers/jwt");
jest.mock("../models/User");

const mockRequest = (body: any) =>
  ({
    body,
  } as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return 404 if user not found", async () => {
      const req = mockRequest({ email: "test@gmail.com", password: "123456" });
      const res = mockResponse();

      (Users.findOne as jest.Mock).mockResolvedValue(null);

      await login(req, res);

      expect(Users.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: "Correo o contraseña incorrecto",
      });
    });

    it("should return 404 if password is incorrect", async () => {
      const req = mockRequest({ email: "test@gmail.com", password: "123456" });
      const res = mockResponse();
      const user = {
        email: "test@gmail.com",
        password: "qDRpD8ZhEOfxhGIxLnqy9erVPjSqryKFfC0dPUQXcBp46VgJ9oVoS",
      };

      (Users.findOne as jest.Mock).mockResolvedValue(user);
      (bcryptjs.compareSync as jest.Mock).mockReturnValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: "Correo o contraseña incorrecto",
      });
    });

    it("should return 200 and token if login is successful", async () => {
      const req = mockRequest({ email: "test@gmail.com", password: "123456" });
      const res = mockResponse();
      const user = {
        id: "123",
        email: "test@gmail.com",
        password: "qDRpD8ZhEOfxhGIxLnqy9erVPjSqryKFfC0dPUQXcBp46VgJ9oVoS",
      };
      const token = "jwt-token";

      (Users.findOne as jest.Mock).mockResolvedValue(user);
      (bcryptjs.compareSync as jest.Mock).mockReturnValue(true);
      (generateJWT as jest.Mock).mockResolvedValue(token);

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith({
        ok: true,
        usuario: user,
        token,
      });
    });
  });

  describe("register", () => {
    xit("should register a new user with valid email and password", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(Users, "findOne").mockResolvedValue(null);
      jest.spyOn(Users.prototype, "save").mockResolvedValue();
      jest.spyOn(bcryptjs, "genSaltSync").mockReturnValue("salt");
      jest.spyOn(bcryptjs, "hashSync").mockReturnValue("hashedPassword");
      jest.spyOn(jwt, "generateJWT").mockResolvedValue("token");

      await register(req, res);

      expect(Users.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(bcryptjs.genSaltSync).toHaveBeenCalled();
      expect(bcryptjs.hashSync).toHaveBeenCalledWith("password123", "salt");
      expect(Users.prototype.save).toHaveBeenCalled();
      expect(jwt.generateJWT).toHaveBeenCalledWith(expect.any(String));
      expect(res.json).toHaveBeenCalledWith({
        ok: true,
        user: expect.any(Object),
        token: "token",
      });
    });

    it("should return 400 if email already exists", async () => {
      const req = mockRequest({
        email: "test@gmail.com",
        password: "12345678",
      });
      const res = mockResponse();

      (Users.findOne as jest.Mock).mockResolvedValue({
        email: "test@gmail.com",
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        ok: false,
        msg: "Correo existente, por favor prueba otro",
      });
    });
  });
});
