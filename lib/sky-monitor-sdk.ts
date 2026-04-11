// Inline implementation of sky-monitor-sdk stubs
// No-op for local development

export interface Trace {
    traceId: string;
    aiMessageId: string;
    previousTraceId?: string;
    start(): void;
}

export interface Session {
    sessionId: string;
    incrementTraceCount(): void;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    use(plugin: { install?: () => void; [key: string]: any }): this;
    track(event: string, data?: Record<string, unknown>): void;
    emit(event: string, data?: Record<string, unknown>): void;
    on(event: string, handler: (...args: unknown[]) => void): void;
    off(event: string, handler: (...args: unknown[]) => void): void;
}

// Monitor configuration interface
interface MonitorConfig {
    appId?: string;
    debug?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage?: any;
}

// Stub Monitor implementation
class MonitorClass implements IMonitor {
    private plugins: unknown[] = [];

    constructor(_config?: MonitorConfig) {
        // no-op: 配置被忽略
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    use(plugin: { install?: () => void; [key: string]: any }): this {
        this.plugins.push(plugin);
        plugin.install?.();
        return this;
    }
    track() { }
    emit() { }
    on() { }
    off() { }

    createTrace(options: { aiMessageId: string; previousTraceId?: string }): Trace {
        return {
            traceId: crypto.randomUUID(),
            aiMessageId: options.aiMessageId,
            previousTraceId: options.previousTraceId,
            start() { },
        };
    }

    setCurrentTrace(_trace: Trace) { }

    getSession(): Session {
        return {
            sessionId: crypto.randomUUID(),
            incrementTraceCount() { },
        };
    }
}

// Plugin base classes
class NoopPlugin {
    constructor(_options?: Record<string, unknown>) { }
    install() { }
}

class BrowserStorage {
    constructor(_options?: Record<string, unknown>) { }
}

class BrowserTransport {
    constructor(_options?: string | Record<string, unknown>) { }
}

const Monitor = MonitorClass;
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
