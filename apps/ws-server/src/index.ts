import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocketServer({
    port: 8081
});

server.on("connection", async (socket) => {
    const res = await client.user.create({
        data: {
            username: Math.random().toString(),
            age: 32
        }
    })
    console.log(res);
    socket.send("Hi there you are connected to the server");
})