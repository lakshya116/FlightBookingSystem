const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
require("./db/conn");
const register = require("./models/registers");
const adminsch = require("./models/adminmod");
const flightdata = require("./models/flights");
const bookingsch = require("./models/booking");
const port = process.env.PORT || 3000;
const view_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const css_path = express.static(
  path.join(__dirname, "../node_modules/bootstrap/dist/css")
);
const js_path = express.static(
  path.join(__dirname, "../node_modules/bootstrap/dist/js")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const css_path = path.join(__dirname, "../node_modules/bootstrap/dist/css");
// const js_path = path.join(__dirname, "../node_modules/bootstrap/dist/js");
app.set("view engine", "hbs");
app.set("views", view_path);
app.use(express.static(path.join(__dirname, "../public")));
app.use("/css", css_path);
app.use("/js", js_path);
hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/admin", (req, res) => {
  res.render("adminlogin");
});
app.get("/booking", (req, res) => {
  res.render("booking");
});
app.get("/adminregister", (req, res) => {
  res.render("adminregister");
});

app.post("/adminregister", (req, res) => {
  const adminuser = new adminsch({
    email: req.body.emailAddress,
    password: req.body.password,
  });
  console.log(adminuser);
  const registeredus = adminuser.save();
  res.status(200).render("adminlogin");
});
app.post("/login", (req, res) => {
  try {
    const email = req.body.email;
    const upasssword = req.body.password;
    async function start() {
      const result = await register.findOne({ Email: email });
      return result;
    }
    const user = start().then((result) => {
      console.log(result);
      if (result.password === upasssword) {
        res.status(200).render("booking");
      } else {
        res.send("wrong credentials failed");
      }
    });
  } catch (error) {
    console.error("error");
  }
});

app.post("/register", (req, res) => {
  const registeredUser = new register({
    name: req.body.name,
    password: req.body.password,
    Birthday: req.body.birthdayDate,
    Gender: req.body.inlineRadioOptions,
    Email: req.body.emailAddress,
    Phonenumber: req.body.phoneNumber,
  });

  console.log(registeredUser);
  const registeredus = registeredUser.save();
  res.status(200).render("booking");
  // console.log(req.body);
});

app.post("/admin", (req, res) => {
  try {
    const emaila = req.body.email;
    const upasssword = req.body.password;
    async function start() {
      const result = await adminsch.findOne({ email: emaila });
      return result;
    }
    const user = start().then((result) => {
      console.log(result);
      if (result.password === upasssword) {
        res.status(200).render("addflight");
      } else {
        res.send("wrong credentials failed");
      }
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/addflight", async (req, res) => {
  console.log(req.body);
  const flightdt = new flightdata({
    DepartureLocation: req.body.departure,
    ArrivalLocation: req.body.arrival,
    DepartureDate: req.body.departuretime,
    ArrivalDate: req.body.arrivaltime,
    EconomySeats: req.body.economyseats,
    BusinessSeats: req.body.businessseats,
    FirstClassSeats: req.body.firstclassseats,
    EconomySeatPrice: req.body.economyprice,
    BusinessSeatPrice: req.body.businessprice,
    FirstClassSeatPrice: req.body.firstprice,
    RefundableStatus: req.body.refundable,
    AirwaysName: req.body.Airwaysname,
  });
  // console.log(flightdt);
  // console.log(req.body);
  const registeredus = flightdt.save();
  res.status(200).render("addflight");

  // res.send(req.body);
});
app.get("/addflight", (req, res) => {
  res.render("addflight");
});
app.get("/allflights", (req, res) => {
  async function start() {
    const result = await adminsch.findOne({});
    return result;
  }
  const user = start().then((result) => {
    res.render("allflights", { result : result });
  });
});
app.post("/showflight", (req, res) => {
  try {
    const departure = req.body.departure;
    const arrival = req.body.arrival;
    const departdate = req.body.departdate;
    async function start() {
      const result = await flightdata.findOne({
        DepartureLocation: departure,
        ArrivalLocation: arrival,
        DepartureDate: { $gte: departdate },
      });

      return result;
    }
    const user = start().then((result) => {
      console.log(result.id);
      res.status(200).render("showflight", { result: result });
    });
  } catch (error) {
    console.error("error");
  }
});
app.post("/bk", (req, res) => {
  const book = new bookingsch({
    id: req.body.id,
    price: req.body.price,
  });
  const sdf = book.save();
  // res.status(200).render("index");
  res.render("booking");
  console.log("here");
});
app.listen(port, () => {
  console.log("server is running");
});
