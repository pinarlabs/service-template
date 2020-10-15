import createContainer from "../../src/inversify.config";
import request from "supertest";
import createApp from "../../src/app";
import { cleanUpMetadata } from "inversify-express-utils";
import TYPES from "../../src/types";



const container = createContainer();
const app = createApp(container);

describe("StatusController", () => {

  beforeEach(() => {
    cleanUpMetadata();
  });

  describe("GET /ping", () => {
    test("should return 200 OK", async () => {
      const response = await request(app).get("/api/v1/ping");

      expect(response.status).toBe(200);
    });
  });

  describe("GET /ready", () => {
    test("should return 200 OK when every service is ready", async () => {

      const response = await request(app).get("/api/v1/ready");

      expect(response.status).toBe(200);
    });

    test("should return 500 when db service is not ready", async () => {
      container.rebind(TYPES.DB).toConstantValue({
        authenticate: jest.fn().mockRejectedValue({})
      });

      const response = await request(app).get("/api/v1/ready");

      expect(response.status).toBe(500);
    });

  });

  describe("GET /health", () => {
    test("should return 200 OK", async () => {
      const response = await request(app).get("/api/v1/health");

      expect(response.status).toBe(200);
    });
  });

  describe("GET /notFound", () => {
    test("should return 200 OK", async () => {
      const response = await request(app).get("/api/v1/notFound");

      expect(response.status).toBe(404);
    });
  });
});
