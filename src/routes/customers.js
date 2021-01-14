const errors = require("restify-errors");
const Customers = require("../models/customer");

module.exports = (server) => {
  //@Create Customers
  server.post("/customer", async (req, res, next) => {
    const customer = new Customers(req.body);
    try {
      await customer.save();
      res.json({ customer });
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });

  //@Get All customers
  server.get("/customers", async (req, res, next) => {
    try {
      const customers = await Customers.find({});
      res.json({ customers });
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
    next();
  });

  //@ Get a single customer
  server.get("/customer/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
      const customer = await Customers.findById(id);
      res.json({ customer });
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `The customer with the ID ${id} does not exist!`
        )
      );
    }
  });

  //@Update a customer
  server.put("/customer/:id", async (req, res, next) => {
    const id = req.params.id;

    try {
      const customer = await Customers.findOneAndUpdate({ _id: id }, req.body);
      res.json({ customer });
      console.log(`Updated customer ${customer}`);
      next();
    } catch (err) {
      return next(
        errors.ResourceNotFoundError(
          `The user with the id ${id} does not exist!`
        )
      );
    }
  });

  //@Delete a customer
  server.del("/customer/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
      const customer = await Customers.findOneAndRemove({ _id: id });
      res.json({ customer });
      next();
    } catch (err) {
      return next(
        errors.ResourceNotFoundError(
          `The user with the ID ${id} does not exist!`
        )
      );
    }
  });
};
