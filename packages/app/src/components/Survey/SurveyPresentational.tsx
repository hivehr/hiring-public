import { Box, BoxProps, Card, Flex, Heading, Spinner, Stack, Table } from "bumbag";
import React, { useMemo } from "react";
import { defineMessage, useIntl } from "react-intl";
import { QuestionType, SurveyQuery } from "../../graphql/generated";

export type SurveyPresentationalProps = BoxProps & SurveyQuery["survey"] & {
    isLoading: boolean;
};

const QUESTION_TYPE_FRIENDLY_NAME = {
    [QuestionType.Enps]: defineMessage({
        id: "Enps",
        defaultMessage: "eNPS"
    }),
    [QuestionType.FreeText]: defineMessage({
        id: "FreeText",
        defaultMessage: "Free Text"
    })
};

export const SurveyPresentational: React.FC<SurveyPresentationalProps> = ({
    _id,
    name,
    responses,
    isLoading,
    ...props
}) => {
    const intl = useIntl();

    const questions = useMemo(() => new Map(
        responses.flatMap(response => response.answers.map(answer =>
            [answer.question._id, answer.question]
        ))
    ), [responses]);

    return (
        <Card width="100%" opacity={isLoading ? 0.5 : 0} {...props}>
            {isLoading &&
                <Spinner
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    size="large"
                />
            }

            <Flex marginBottom="major-5" alignItems="center">
                <Heading use="h2" margin="0px">
                    {name.en}
                </Heading>

                <Box marginInlineStart="auto">
                    {intl.formatMessage({
                        id: "responsesCount",
                        defaultMessage: "<b>{count, number}</b> {count, plural, one {Response} other {Responses}}"
                    }, {
                        count: responses.length,
                        b: (value) => <Box use="b" fontWeight="bold">{value}</Box> as never
                    })}
                </Box>
            </Flex>

            <Stack spacing="major-5">
                <Box>
                    <Heading use="h3" marginBottom="major-3">
                        {intl.formatMessage({
                            id: "questions",
                            defaultMessage: "Questions"
                        })}
                    </Heading>
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.HeadCell>
                                    {intl.formatMessage({
                                        id: "question",
                                        defaultMessage: "Question"
                                    })}
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    {intl.formatMessage({
                                        id: "type",
                                        defaultMessage: "Type"
                                    })}
                                </Table.HeadCell>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {Array.from(questions.values(), question => (
                                <Table.Row key={question._id}>
                                    <Table.Cell>{question.text.en}</Table.Cell>
                                    <Table.Cell>{intl.formatMessage(QUESTION_TYPE_FRIENDLY_NAME[question.type])}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Box>

                <Box>
                    <Heading use="h3" marginBottom="major-3">
                        {intl.formatMessage({
                            id: "statistics",
                            defaultMessage: "Statistics"
                        })}
                    </Heading>

                    TODO
                </Box>
        </Stack>
        </Card>
    );
}
