import { Box, BoxProps, Heading } from "bumbag";
import { ApolloError } from '@apollo/client';
import React from "react";
import { SurveysListItem } from "./SurveysListItem";
import { SurveysQuery } from "../../graphql/generated";
import { useIntl } from "react-intl";

export type SurveysListPresentationalProps = BoxProps & {
    surveys: SurveysQuery["surveys"];
    isLoading: boolean;
    error?: ApolloError;
    selectedId: string | undefined;
    onItemClick: (itemId: string) => void;
};

export const SurveysListPresentational: React.FC<SurveysListPresentationalProps> = ({
    isLoading,
    selectedId,
    error,
    surveys,
    onItemClick,
    ...props
}) => {
    const intl = useIntl();

    return (
        <Box overflowY="auto" paddingX="major-3" paddingY="major-4" maxHeight="100vh" opacity={isLoading ? 0.5 : 0} {...props}>
            <Heading use="h2" marginBottom="major-4">
                {intl.formatMessage({
                    id: "surveys",
                    defaultMessage: "Surveys"
                })}
            </Heading>

            {surveys.map((survey, index) => (
                <SurveysListItem
                    key={survey._id}
                    _id={survey._id}
                    name={survey.name}
                    responses={survey.responses}
                    createdAt={survey.createdAt}
                    index={index}
                    isActive={selectedId === survey._id}
                    onClick={() => onItemClick(survey._id)}
                />
            ))}
        </Box>
    );
};
