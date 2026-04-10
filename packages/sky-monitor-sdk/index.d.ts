type AnyRecord = Record<string, unknown>

export interface ToolResult {
    toolCallId?: string
    success: boolean
    imageUrl?: string
    width?: number
    height?: number
    resultCount?: number
    sources?: Array<{ title: string; url: string; snippet?: string }>
    error?: string
}

export interface Trace {
    traceId: string
    aiMessageId: string
    previousTraceId?: string
    start(): void
    complete(): void
    error(msg: string): void
    abort(reason: string): void
    firstChunk(): void
    recordChunk(): void
    phaseStart(phase: string): void
    phaseEnd(phase: string): void
    toolStart(name: string, args?: AnyRecord, toolCallId?: string): void
    toolEnd(name: string, result: ToolResult): void
}

export interface Session {
    sessionId: string
    incrementTraceCount(): void
    incrementToolUsage(name: string): void
}

export interface MonitorEvent {
    id: string
    type: string
    timestamp: number
    data: AnyRecord
}

export interface ErrorReplayEvent {
    type: string
    timestamp: number
    errorMessage?: string
    payload?: AnyRecord
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
