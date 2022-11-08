const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

require("./server");

/*
TODO: Report outofsync problems to admins
*/
