import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = AnswerEnps | AnswerFreeText;

export type AnswerBase = {
  _id: Scalars['ID'];
  question: Question;
  type: AnswerType;
};

export type AnswerEnps = AnswerBase & {
  __typename?: 'AnswerEnps';
  _id: Scalars['ID'];
  question: QuestionEnps;
  score: Scalars['Int'];
  type: AnswerType;
};

export type AnswerFreeText = AnswerBase & {
  __typename?: 'AnswerFreeText';
  _id: Scalars['ID'];
  question: QuestionFreeText;
  text: IntlRecord;
  type: AnswerType;
};

export enum AnswerType {
  Enps = 'Enps',
  FreeText = 'FreeText'
}

export type IntlRecord = {
  __typename?: 'IntlRecord';
  en?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  survey: Survey;
  surveys: Array<Survey>;
};


export type QuerySurveyArgs = {
  id: Scalars['String'];
};

export type Question = QuestionEnps | QuestionFreeText;

export type QuestionBase = {
  _id: Scalars['ID'];
  type: QuestionType;
};

export type QuestionEnps = QuestionBase & {
  __typename?: 'QuestionEnps';
  _id: Scalars['ID'];
  text: IntlRecord;
  type: QuestionType;
};

export type QuestionFreeText = QuestionBase & {
  __typename?: 'QuestionFreeText';
  _id: Scalars['ID'];
  text: IntlRecord;
  type: QuestionType;
};

export enum QuestionType {
  Enps = 'Enps',
  FreeText = 'FreeText'
}

export type Response = {
  __typename?: 'Response';
  _id: Scalars['ID'];
  answers: Array<Answer>;
  user: User;
};

export type Survey = {
  __typename?: 'Survey';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  name: IntlRecord;
  responses: Array<Response>;
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type SurveyQueryVariables = Exact<{
  surveyId: Scalars['String'];
}>;


export type SurveyQuery = { __typename?: 'Query', survey: { __typename?: 'Survey', _id: string, name: { __typename?: 'IntlRecord', en?: string | null }, responses: Array<{ __typename?: 'Response', _id: string, answers: Array<{ __typename?: 'AnswerEnps', _id: string, type: AnswerType, score: number, question: { __typename?: 'QuestionEnps', _id: string, type: QuestionType, text: { __typename?: 'IntlRecord', en?: string | null } } } | { __typename?: 'AnswerFreeText', _id: string, type: AnswerType, text: { __typename?: 'IntlRecord', en?: string | null }, question: { __typename?: 'QuestionFreeText', _id: string, type: QuestionType, text: { __typename?: 'IntlRecord', en?: string | null } } }>, user: { __typename?: 'User', _id: string, email: string, firstName: string, lastName: string, username: string } }> } };

export type SurveysQueryVariables = Exact<{ [key: string]: never; }>;


export type SurveysQuery = { __typename?: 'Query', surveys: Array<{ __typename?: 'Survey', _id: string, createdAt: string, name: { __typename?: 'IntlRecord', en?: string | null }, responses: Array<{ __typename?: 'Response', _id: string }> }> };


export const SurveyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"survey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surveyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"survey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surveyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnswerEnps"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionEnps"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnswerFreeText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QuestionFreeText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"text"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SurveyQuery, SurveyQueryVariables>;
export const SurveysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"surveys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surveys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"en"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<SurveysQuery, SurveysQueryVariables>;