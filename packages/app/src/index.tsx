import { Provider } from "bumbag";
import { theme } from "./theme";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { IntlProvider } from 'react-intl'
import messages from "./intl/en.json";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    surveys: {
                        keyArgs: false,
                        merge: (existing = [], incoming) =>
                            [...existing, ...incoming]
                    }
                }
            }
        }
    }),
});

root.render(
    <React.StrictMode>
        <IntlProvider messages={messages as never} locale="en" defaultLocale="en">
            <ApolloProvider client={client}>
                <Provider theme={theme}>
                    <App />
                </Provider>
            </ApolloProvider>
        </IntlProvider>
    </React.StrictMode>
);
