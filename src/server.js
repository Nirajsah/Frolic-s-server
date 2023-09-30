"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var cors_1 = require("cors");
var userRoutes_ts_1 = require("./routes/userRoutes.ts");
var postRoutes_ts_1 = require("./routes/postRoutes.ts");
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', userRoutes_ts_1.default);
app.use('/api', postRoutes_ts_1.default);
// app.use((err: any, req: any, res: any, next: any) => {
//   // Handle the error here and send an appropriate response
//   res.status(err.status || 500).json({ message: err.message })
// })
//
app.listen(PORT, function () {
    console.log("\uD83D\uDE80Server running on http://localhost:".concat(PORT));
});
