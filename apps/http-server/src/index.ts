import express from "express";
import cors from "cors";
import { client } from "@repo/db/client";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    
    const username = req.body.username;
    const age = req.body.age;
    if (!username || !age) {
      res.json({
        error: "Missing credentials",
      });
      return;
    }
    const user = await client.user.create({
      data: {
        username,
        age,
      },
    });

    res.json({
      message: "USer created",
    });
    return;
  } catch (error) {
    console.log(error);
    res.json({
      error: "Unexpected Error Occurred.",
    });
  }
});

app.get("/viewAll", async (req, res) => {
  const users = await client.user.findMany();
  res.json({
    users: users,
  });
  return;
});

app.listen(8080);
