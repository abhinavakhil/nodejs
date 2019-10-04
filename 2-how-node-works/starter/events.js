const EventEmmiter = require("events");

const myEmitter = new EventEmmiter();

myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("customer name :abhinav");
});

myEmitter.on("newSale", stock => {
  console.log(`there are ${stock} items in stock 😀`);
});
myEmitter.emit("newSale", 9);
