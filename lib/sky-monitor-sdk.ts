// Inline implementation of sky-monitor-sdk stubs
// No-op for local development

export interface Trace {
    traceId: string;
    aiMessageId: string;
    previousTraceId?: string;
}

export interface Session {
    sessionId: string;
}

export interface MonitorEvent {
    id: string;
    type: string;
    timestamp: number;
    data: Record<string, unknown>;
    context: Record<string, unknown>;
}

export interface ErrorReplayEvent {
    type: 'error' | 'error_recorded' | 'replay_scheduled' | 'replay_uploaded';
    timestamp: number;
    errorMessage?: string;
    payload?: unknown;
    data: {
        message: string;
        stack?: string;
    };
}

export interface ToolResult {
    toolCallId: string;
    name: string;
    result: unknown;
    duration?: number;
    error?: string;
}

export interface IMonitor {
    use(plugin: { install?: () => void; [key: string]: unknown }): this;
    track(event: string, data?: Record<string, unknown>): void;
    emit(event: string, data?: Record<string, unknown>): void;
    on(event: string, handler: (...args: unknown[]) => void): void;
    off(event: string, handler: (...args: unknown[]) => void): void;
}

// Stub implementations
class NoopMonitor implements IMonitor {
    use() { return this; }
    track() { }
    emit() { }
    on() { }
    off() { }
}

class NoopPlugin {
    install() { }
}

class BrowserStorage { }
class BrowserTransport { constructor() { } }

const Monitor = NoopMonitor;
const TracePlugin = NoopPlugin;
const SessionPlugin = NoopPlugin;
const TransportPlugin = NoopPlugin;
const DedupePlugin = NoopPlugin;
const ErrorPlugin = NoopPlugin;
const PerformancePlugin = NoopPlugin;
const FetchPlugin = NoopPlugin;
const OfflineQueuePlugin = NoopPlugin;
const DebugPlugin = NoopPlugin;

export {
    Monitor,
    TracePlugin,
    SessionPlugin,
    TransportPlugin,
    DedupePlugin,
    ErrorPlugin,
    PerformancePlugin,
    FetchPlugin,
    OfflineQueuePlugin,
    BrowserStorage,
    BrowserTransport,
    DebugPlugin,
};
