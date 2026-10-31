---
title: SOLID Principles in Golang — Explained with Simple Examples
description: >-
  A practical, code-first introduction to the five SOLID principles, applied to
  idiomatic Go using a realistic user registration example.
author: vinaykumar
date: 2026-10-31
tags: ['go', 'solid', 'design-principles', 'backend']
outline: deep
editLink: false
---

# SOLID Principles in Golang — Explained with Simple Examples

## Table of contents

- [Introduction](#introduction)
- [The running example](#the-running-example)
- [S — Single Responsibility Principle](#s-single-responsibility-principle)
- [O — Open/Closed Principle](#o-openclosed-principle)
- [L — Liskov Substitution Principle](#l-liskov-substitution-principle)
- [I — Interface Segregation Principle](#i-interface-segregation-principle)
- [D — Dependency Inversion Principle](#d-dependency-inversion-principle)
- [Putting it all together](#putting-it-all-together)
- [Before vs. after](#before-vs-after)
- [When should you use it?](#when-should-you-use-it)
- [Key takeaways](#key-takeaways)
- [References](#references)

## Introduction

SOLID is a set of five design principles that help you write code that is easier
to read, test, and change. The name comes from the first letter of each
principle:

- **S** — Single Responsibility Principle
- **O** — Open/Closed Principle
- **L** — Liskov Substitution Principle
- **I** — Interface Segregation Principle
- **D** — Dependency Inversion Principle

These principles were originally written with class-based languages like Java in
mind, but they apply just as well to Go. Go is not a class-based language, so we
express the same ideas with **packages**, **structs**, and — most importantly —
**interfaces**.

If you already know basic Go but find design principles too academic, this post
is for you. We will start with a small, realistic backend example and improve it
one principle at a time. By the end, you will see why these rules exist and when
you can safely ignore them.

## The running example

Imagine we are building a user registration feature. When a new user signs up,
the service must:

1. Read the user data from an HTTP request.
2. Validate the data.
3. Save the user to PostgreSQL.
4. Send a welcome notification.

Here is a first version many developers would write:

```go
package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func Register(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	var u User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	if u.Name == "" || u.Email == "" {
		http.Error(w, "name and email are required", http.StatusBadRequest)
		return
	}

	_, err := db.Exec("INSERT INTO users (name, email) VALUES ($1, $2)", u.Name, u.Email)
	if err != nil {
		http.Error(w, "could not save user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
```

This code works. But as the application grows, a few problems appear:

- The same function handles HTTP, validation, and database work.
- Testing it requires a real database connection.
- Adding a new notification channel means editing this function again.

We will use this example to understand each SOLID principle and improve the code
step by step.

## S — Single Responsibility Principle

> A type or function should have only one reason to change.

The `Register` function above has at least three responsibilities:

1. Decoding and responding to HTTP.
2. Validating user input.
3. Persisting the user.

When one function does several jobs, a change to one job (for example, changing
the database schema) forces you to touch code that also handles validation and
HTTP. That makes changes riskier and the function harder to test in isolation.

### A cleaner separation

Let's split the responsibilities without overcomplicating the code:

```go
package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
)

type User struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func (u User) Validate() error {
	if u.Name == "" || u.Email == "" {
		return errors.New("name and email are required")
	}
	return nil
}

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{db: db}
}

func (s *Store) Save(u User) error {
	_, err := s.db.Exec("INSERT INTO users (name, email) VALUES ($1, $2)", u.Name, u.Email)
	return err
}

func Register(s *Store, w http.ResponseWriter, r *http.Request) {
	var u User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	if err := u.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := s.Save(u); err != nil {
		http.Error(w, "could not save user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
```

Now each part has one clear job:

- `User.Validate` checks the input rules.
- `Store.Save` talks to the database.
- `Register` only wires HTTP in, delegates the real work, and writes the response.

The handler is still the coordinator, but it no longer contains the details of
validation or SQL. You can now test `User.Validate` and `Store.Save` on their
own, and change the SQL without touching the HTTP code.

> The goal is **not** to make every function one line long. It is to make sure
> related work lives together and unrelated work does not.

## O — Open/Closed Principle

> Code should be open for extension but closed for modification.

In plain English: when you need new behavior, you should be able to **add** it
without **rewriting** existing, working code.

### The problem

Let's add the welcome notification. A naive version switches on the channel:

```go
package main

import "errors"

func sendEmail(to, message string) error { return nil }
func sendSMS(to, message string) error   { return nil }

func sendNotification(channel, to, message string) error {
	switch channel {
	case "email":
		return sendEmail(to, message)
	case "sms":
		return sendSMS(to, message)
	default:
		return errors.New("unknown channel")
	}
}
```

Every time we support a new channel — WhatsApp, Slack, push — we must open this
function and add another `case`. That means editing code that already works,
which can introduce bugs.

### The Go way: an interface

Go makes this easy with small interfaces:

```go
type Notifier interface {
	Notify(to, message string) error
}

type EmailNotifier struct{}

func (EmailNotifier) Notify(to, message string) error {
	return sendEmail(to, message)
}

type SMSNotifier struct{}

func (SMSNotifier) Notify(to, message string) error {
	return sendSMS(to, message)
}

type WhatsAppNotifier struct{}

func (WhatsAppNotifier) Notify(to, message string) error {
	return sendWhatsApp(to, message)
}

func NotifyAll(notifiers []Notifier, to, message string) error {
	for _, n := range notifiers {
		if err := n.Notify(to, message); err != nil {
			return err
		}
	}
	return nil
}
```

`sendWhatsApp` is just a stub like the others:

```go
func sendWhatsApp(to, message string) error { return nil }
```

Now adding WhatsApp did **not** require changing `sendNotification`. We created
a new type that satisfies `Notifier` and passed it to `NotifyAll`. The existing
`EmailNotifier` and `SMSNotifier` are untouched — the code is open for extension
and closed for modification.

This is why Go developers often repeat the advice: *accept interfaces, return
structs.* An interface is the "seam" where you plug in new behavior.

## L — Liskov Substitution Principle

> A type that implements an interface must be replaceable by any other type
> implementing the same interface, without breaking the caller.

In Go this means: if a type implements an interface, it must **honor the
contract** of that interface, not just match its method signature.

### The problem

Look at this `Sender` interface:

```go
type Message struct {
	To   string
	Body string
}

type Sender interface {
	Send(msg Message) error
}

func deliverEmail(msg Message) error { return nil }

type EmailSender struct{}

func (EmailSender) Send(msg Message) error {
	return deliverEmail(msg)
}

// SilentSender returns nil even when delivery fails.
type SilentSender struct{}

func (SilentSender) Send(msg Message) error {
	_ = deliverEmail(msg) // error swallowed
	return nil
}
```

`SilentSender` has the right method signature, so it implements `Sender`. But it
violates the contract: a `nil` error is supposed to mean "the message was sent".
`SilentSender` returns `nil` even when the underlying delivery failed.

Now consider a caller that retries on error:

```go
func SendToAll(senders []Sender, msg Message) error {
	for _, s := range senders {
		if err := s.Send(msg); err != nil {
			return err // caller will retry or alert here
		}
	}
	return nil
}
```

Because `SilentSender` always returns `nil`, the retry or alert logic never runs,
and failed messages are silently lost. You could not swap `EmailSender` for
`SilentSender` without changing the program's behavior.

### The fix

Honor the contract. Return the error instead of swallowing it:

```go
func (SilentSender) Send(msg Message) error {
	return deliverEmail(msg)
}
```

The classic Rectangle/Square example from object-oriented textbooks describes the
same idea with inheritance. In Go, the idea is simpler: **do not implement an
interface unless you can genuinely fulfill what the interface promises.** A type
that "mostly" satisfies an interface but behaves differently will cause subtle
bugs when it is used through that interface.

## I — Interface Segregation Principle

> Clients should not be forced to depend on methods they do not use.

A large interface forces every implementation to provide every method, and forces
every caller to depend on more than it needs.

### The problem

Here is a "repository" interface that tries to do everything:

```go
type UserRepository interface {
	Save(u User) error
	GetByID(id string) (User, error)
	GetByEmail(email string) (User, error)
	List() ([]User, error)
	Update(u User) error
	Delete(id string) error
	Count() (int, error)
}
```

Now a registration handler that only needs `Save` still depends on all seven
methods:

```go
func Register(repo UserRepository, w http.ResponseWriter, r *http.Request) {
	// uses only repo.Save(u)
}
```

This makes the handler harder to test (you must fake all seven methods) and ties
it to concerns it never uses.

### The fix

Split the interface into smaller ones:

```go
type UserSaver interface {
	Save(u User) error
}

type UserGetter interface {
	GetByID(id string) (User, error)
}

func Register(repo UserSaver, w http.ResponseWriter, r *http.Request) {
	// now the dependency is exactly what this function needs
}
```

Now `Register` only depends on `UserSaver`. A test can provide a tiny fake that
implements one method. The concrete PostgreSQL type can still implement all the
small interfaces — nothing is lost, but the dependencies are now precise.

Go's community even has a rule of thumb: *the smaller the interface, the more
useful it is.* Many of the standard library's best interfaces (`io.Reader`,
`io.Writer`, `error`) have just one or two methods.

## D — Dependency Inversion Principle

> High-level modules should depend on abstractions, not on concrete
> implementations.

The "high-level" code is your business logic. The "low-level" code is the
database, HTTP client, or message broker. You want the business logic to be
independent of *how* data is stored or delivered.

### The problem

Here, `UserService` depends directly on a concrete PostgreSQL store:

```go
package main

import "database/sql"

func openDB() *sql.DB { return nil }

type PostgresStore struct {
	db *sql.DB
}

func NewPostgresStore() *PostgresStore {
	return &PostgresStore{db: openDB()}
}

type UserService struct {
	store *PostgresStore
}

func NewUserService() *UserService {
	return &UserService{store: NewPostgresStore()}
}
```

The service is now glued to PostgreSQL. You cannot test the service without a
database, and you cannot swap the store for an in-memory version without
rewriting the service.

### The fix

Depend on an interface instead of the concrete type:

```go
type UserStore interface {
	Save(u User) error
}

type UserService struct {
	store UserStore
}

func NewUserService(store UserStore) *UserService {
	return &UserService{store: store}
}
```

Now the high-level `UserService` depends on the `UserStore` abstraction, and the
concrete `PostgresStore` also depends on that same abstraction (by implementing
it). In production you pass a real store; in tests you pass a fake:

```go
type FakeStore struct {
	saved []User
}

func (f *FakeStore) Save(u User) error {
	f.saved = append(f.saved, u)
	return nil
}
```

This is dependency inversion in Go: no framework, no magic — just a small
interface and a constructor that receives its dependencies.

## Putting it all together

Here is the full service after applying all five principles:

```go
package user

type UserStore interface {
	Save(u User) error
}

type Notifier interface {
	Notify(to, message string) error
}

type Service struct {
	store     UserStore
	notifiers []Notifier
}

func NewService(store UserStore, notifiers ...Notifier) *Service {
	return &Service{store: store, notifiers: notifiers}
}

func (s *Service) Register(u User) error {
	if err := u.Validate(); err != nil {
		return err
	}

	if err := s.store.Save(u); err != nil {
		return err
	}

	for _, n := range s.notifiers {
		if err := n.Notify(u.Email, "Welcome!"); err != nil {
			return err
		}
	}

	return nil
}
```

Notice what changed:

- **S** — validation, persistence, and notification each have a home.
- **O** — new notification channels are added as new `Notifier` types.
- **L** — every `Notifier` returns a real error, so callers can trust `nil`.
- **I** — `UserStore` and `Notifier` are small, purpose-built interfaces.
- **D** — `Service` depends on interfaces, not on PostgreSQL or a specific
  email provider.

This is a realistic, idiomatic Go service. It is easy to test with fakes, easy to
extend, and each part is easy to understand on its own.

## Before vs. after

| Before | After |
| --- | --- |
| One function mixes HTTP, validation, and SQL | Each concern lives in its own place |
| Adding a channel means editing a `switch` | Adding a channel means adding a new type |
| Tests need a real database | Tests use small fake implementations |
| Handlers depend on large interfaces | Handlers depend on only the methods they use |
| Business logic is glued to PostgreSQL | Business logic depends on an interface |

The main practical benefits are easier testing, less coupling, and changes that
stay local instead of rippling through the codebase.

## When should you use it?

SOLID is guidance, not a law. You do not need to apply all five principles to a
30-line script, a throwaway command, or a simple utility where the extra
abstraction would just add indirection.

Apply these principles when:

- The code is likely to grow or change often.
- You need to unit test business logic without a real database or external API.
- Several implementations of the same behavior already exist or are planned.

Skip or relax them when:

- A function is small, stable, and clear as a single unit.
- An interface would have only one implementation and no tests need a fake.
- The abstraction would make the code harder to follow than the duplication.

Go's "small interfaces" culture already nudges you toward several of these
principles. Use that instinct, but let readability be the final judge.

## Key takeaways

- **S** — keep one clear reason for a type or function to change.
- **O** — add new behavior by adding types, not by editing working `switch` or
  `if` chains.
- **L** — an interface is a contract; a type must honor it fully, not just match
  the method signature.
- **I** — prefer small, focused interfaces over large "do everything" ones.
- **D** — depend on interfaces, not concrete database or client implementations.

## References

- [Effective Go](https://go.dev/doc/effective_go) — official guidance on idiomatic Go.
- [Go Code Review Comments: Interfaces](https://go.dev/wiki/CodeReviewComments#interfaces) — the "accept interfaces, return structs" rule of thumb.
- [Robert C. Martin, The Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod) — the original SOLID principles.
- [SOLID — Wikipedia](https://en.wikipedia.org/wiki/SOLID) — a short overview of the five principles.

---

This is the first post in the **Design Patterns in Go** series. More posts on
specific patterns are coming soon — [browse the blog](/blog/) to follow along.
