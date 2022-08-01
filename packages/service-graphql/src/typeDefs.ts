import { AnswerType, Locale, QuestionType } from "@hive/lib-survey";
import { gql } from "apollo-server";

export const typeDefs = gql`
    type Query {
        surveys: [Survey!]!
        survey(id: String!): Survey!
    }

    type IntlRecord {
        ${Locale.enum.en}: String
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        firstName: String!
        lastName: String!
    }

    type Survey {
        _id: ID!
        name: IntlRecord!
        responses: [Response!]!
        updatedAt: String!
        createdAt: String!
    }

    type Response {
        _id: ID!
        user: User!
        answers: [Answer!]!
    }

    # Questions
    enum QuestionType {
        ${QuestionType.enum.FreeText}
        ${QuestionType.enum.Enps}
    }

    union Question = QuestionFreeText | QuestionEnps

    interface QuestionBase {
        _id: ID!
        type: QuestionType!
    }

    type QuestionFreeText implements QuestionBase {
        _id: ID!
        type: QuestionType!
        text: IntlRecord!
    }

    type QuestionEnps implements QuestionBase {
        _id: ID!
        type: QuestionType!
        text: IntlRecord!
    }

    enum AnswerType {
        ${AnswerType.enum.FreeText}
        ${AnswerType.enum.Enps}
    }

    # Answers
    union Answer = AnswerFreeText | AnswerEnps

    interface AnswerBase {
        _id: ID!
        type: AnswerType!
        question: Question!
    }

    type AnswerFreeText implements AnswerBase {
        _id: ID!
        type: AnswerType!
        text: IntlRecord!
        question: QuestionFreeText!
    }

    type AnswerEnps implements AnswerBase {
        _id: ID!
        type: AnswerType!
        score: Int!
        question: QuestionEnps!
    }
`;
