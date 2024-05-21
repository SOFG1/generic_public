import { primaryInstance } from ".";
import {
  getNeo4jQuery,
  neo4jTagsQuery,
  neo4jUsersQuery,
} from "../config/neo4jConfig";
import { getNeo4jDriver } from "./neo4j";
const neo4j = require("neo4j-driver");

export type RelationsFiltersType = {
  keyword: string;
  date: [string | null, string | null];
};

export const Relations = {
  getTags: async () => {
    const driver = getNeo4jDriver();
    if (!driver) {
      return Promise.reject("Neo4j error occured");
    }
    var session = driver.session({
      defaultAccessMode: neo4j.session.READ,
    });
    return session
      .executeRead((tx: any) => tx.run(neo4jTagsQuery))
      .then((readResult: any) => {
        const tags: any[] = [];
        readResult.records.forEach((r: any) => {
          const tag = r.get("Tag");
          const label = r.get("Label");
          const relationType = r.get("RelationType");
          const total = r.get("Total");
          const item = {
            tag,
            label,
            relationType,
            total: total.low,
          };
          tags.push(item);
        });
        const tagsGroupped: any[] = [];
        tags.forEach((tag) => {
          const positive = tags.find(
            (t) => t.tag === tag.tag && t.label === "POSITIVE"
          );
          const negative = tags.find(
            (t) => t.tag === tag.tag && t.label === "NEGATIVE"
          );
          const alreadyAdded = tagsGroupped.find((t) => t.tag === tag.tag);
          if (alreadyAdded) return;
          let score = 0
          if(!negative?.total) score = 1
          if(!positive?.total) score = 0
          if(positive?.total && negative?.total) {
            const sum = positive.total + negative.total
            score = positive.total / sum
          }
          tagsGroupped.push({
            ...tag,
            score,
          });
        });

        return { data: tagsGroupped };
      })
      .catch((e: any) => {
        return e;
      })
      .finally(() => {
        session.close();
      });
  },
  getGraphData: async (filters: RelationsFiltersType) => {
    const driver = getNeo4jDriver();
    if (!driver) {
      return Promise.reject("Neo4j error occured");
    }
    var session = driver.session({
      defaultAccessMode: neo4j.session.READ,
    });
    const query = getNeo4jQuery(filters)
    console.log(query)
    return session
      .executeRead((tx: any) => tx.run(query))
      .then((readResult: any) => {
        const postsList: any[] = [];
        let usersList: any[] = [];
        const edgesList: any[] = [];
        readResult.records.forEach((r: any) => {
          const path = r.get("path")
          //handle Posts
          const post = path.segments[0].end
          const alreadyAddedPost = postsList.some(
            (p) => p.elementId === post.elementId
          );
          if (!alreadyAddedPost) {
            postsList.push(post);
          }
          //handle Users
          const user = path.segments[0].start
          const alreadyAddedUser = usersList.some(
            (u) => u.elementId === user.elementId
          );
          if (!alreadyAddedUser) {
            usersList.push(user);
          }
          //handle edges(relationships)
          const edge = path.segments[0].relationship
          const alreadyAddedEdge = edgesList.some(
            (e) => e.elementId === edge.elementId
          );
          if (!alreadyAddedEdge) {
            edgesList.push(edge);
          }
        });

        const usersListWithEdgesCount = usersList.map(u => {
          const count = edgesList.filter(e => e.startNodeElementId === u.elementId).length
          return {
            ...u,
            edgesCount: count
          }
        })
        return {
          data: {
            posts: postsList,
            persons: usersListWithEdgesCount,
            relations: edgesList,
          },
        };
      })
      .catch((e: any) => {
        console.log("error", e)
        return e;
      })
      .finally(() => {
        session.close();
      });
  },
  getPostData: async (postId: string) => {
    const driver = getNeo4jDriver();
    if (!driver) {
    //  return Promise.reject("Neo4j error occured");
    }
    var session = driver.session({
      defaultAccessMode: neo4j.session.READ,
    });
    const query = neo4jUsersQuery(postId)
    console.log(query)
    return session
      .executeRead((tx: any) => tx.run(query))
      .then((readResult: any) => {
        console.log(readResult)
        const edgesList = readResult.records.map((r: any) => r.get("r"));
        const usersList = readResult.records.map((r: any) => r.get("u"));
        return {
          data: {
            relations: edgesList,
            persons: usersList,
          },
        };
      })
      .catch((e: any) => {
        return e;
      })
      .finally(() => {
        session.close();
      });
  },
  getKeywords: async (token: string) => {
    return await primaryInstance.get("connections/keywords/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  createKeyword: async (token: string, word: string) => {
    return await primaryInstance.post("connections/keywords/", {word}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  deleteKeyword: async (token: string, id: number) => {
    return await primaryInstance.delete(`connections/keywords/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
};
