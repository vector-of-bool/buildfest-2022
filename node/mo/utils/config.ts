/**
 * Type of environment-configuration for the application
 */
export interface AppConfiguration {
    /// The base URL for the application's API
    API_URL: string;
    /// The mongodb:// URL referring to the database to use for the application
    DATABASE_URL: string;
}

class AppConfigurationImpl implements Readonly<AppConfiguration> {
    private _getRequiredEnv(key: string): string {
        const val = process.env[key]
        if (val === undefined) {
            throw new Error(`Required environment variable "${key}" is not defined`);
        }
        return val;
    }

    get API_URL(): string {
        return this._getRequiredEnv('API_URL');
    }

    get DATABASE_URL(): string {
        return this._getRequiredEnv('DATABASE_URL');
    }
}


/**
 * Manage configuration of the application
 */
export const MOLINKS_CONFIG: Readonly<AppConfiguration> = new AppConfigurationImpl();
