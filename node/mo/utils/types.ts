import { NextApiHandler } from "next"
import { ObjectId } from "mongodb";

/// A set of HTTP-method-handling functions
export interface MethodResponder {
    get?: NextApiHandler;
    post?: NextApiHandler;
    put?: NextApiHandler;
    delete?: NextApiHandler;
}

/**
 * The type of document that contains aliased links
 */
export interface MoLink {
    /// The spelling of the alias of the link
    alias: string;
    /// The target of the link
    link: string;
    /// The number of times the link has been used
    n: number;
    /// The time at which this object was created
    createdAt: Date;
}

/// The JSON encoding replaces 'createdAt' with an ISO8601 string
export type MoLinkJSON = Omit<MoLink, 'createdAt'> & { createdAt: string, _id?: string };

/// Type of the data object sent to insert/update a link
export type MoLinkPutJSON = Partial<MoLinkJSON>;
