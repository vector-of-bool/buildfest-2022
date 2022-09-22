import { NextApiHandler } from "next"

/// A set of HTTP-method-handling functions
export interface MethodResponder {
    get?: NextApiHandler;
    post?: NextApiHandler;
    put?: NextApiHandler;
    delete?: NextApiHandler;
}

// Interface to define our MoLink model on the frontend
export interface MoLink {
    _id?: number
    alias: string
    link: string
    n: number
    createdAt: Date
}
