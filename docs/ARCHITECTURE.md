# NitroSync Architecture

## Overview

NitroSync is a backend-agnostic synchronization engine for React Native applications. It uses a Blueprint-based configuration system to map any REST API to a high-performance local database.

## Core Principles

1. **Backend Agnosticism**: Works with any REST API through declarative configuration
2. **Performance First**: Native C++ implementation for critical paths
3. **Pluggable Architecture**: Interface-based design for extensibility
4. **Offline-First**: Queue-based operation management
5. **Security by Default**: Field-level encryption with platform key storage

## Technology Stack

- **React Native Layer**: TypeScript
- **Native Layer**: C++ (via React Native Nitro modules)
- **iOS**: Swift with Keychain integration
- **Android**: Kotlin with KeyStore integration
- **Database**: SQLite (default), pluggable adapters
- **Testing**: Jest + fast-check for property-based testing

## Component Architecture

### Core Components

1. **SyncEngine**: Orchestrates all synchronization operations
2. **BlueprintParser**: Validates and parses Blueprint configurations
3. **DatabaseAdapter**: Pluggable interface for local storage
4. **ConflictResolver**: Handles data conflicts with configurable strategies
5. **EncryptionManager**: Field-level AES-256 encryption
6. **LiveQuerySystem**: Reactive UI updates via change notifications
7. **BackgroundSyncManager**: Platform-specific background sync

### Data Flow

```
React Native App
    ↓
NitroSync API (TypeScript)
    ↓
Sync Engine (C++)
    ↓
├─→ HTTP Client → Backend API
├─→ Database Adapter → SQLite
├─→ Encryption Manager → Secure Storage
└─→ Live Query System → UI Updates
```

## Key Features

### Blueprint Configuration

Declarative JSON/JS configuration that defines:
- API endpoints and authentication
- Database schema and field mappings
- Sync strategy (full/incremental)
- Conflict resolution strategy
- Encryption settings
- Priority level

### Incremental Sync

- Tracks last sync timestamp per Blueprint
- Fetches only changed data since last sync
- Applies deletion, update, and creation markers
- Minimizes bandwidth and sync time

### Conflict Resolution

Three strategies:
- **ServerWins**: Server data overwrites local changes
- **ClientWins**: Local changes preserved
- **ManualMerge**: Custom merge function

### Background Sync

- **iOS**: BackgroundTasks framework
- **Android**: WorkManager
- Battery and network-aware
- Respects system constraints

### Live Queries

- Subscribe to database queries
- Automatic UI updates on data changes
- <16ms notification delivery
- Batched notifications for transactions

### Multi-Tenant Support

- Isolated database per user
- Per-user encryption keys
- Secure user switching
- No data leakage between users

## Performance Targets

- Read queries: <16ms for 1000 records
- Write operations: <50ms for 100 records
- Live query notifications: <16ms delivery
- Background sync: <5% battery impact per hour

## Security

- AES-256-GCM encryption for sensitive fields
- Platform-specific secure key storage (Keychain/KeyStore)
- HTTPS required for all API communication
- No plaintext sensitive data in logs

## Testing Strategy

### Dual Testing Approach

1. **Unit Tests**: Specific examples and edge cases
2. **Property-Based Tests**: Universal properties with randomized inputs

### Property-Based Testing

- Minimum 100 iterations per property
- Uses fast-check library
- Validates 78 correctness properties
- Covers all requirements

## Development Workflow

1. Implement component in TypeScript/C++
2. Write unit tests for specific cases
3. Write property-based tests for universal properties
4. Run integration tests
5. Benchmark performance
6. Document API

## Build Process

1. TypeScript compilation
2. Nitrogen code generation (Nitro modules)
3. Native compilation (iOS/Android)
4. React Native Builder Bob packaging

## References

- [Requirements Document](.kiro/specs/nitrosync-backend-agnostic-sync-engine/requirements.md)
- [Design Document](.kiro/specs/nitrosync-backend-agnostic-sync-engine/design.md)
- [Implementation Tasks](.kiro/specs/nitrosync-backend-agnostic-sync-engine/tasks.md)
