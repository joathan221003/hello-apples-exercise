const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const mongoUrl = process.env.MONGO_URL || "mongodb://mongo:27017";
const dbName = process.env.MONGO_DB || "fruitdb";

async function getApplesQty() {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("fruits");

    const apples = await collection.findOne({ name: "apples" });
    return apples ? apples.qty : 0;
  } finally {
    await client.close();
  }
}

app.get("/", async (req, res) => {
  try {
    const applesQty = await getApplesQty();

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Hello Apples</title>
        </head>
        <body>
          <h1>Hello World 🍎</h1>
          <p>Number of apples in DB: <strong>${applesQty}</strong></p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error fetching apples quantity:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(\`App listening on port ${port}\`);
});