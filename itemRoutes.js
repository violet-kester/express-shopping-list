const express = require("express");

const { items } = require("./fakeDb");
const router = new express.Router();


/** return list of shopping items */
router.get("/", function (req, res) {

  return res.json({ items: items });
});

/** accept JSON body, add item, and return it */
router.post("/", function (req, res) {

  items.push(req.body);

  return res.json({ added: req.body });
});

/** return single item */
router.get("/:name", function (req, res) {

  const item = items[req.params];

  return res.json({ item });
});

/** accept JSON body, modify item, return it */
router.patch("/:name", function (req, res) {

  const name = req.params.name;
  let item = {};

  for (const i of items) {
    if (i.name === name) {
      item = i;
    }
  }

  if (item) {
    const data = req.body;
    for (const key in data) {
      if (key in item) {
        item[key] = data[key];
      }
    }
  }

  return res.json({ updated: item });
});

/** delete item */
router.delete("/:name", function (req, res) {

  const name = req.params.name;

  for (let i in items) {
    if (items[i].name === name) {
      items.splice(i, 1);
    }
  }

  return res.json({ message: "Deleted" });
});

module.exports = router;