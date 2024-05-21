import { RelationsFiltersType } from "../api/relations";

const neo4jURI = "neo4j+s://f01d6c6e.databases.neo4j.io";
const neo4jUser = "neo4j";
const neo4jPassword = "4oX3dVQYOQEZSqlSu6p766xqU6GSkANcsnGfoI33S5I";

const getDateFilter = (filter: [string | null, string | null]) => {
  if (!filter[0] && !filter[1]) return "";
  const d1 = filter[0] || "1970-01-01";
  const d2 = filter[1] || new Date().toISOString().split("T")[0];
  return `
  and localdatetime('${d1}') <p.date_added_to_db<localdatetime('${d2}') 
  and localdatetime('${d1}') <p.date_added_to_db<localdatetime('${d2}') 
    `;
};

const getKeywordFilter = (filter: string) => {
  const arr = filter
    .replaceAll('"', "'")
    .split(", ")
    .map((tag) => `"${tag}"`);
  return `where p.tag IN [${arr}]`;
};

const getNeo4jQuery = (filters: RelationsFiltersType) => {
  let st = `MATCH (p:Post)-[]-(u:Person)
  ${getKeywordFilter(filters.keyword)}
  ${getDateFilter(filters.date)}
 with u, size(collect(p)) as posts_size
   where posts_size>4  
   WITH * 
   MATCH path=(u)--(p2:Post)
   RETURN path`;
  return st;
};


export const neo4jTagsQuery = `
MATCH (p:Post)-[r:COMMENT|LIKE|SHARE]-(:Person)
WITH p.label AS Label, p.tag AS Tag, type(r) AS RelationType, count(r) AS Count
RETURN Label, Tag, RelationType, sum(Count) AS Total
ORDER BY Label, Tag, RelationType
`

const neo4jUsersQuery = (postId: string) =>
  `match (p:Post ) where elementId(p)="${postId}" match (p)<-[r]-(u:Person) return p, u,r`;

export { neo4jURI, neo4jUser, neo4jPassword, neo4jUsersQuery, getNeo4jQuery };
