---
title: Building stanctl, a self-hosted Instana CLI in Go
description: >-
  How I used Go's CLI patterns and SSH/API automation to turn a manual Instana
  deployment into one repeatable command.
author: vinaykumar
date: 2026-09-28
tags: ['go', 'cli', 'instana', 'kubernetes']
outline: deep
editLink: false
---

# Building stanctl, a self-hosted Instana CLI in Go

Deploying Instana self-hosted involves many moving parts: provisioning IBM Cloud
VPCs, standing up Kubernetes clusters, and installing the Instana agents. I built
`stanctl` to encode those steps as a single Go CLI so a new environment is one
command instead of a runbook.

## Why a CLI?

A CLI gives us a small surface area that is easy to run from a laptop, a CI
pipeline, or a jump host. In Go that means:

- `cobra` (or plain flag parsing) for the command tree,
- context-aware calls for timeouts and cancellation,
- structured logging so automation output is greppable.

The result is a tool that returns a clear error and exit code instead of leaving
a half-provisioned cluster.

## The flow

```text
vpc -> kubernetes cluster -> instana agent -> verify
```

Each stage is a separate subcommand so it can be re-run independently. Re-running
a stage is safe because every stage checks the current state before it changes
anything.

## What I learned

- Keep each command small and composable.
- Use the Kubernetes client-go library for cluster work instead of shelling out
  to `kubectl`.
- Surface Helm values as flags so upgrades are controlled from the CLI.

This post is a living note — I'll expand it as the CLI grows.
