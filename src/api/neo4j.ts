import { neo4jPassword, neo4jURI, neo4jUser } from "../config/neo4jConfig";
const neo4j = require("neo4j-driver");



let driver: any;

export const getNeo4jDriver = () => {
  if (!driver) {
    driver = neo4j.driver(neo4jURI, neo4j.auth.basic(neo4jUser, neo4jPassword));
  }
  return driver;
};


