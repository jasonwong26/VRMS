const { Endpoint, DynamoDB } = require("aws-sdk");

describe("DynamoDb", () => {
  expect(process.env.DOCKER_TABLE_NAME).toBeTruthy();
  expect(process.env.AWS_DOCKER_ENDPOINT).toBeTruthy();
  const testTable = process.env.DOCKER_TABLE_NAME || "";
  const testEndpoint = process.env.AWS_DOCKER_ENDPOINT || "";

  describe("construction tests", () => {
    it("successfully builds client", async () => {
      const opts = { region: "localhost", endpoint: testEndpoint };
      const client = new DynamoDB.DocumentClient(opts);
      expect(client).toBeInstanceOf(DynamoDB.DocumentClient);
      // Assert
      const endpoint = new Endpoint(testEndpoint);
      expect(client.service.endpoint).toEqual(endpoint);
    });
  });

  describe("docker integration tests", () => {
    const opts = {region: "localhost", endpoint: testEndpoint };
    const client = new DynamoDB.DocumentClient(opts);

    it("retrieves data from valid input", async () => {
      const params = {
        TableName: testTable,
        Key: {
          pk: "User#johnnytest@nowhere.com",
          sk: "Metadata"
        }
      };

      const data = await client.get(params).promise();
      expect(data).toBeDefined();
      expect(data.Item).toBeDefined();
      expect(params.Key.pk).toEqual(data.Item?.pk);
      expect(params.Key.sk).toEqual(data.Item?.sk);
    });
    it("returns null when retrieving non-existing record", async () => {
      const params = {
        TableName: testTable,
        Key: {
          pk: "NonExistingKey",
          sk: "Metadata"
        }
      };

      const data = await client.get(params).promise();
      expect(data).toBeDefined();
      expect(data.Item).toBeUndefined();
    });
    it("errors when retrieving non-existing table", async () => {
      const params = {
        TableName: "some other table",
        Key: {
          pk: "User#johnnytest@nowhere.com",
          sk: "Metadata"
        }
      };

      try {
        await client.get(params).promise();
        fail("did not throw expected error...");
      } catch (e) {
        expect(e.code).toEqual("ValidationException");
      }
    });
  });
});