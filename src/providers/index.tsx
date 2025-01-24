"use client"
import React from 'react'
import { Provider as JotaiProvider } from 'jotai'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from "next-auth/react"
import { client } from '@/config/graphql/apollo.conf'
const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ApolloProvider client={client}>
            <SessionProvider>
                <JotaiProvider>
                    {children}
                </JotaiProvider>
            </SessionProvider>
        </ApolloProvider>
    )
}

export default AppProviders