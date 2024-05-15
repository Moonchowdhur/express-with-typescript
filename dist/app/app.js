"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use(express_1.default.text());
// router concept--------------->
const userRouter = express_1.default.Router();
// Mount the router middleware at a specific path
app.use("/api/v2/userData", userRouter);
// Define userRouter routes for get
userRouter.get("/", (req, res) => {
    res.json({ message: "Hello from users!" });
});
// Define userRouter routes for post , {"name":"programming"} from post api
userRouter.post("/create", (req, res) => {
    const user = req.body;
    console.log(req.body);
    res.json({
        message: "user created!",
        user,
    });
});
//  middleware function
const midBreak = (req, res, next) => {
    console.log("Hi what is going on");
    next();
};
// using middleware, if next fn is not calling in midBreak so res will not send
app.get("/", midBreak, (req, res) => {
    res.json({
        sucess: "get data",
    });
});
app.post("/users/:id", (req, res) => {
    //  To get id use req.params
    const idd = req.params.id;
    console.log(idd);
    const user = req.body;
    console.log(user);
    res.json({
        sucess: "created data",
        user,
    });
});
// one process for error handeling with try-catch, if error happens it go to catch block
app.get("/food", (req, res) => {
    try {
        //   res.json("ssss");
        res.json(ssss);
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ error: "An error occurred while processing your request" });
    }
});
// not found route, when no route and method is match
app.all("*", (req, res) => {
    res.status(400).json({
        message: "Dont get any daata, get right path",
    });
});
// another process for error handeling with global try-catch, if error happens it go to catch block and go to next function for global handeling function
app.get("/food", (req, res, next) => {
    try {
        res.json(ssss);
    }
    catch (err) {
        console.error(err);
        // go to global error handeling
        next(err);
        // res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});
// global error handeling(app.use)
app.use((error, req, res, next) => {
    console.log(error);
    res.send(400).json({
        error: "An error occurred while processing your request",
    });
});
exports.default = app;
