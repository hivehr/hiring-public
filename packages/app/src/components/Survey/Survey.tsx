import { Spinner } from "bumbag";
import { useQuery } from '@apollo/client';
import React from "react";
import { SurveyPresentational } from "./SurveyPresentational";
import { SurveyDocument, SurveyQuery } from "../../graphql/generated";

export const Survey: React.FC<{ surveyId: string; }> = ({ surveyId, ...props }) => {
    const { loading, error, data } = useQuery<SurveyQuery>(SurveyDocument, {
        variables: {
            surveyId
        }
    });

    if (error) {
        return <>{`Error! ${error.message}`}</>;
    }

    if (data == null) {
        return (
            <Spinner
                size="large"
            />
        )
    }

    return <SurveyPresentational {...data.survey} {...props} isLoading={loading} />;
};


