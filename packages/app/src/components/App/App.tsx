import { Box, Flex, PageWithHeaderProps } from "bumbag";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Survey } from "../Survey/Survey";
import { SurveysList } from "../SurveysList/SurveysList";
import { Header } from "../Header/Header";

export type AppProps = Omit<PageWithHeaderProps, "header">;

const usePersistedState = <S extends any>(cacheKey: string): [S, Dispatch<SetStateAction<S>>] => {
    const [selectedSurveyId, setSelectedSurveyId] = useState<S>(() =>
        localStorage.getItem(cacheKey) as never
    );

    useEffect(() => {
        if (selectedSurveyId == null) {
            localStorage.removeItem(cacheKey)
        }
        else {
            localStorage.setItem(cacheKey, selectedSurveyId as never)
        }
    }, [cacheKey, selectedSurveyId]);

    return [selectedSurveyId, setSelectedSurveyId];
}

export const App: React.FC<AppProps> = (props) => {
    const [selectedSurveyId, setSelectedSurveyId] = usePersistedState<string | undefined>(
        "hive-cached-survey-id"
    );

    return (
        <Flex {...props} flexDirection="column" height="100vh">
            <Header flex="0 0 auto"/>
            <Flex
                flex="1 1 auto"
                minHeight="0px"
            >
                <Flex
                    flex="0 0 300px"
                    alignItems="stretch"
                    justifyContent="stretch"
                    minHeight="0px"
                >
                    <SurveysList
                        selectedId={selectedSurveyId}
                        onItemClick={id => setSelectedSurveyId(id)}
                    />
                </Flex>

                <Box
                    flex="1 1 auto"
                    overflowY="scroll"
                    minHeight="0px"
                    padding="major-4"
                >
                    {selectedSurveyId &&
                        <Survey surveyId={selectedSurveyId} />
                    }
                </Box>
            </Flex>
        </Flex>
    );
}
