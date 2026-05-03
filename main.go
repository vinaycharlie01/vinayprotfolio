//go:build mage
// +build mage

package main

import (
	"fmt"

	"github.com/magefile/mage/mg"
	"github.com/nirantaraai/go-mage-shared/nodejsmagex"
	"github.com/nirantaraai/go-mage-shared/rundevmagex"
)

// Default target to run when none is specified
var Default = Help

// Help displays available mage targets
func Help() {
	fmt.Println("Frontend (Node.js):")
	fmt.Println("  mage frontend:setup     - Setup frontend")
	fmt.Println("  mage frontend:run       - Run frontend dev server")
	fmt.Println("  mage frontend:build     - Build frontend")
	fmt.Println("  mage frontend:test      - Test frontend")
	fmt.Println("  mage frontend:clean     - Clean node_modules and build artifacts")
	fmt.Println("")
}

// Frontend namespace for frontend targets
type Frontend mg.Namespace

// Setup installs npm dependencies
func (Frontend) Setup() error {
	fmt.Println("📦 Setting up frontend...")

	// Load config using rundev.yaml registry
	if err := rundevmagex.LoadConfig("frontend"); err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	if err := nodejsmagex.Setup(); err != nil {
		return fmt.Errorf("failed to setup: %w", err)
	}

	fmt.Println("✅ Frontend setup complete")
	return nil
}

// Run starts the frontend dev server
func (Frontend) Run() error {
	fmt.Println("🚀 Starting frontend on port 5173...")

	// Load config using rundev.yaml registry
	if err := rundevmagex.LoadConfig("frontend"); err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	if err := nodejsmagex.Run(); err != nil {
		return fmt.Errorf("failed to run: %w", err)
	}

	return nil
}

// Build builds the frontend for production
func (Frontend) Build() error {
	fmt.Println("🔨 Building frontend...")

	// Load config using rundev.yaml registry
	if err := rundevmagex.LoadConfig("frontend"); err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	if err := nodejsmagex.Build(); err != nil {
		return fmt.Errorf("failed to build: %w", err)
	}

	fmt.Println("✅ Frontend build complete")
	return nil
}

// Test runs frontend tests
func (Frontend) Test() error {
	fmt.Println("🧪 Running frontend tests...")

	// Load config using rundev.yaml registry
	if err := rundevmagex.LoadConfig("frontend"); err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	if err := nodejsmagex.Test(); err != nil {
		return fmt.Errorf("failed to run tests: %w", err)
	}

	fmt.Println("✅ Frontend tests complete")
	return nil
}

// Clean removes node_modules and build artifacts
func (Frontend) Clean() error {
	fmt.Println("🧹 Cleaning frontend...")

	// Load config using rundev.yaml registry
	if err := rundevmagex.LoadConfig("frontend"); err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	if err := nodejsmagex.Clean(); err != nil {
		return fmt.Errorf("failed to clean: %w", err)
	}

	fmt.Println("✅ Frontend clean complete")
	return nil
}
