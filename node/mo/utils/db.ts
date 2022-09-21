import { MongoClient, Collection, Db, Document } from "mongodb";
import { MOLINKS_CONFIG } from "./config";

/**
 * @returns A new MongoClient connected with the default database URL.
 *
 * @note This will need to be closed!
 */
export async function newMongoClient(): Promise<MongoClient> {
    return MongoClient.connect(MOLINKS_CONFIG.DATABASE_URL, {
        appName: 'molinks',
        connectTimeoutMS: 1_000,
    });
}

/**
 * Perform work with a new MongoClient, automatically closing it when the handler exits
 *
 * @param fn A handler that performs work with the given MongoClient
 * @returns The return value from the callback
 */
export async function withClient<T>(fn: (client: MongoClient) => T): Promise<Awaited<T>> {
    const client = await newMongoClient();
    try {
        return await fn(client);
    } finally {
        await client.close();
    }
}

/**
 * @param client An optional client to use
 * @returns {Db} An open
 */
export async function openDefaultDB(client: MongoClient): Promise<Db> {
    return client.db('molinks');
}

/**
 * The type of document that contains aliased links
 */
export interface LinkDocument {
    /// The spelling of the alias of the link
    alias: string;
    /// The target of the link
    link: string;
    /// The number of times the link has been used
    n: number;
}

/**
 * @param name The name of the collection to open
 * @returns A new handle to the collection
 */
export async function openCollection<T extends Document>(name: string, db: Db): Promise<Collection<T>>;
export async function openCollection<T extends Document>(name: string, client: MongoClient): Promise<Collection<T>>;
export async function openCollection<T extends Document>(name: string, dbOrClient: Db | MongoClient): Promise<Collection<T>> {
    if (dbOrClient instanceof MongoClient) {
        dbOrClient = await openDefaultDB(dbOrClient);
    }
    return dbOrClient.collection<T>(name);
}

/**
 * Opne the LinkDocument collection in the database
 *
 * @param db Override the database to connect to
 * @returns A handle to the collection of LinkDocument objects
 */
export async function openLinksCollection(db: Db): Promise<Collection<LinkDocument>> {
    return openCollection<LinkDocument>('links', db);
}


/**
 * Invoke a handler that works with a set of links, closing the client when finished.
 * @param fn The handler that works with the links data
 * @returns A promise that returns the result of the handler
 */
export async function withLinksCollection<T>(fn: (links: Collection<LinkDocument>) => T): Promise<Awaited<T>> {
    return await withClient(async (client) => {
        const db = await openDefaultDB(client);
        const coll = await openLinksCollection(db);
        return await fn(coll);
    });
}
