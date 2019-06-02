"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Dot",
    embedded: false
  },
  {
    name: "Halo",
    embedded: false
  },
  {
    name: "Identity",
    embedded: false
  },
  {
    name: "Loop",
    embedded: false
  },
  {
    name: "Preferences",
    embedded: false
  },
  {
    name: "Circle",
    embedded: false
  },
  {
    name: "CircleJoinRequest",
    embedded: false
  },
  {
    name: "CircleInvite",
    embedded: false
  },
  {
    name: "Charity",
    embedded: false
  },
  {
    name: "Event",
    embedded: false
  },
  {
    name: "Transfer",
    embedded: false
  },
  {
    name: "Charge",
    embedded: false
  },
  {
    name: "Transaction",
    embedded: false
  },
  {
    name: "IdentityProvider",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
