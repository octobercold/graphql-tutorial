import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Layout, ModuleDetail, QueryResult } from "../components";

export const GET_MODULE = gql`
    query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
        module(id: $moduleId) {
            id
            title
            content
            videoUrl
        }
        track(id: $trackId) {
            id
            title
            modules {
                id
                title
                length
            }
        }
    }
`;

const Module = ({ moduleId, trackId }) => {
    const { loading, error, data } = useQuery(GET_MODULE, {
        variables: { moduleId, trackId },
    });
    return (
        <Layout fullWidth>
            <QueryResult loading={loading} error={error} data={data}>
                <ModuleDetail track={data?.track} module={data?.module} />
            </QueryResult>
        </Layout>
    );
};

export default Module;
