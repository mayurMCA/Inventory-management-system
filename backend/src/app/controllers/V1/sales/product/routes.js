import express from "express";
const app = express();
import { create, getAll, update, deleteById, getById } from "./product.js";
// import uploadFile from "../../../../middleware/upload.js";

app.get("/", getAll);
app.post("/create", create);
app.get("/:id", getById);
app.delete("/:id", deleteById);
app.put("/:id", update);
// app.get("/MasterData", MasterData);
// app.put("/deleteProductImg/:id", deleteProductImg);
// app.put("/addProductVariant/:id", addProductVariant);
// app.put("/updateProductVariant/:id", updateProductVariant);
// app.put("/deleteProductVariant/:id", deleteProductVariant);


export default app;
