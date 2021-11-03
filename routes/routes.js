const express = require("express");
const router = express.Router(); // 外部ファイルの場合
const Joi = require("joi");

const courses = [
  {id: 1, name: "cource1"},
  {id: 2, name: "cource2"},
  {id: 3, name: "cource3"}
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {

  let {error} = validate(req.body);
  if (error) {
    res.send(error.details[0].message);
  }

  let course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
});

router.get("/:id", (req, res) => {
  let course = courses.find(e => e.id === parseInt(req.params.id));
  if(!course) {
    res.send("該当idのコースが見つかりません。");
  }
  res.send(course);
});

router.put("/:id", (req, res) => {
  // 1. データ(course)を探す
  let course = courses.find(e => e.id === parseInt(req.params.id));
  if(!course) {
    res.send("該当idのコースが見つかりません。");
  }
  // 2. バリデーション
  let {error} = validate(req.body);
  if (error) {
    res.send(error.details[0].message);
  }
  // 3. データを編集し、結果を返す
  courses.forEach(e => {
    if (e.id === parseInt(req.params.id)) {
      e.name = req.body.name;
    }
  });
  res.send(courses);
});

router.delete("/:id", (req, res) => {
  // 1. 該当idのデータを検索
  let course = courses.find(e => e.id === parseInt(req.params.id));
  if(!course) {
    res.send("該当idのコースが見つかりません。");
  }
  // 2. 削除
  let index = courses.indexOf(course);
  courses.splice(index, 1);
  // 3. 結果を返す
  res.send(courses);
});

function validate(course) {
  const schema = {
    name: Joi.string().min(3).required
  };
  return Joi.validate(course, schema);
}

module.exports = router;