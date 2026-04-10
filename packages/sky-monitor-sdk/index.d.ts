// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, unknown>

export interface Trace {
    traceId: string
    aiMessageId: string
    previousTraceId?: string
}

export interface Session {
    sessionId: string
}

export interface IMonitor {
    use(plugin: object): this
    track(event: string, data?: AnyRecord): void
    emit(event: string, data?: AnyRecord): void
    on(event: string, handler: (...args: unknown[]) => void): void
    off(event: string, handler: (...args: unknown[]) => void): void
}

export declare class Monitor implements IMonitor {
    constructor(options: { appId: string; debug?: boolean; storage?: object })
    use(plugin: object): this
    track(event: string, data?: AnyRecord): void
    emit(event: string, data?: AnyRecord): void
    on(event: string, handler: (...args: unknown[]) => void): void
    off(event: string, handler: (...args: unknown[]) => void): void
}

export declare class BrowserStorage { }
export declare class BrowserTransport {
    constructor(endpoint: string)
}
export declare class TracePlugin {
    constructor(options?: AnyRecord)
}
export declare class SessionPlugin {
    constructor(options?: AnyRecord)
}
export declare class TransportPlugin {
    constructor(options?: AnyRecord)
}
export declare class DedupePlugin {
    constructor(options?: AnyRecord)
}
export declare class ErrorPlugin {
    constructor(options?: AnyRecord)
}
export declare class PerformancePlugin {
    constructor(options?: AnyRecord)
}
export declare class FetchPlugin {
    constructor(options?: AnyRecord)
}
export declare class OfflineQueuePlugin {
    constructor(options?: AnyRecord)
}
export declare class DebugPlugin {
    constructor(options?: AnyRecord)
}
