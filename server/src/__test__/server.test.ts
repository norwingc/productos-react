import request from "supertest";
import server from "../server";

describe("GET /api", () => {
    it("should return 200", async () => {
        const response = await request(server).get("/api");
        expect(response.status).toBe(200);
    });
});
