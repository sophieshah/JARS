import { MongoClient, ServerApiVersion } from "mongodb";

const URI = "mongodb+srv://adminUser:testpassword@testcluster.co8jk.mongodb.net/?retryWrites=true&w=majority&appName=testcluster";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("JARS");

export default db;
