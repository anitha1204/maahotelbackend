// const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   res.json({ message: err.message });
// };

// module.exports = errorHandler;


const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

module.exports = errorHandler;
