# Running a local DynamoDb instance via Docker

The below steps set up a local DynamoDb instance that runs within its own Docker container and is exposed on port 8042.
This instance is kept separate from the primary `docker-compose.yml` file as it simulates an external resource.

## Setup Instructions
1. Download and install Docker on your computer [link](https://docs.docker.com/get-docker/)
1. Download and install AWS CLI on your computer [link](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
1. Run startup script within devdb folder: `sh start-db.sh`

## Spindown Instructions
1. Run shutdown script within devdb folder: `sh stop-db.sh`

## Example setup for connecting client to local database:
```
const opts = {endpoint: "http://localhost:8042"};
const client = new DynamoDB.DocumentClient(opts);
expect(client).toBeInstanceOf(DynamoDB.DocumentClient);
var endpoint = new Endpoint(testEndpoint);
expect(client.service.endpoint).toEqual(endpoint);
```

## Reference
- [Deploying DynamoDB Locally to your Computer](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
- [How to Set Up a Local DynamoDB in a Docker Container](https://betterprogramming.pub/how-to-set-up-a-local-dynamodb-in-a-docker-container-and-perform-the-basic-putitem-getitem-38958237b968)