// Stub implementation - no-op for local development
class NoopMonitor {
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

module.exports = {
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
