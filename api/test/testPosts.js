const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

// Assertion style
chai.should();
// Plugins
chai.use(chaiHttp);
