---
title: A shared framework for k0s cluster automation
description: >-
  Designing a hexagonal Go library that abstracts cluster lifecycle operations
  behind ports and adapters.
author: vinaykumar
date: 2026-10-24
tags: ['go', 'kubernetes', 'k0s', 'architecture']
outline: deep
editLink: false
---

# A shared framework for k0s cluster automation

Automating `k0s` clusters from different tools usually means rewriting the same
lifecycle code. I extracted that into a shared Go library that exposes a small
set of operations — apply, reset, get status, and get kubeconfig — behind a
port, with adapters for the underlying implementation.

## Ports and adapters

```go
type Cluster interface {
    Apply(ctx context.Context) error
    Reset(ctx context.Context) error
    Status(ctx context.Context) (Status, error)
    Kubeconfig(ctx context.Context) ([]byte, error)
}
```

Callers depend on `Cluster`, not on `k0sctl`. That keeps the code testable and
lets a new adapter (or a mock) slot in without touching the callers.

## What the framework provides

- An adapter over `k0sctl`.
- `slog`-based structured logging.
- SOLID/DIP-friendly boundaries so each piece has one reason to change.

The goal is one library that many internal tools can share instead of each tool
carrying its own cluster logic.
