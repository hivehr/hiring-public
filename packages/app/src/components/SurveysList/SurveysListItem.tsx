import { Box, Card, Clickable, ClickableProps } from "bumbag";
import React from "react";
import { SurveysQuery } from "../../graphql/generated";

type UnboxArray<T> = T extends Array<infer U> ? U : never;

type SurveysListItemProps = ClickableProps & Pick<UnboxArray<SurveysQuery["surveys"]>, "_id" | "name" | "responses" | "createdAt"> & {
    isActive?: boolean;
    index: number;
};

const dateFormat = Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
})

export const SurveysListItem: React.FC<SurveysListItemProps> = ({
    _id,
    name,
    responses,
    createdAt,
    isActive,
    ...props
}) => (
    <Clickable
        id={_id}
        use={Card}
        backgroundColor={isActive ? "#eee" : undefined}
        marginY="major-2"
        cursor="pointer"
        {...props}
    >
        <Box>{name.en}</Box>
        <Box fontSize="0.75em" marginTop="8px">{dateFormat.format(new Date(createdAt))}</Box>
    </Clickable>
);
