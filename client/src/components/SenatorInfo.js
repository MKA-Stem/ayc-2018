import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const SenatorInfo = ({ data }) => {
    const senators = data.senatorsForRequestIP;
    return (
        senators ? (
            <div>
                <p>
                    Your voice matters and we’ve made it easy for you to protect the internet. Contact
                your senators below:
                </p>
                <p>
                    {senators[0].firstname} {senators[0].lastname} at {senators[0].contact}
                </p>
                <p>
                    {senators[1].firstname} {senators[1].lastname} at {senators[1].contact}
                </p>
            </div>
        ) : null
    );
};

export default graphql(gql`query{
    senatorsForRequestIP{
        firstname
        lastname
        contact
    }
}`)(SenatorInfo);