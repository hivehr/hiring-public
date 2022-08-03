import { useQuery } from '@apollo/client';
import { Spinner } from 'bumbag';
import React, { useCallback } from "react";
import { SurveysDocument, SurveysQuery } from '../../graphql/generated';
import { SurveysListPresentationalProps, SurveysListPresentational } from "./SurveysListPresentational";

export type SurveysListProps = Omit<SurveysListPresentationalProps, "surveys" | "isLoading" | "error" | "onLoadMoreClick">;

export const SurveysList: React.FC<SurveysListProps> = (props) => {
    const limit = 5;

    const { loading, error, data, fetchMore } = useQuery<SurveysQuery>(SurveysDocument, {
        variables: {
            offset: 0,
            limit
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

    const onLoadMoreClick = useCallback(() => {
        fetchMore({
            variables: {
                limit,
                offset: data.surveys.length
            }
        })
    }, []);

    return (
        <SurveysListPresentational {...props} surveys={data?.surveys} isLoading={loading} error={error} onLoadMoreClick={onLoadMoreClick} />
    );
}
