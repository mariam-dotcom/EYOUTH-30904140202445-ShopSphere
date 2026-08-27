# ADR-001: Extract Reviews/Ratings into a Standalone Service

## Status
Accepted

## Context
ShopSphere originally ran as a single monolithic backend, with reviews/ratings
logic living inside the main Express app and reading/writing directly to the
main database. As part of modernizing the application (Task 3), we needed to
begin decomposing the monolith into independently deployable services,
starting with a low-risk, self-contained feature.

## Decision
We extracted the reviews/ratings feature into its own standalone service,
with its own deployment, its own URL, and its own database access. The main
backend no longer contains any rating logic or database models for ratings;
instead it communicates with the review service over REST (via the
REVIEW_SERVICE_URL environment variable).

## Alternatives Considered
- **Keep ratings in the monolith**: simplest short-term, but does not satisfy
  the modernization goal and keeps the codebase tightly coupled.
- **Extract as a shared library instead of a service**: would reduce
  duplication but still requires ratings to run inside the same process as
  the main backend, so it doesn't achieve independent deployability or
  scaling.
- **Full event-driven architecture (message queue between services)**: more
  resilient long-term, but adds infrastructure complexity (a broker, retry
  handling) that wasn't justified for a single low-traffic feature within
  the project's time constraints.

## Consequences
- **Positive**: Reviews/ratings can now be deployed, scaled, and modified
  independently of the main app. The main backend's codebase is smaller and
  more focused. This is a working example of the "strangler fig" pattern for
  incrementally decomposing a monolith.
- **Negative**: Adds a network hop (REST call) for every ratings read/write,
  introducing latency and a new failure mode — if the review service is
  down, ratings features fail even though the rest of the app is healthy.
- **Mitigation**: Calls to the review service use `.catch()` handling so
  failures there don't crash the main request flow where possible, and the
  service has its own independent health check.