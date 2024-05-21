export type IRelationPost = any;
export type IRelationPerson = any;
export type IRelation = any;

export type DateFilterType = [string | null, string | null];

export type RelationsKeyword = {id: number, word: string}

export interface IRelationsState {
  isFetching: boolean;
  keywordFilter: string;  //List separated by commas
  tags: ITag[]
  posts: IRelationPost[];
  relations: IRelation[];
  persons: IRelationPerson[];
  selectedPost: IRelationPost | null;
  selectedPostPersons: IRelationPerson[];
  selectedPostRelations: IRelation[];
  dateFilter: DateFilterType;
  keywords?: RelationsKeyword[] //Add ? conditional because this is persisted state
  isFetchingKeywords?: boolean //Add ? conditional because this is persisted state
}


export interface ITag {
  tag: string;
  label: string;
  relationType: string;
  total: number;
}
