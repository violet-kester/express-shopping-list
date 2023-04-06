const express = require("express");

const { items } = require("./fakeDb");
const { NotFoundError } = require("./expressError");
const router = new express.Router();


/** return list of shopping items */
router.get("/", function (req, res) {

  return res.json({ items: items });
});

/** accept JSON body, add item, and return it */
router.post("/", function (req, res) {

  items.push(req.body);

  return res.status(201).
  json({ added: req.body });
});

/** return single item */
router.get("/:name", function (req, res) {

  const item = items.find(i => i.name === req.params.name);
  console.log(item);
  if (item) {
return res.json( item );
  }
  else {
    throw new NotFoundError()
  }
});

/** accept JSON body, modify item, return it */
router.patch("/:name", function (req, res) {

  const name = req.params.name;

  const item = items.find(i => i.name === name);
  console.log(item);

  if (item) {
    const data = req.body;
    for (const key in data) {
      if (key in item) {
        item[key] = data[key];
      }
    }
    return res.json({ updated: item });
  }
  else {
    throw new NotFoundError();
  }

});

/** delete item */
router.delete("/:name", function (req, res) {

  const name = req.params.name;

  const itemIndex = items.findIndex(i => i.name === name);
  if (itemIndex > -1) {
    items.splice(itemIndex, 1);
    return res.json({ message: "Deleted" });
  }
  else {
    throw new NotFoundError();
  }
});

module.exports = router;