import { useQuery } from '@apollo/client';
import { Spinner } from 'bumbag';
import React from "react";
import { SurveysDocument, SurveysQuery } from '../../graphql/generated';
import { SurveysListPresentationalProps, SurveysListPresentational } from "./SurveysListPresentational";

export type SurveysListProps = Omit<SurveysListPresentationalProps, "surveys" | "isLoading" | "error">;

export const SurveysList: React.FC<SurveysListProps> = (props) => {
    const { loading, error, data } = useQuery<SurveysQuery>(SurveysDocument);

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

    return (
        <SurveysListPresentational {...props} surveys={data?.surveys} isLoading={loading} error={error}  />
    );
}
