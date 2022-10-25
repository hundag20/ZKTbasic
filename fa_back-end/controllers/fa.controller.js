const fa = async (req, res, model) => {
  try {
    //return select all rows
    const result = await model.query();
    return res.status(200).send({
      message: "success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: err,
    });
  }
};
module.exports = fa;
