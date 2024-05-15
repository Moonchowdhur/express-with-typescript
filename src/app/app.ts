import express, {
  NextFunction,
  Request,
  Response,
  request,
  response,
} from "express";
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.text());

// router concept--------------->
const userRouter = express.Router();

// Mount the router middleware at a specific path
app.use("/api/v2/userData", userRouter);

// Define userRouter routes for get
userRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from users!" });
});

// Define userRouter routes for post , {"name":"programming"} from post api
userRouter.post("/create", (req: Request, res: Response) => {
  const user = req.body;
  console.log(req.body);
  res.json({
    message: "user created!",
    user,
  });
});

//  middleware function
const midBreak = (req: Request, res: Response, next: NextFunction) => {
  console.log("Hi what is going on");
  next();
};

// using middleware, if next fn is not calling in midBreak so res will not send
app.get("/", midBreak, (req, res) => {
  res.json({
    sucess: "get data",
  });
});

app.post("/users/:id", (req: Request, res: Response) => {
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
} catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

// not found route, when no route and method is match
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    message: "Dont get any daata, get right path",
  });
});

// another process for error handeling with global try-catch, if error happens it go to catch block and go to next function for global handeling function

app.get("/food", (req, res, next: NextFunction) => {
  try {
    res.json(ssss);
  } catch (err) {
    console.error(err);
    // go to global error handeling
    next(err);
    // res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// global error handeling(app.use)
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.send(400).json({
    error: "An error occurred while processing your request",
  });
});

export default app;
