```markdown
# AGENTS.md - AI Coding Agent Guidelines

These guidelines are designed to ensure high-quality, maintainable, and productive development for our AI coding agents. Adherence to these principles is mandatory.

## 1. DRY (Don't Repeat Yourself)

*   All code should have a single, well-defined purpose.
*   Avoid duplicating logic or data structures.
*   Reuse existing components whenever possible.
*   When a component needs to be modified, ensure the modification addresses a singular need.

## 2. KISS (Keep It Simple, Stupid)

*   Prioritize readability and clarity over complex solutions.
*   Minimize code complexity.
*   Use simple data structures and algorithms.
*   Avoid unnecessary abstractions.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class/agent should have one, and only one, reason to change.
*   **Open/Closed Principle:**  The system should be open for extension but closed for modification.
*   **Liskov Substitution Principle:**  Subclasses should be able to replace base classes without breaking the program's functionality.
*   **Interface Segregation Principle:** Clients should not be forced to depend on methods they don't use.
*   **Dependency Inversion Principle:**  High-level modules should not depend on low-level modules.  Interface should define behavior, not implementation.

## 4. YAGNI (You Aren't Gonna Need It)

*   Avoid premature implementation of features or functionality.
*   Only implement what is absolutely necessary for the current task.
*   Refactor code based on demonstrable needs, not assumptions.
*   Focus on achieving the objective; don't create features for the sake of creating features.

## 5. Code Length Constraints

*   Each file must not exceed 180 lines of code.
*   Lines should be concise and directly contribute to the functionality.

## 6. Test Coverage Requirements

*   Achieve at least 80% test coverage for all code.
*   Tests must cover all critical paths and edge cases.
*   Unit tests should validate core logic and interactions.
*   Integration tests should verify system behavior.
*   Regression tests are essential to ensure stability.

## 7. File Structure & Organization

*   **Agent Class:** Defines core agent functionality and data.  (e.g., communication, data processing, task management)
*   **Agent Service:**  Handles agent interactions with other systems.  (e.g., data ingestion, message routing)
*   **Data Model:** Defines the data structure used by agents. (e.g., task queue, event stream)
*   **Example Agent Code:**  Illustrative examples of agent functionalities.  (Focus on fundamental concepts, not full deployment)
*   **Configuration Files:** Define agent settings and parameters.  (e.g., database connection strings, task prioritization)
*   **Documentation:**  Clear and concise documentation explaining the purpose and usage of each file.  Include comments explaining complex logic.

## 8.  Coding Conventions

*   Use consistent naming conventions (e.g., camelCase, snake_case).
*   Follow the established coding style guide (if one exists).
*   Indentation consistently (4 spaces).
*   Use whitespace effectively for readability.

## 9.  Error Handling

*   Use exceptions effectively.
*   Log errors and warnings to aid in debugging.
*   Avoid unhandled exceptions.

## 10.  Code Review Process

*   All code must be reviewed by at least one other agent before deployment.
*   Code reviews should focus on correctness, readability, and adherence to principles.
*   Constructive feedback must be provided.

## 11.  Data Handling

*   Data should be treated as immutable wherever possible.
*   Versioning of data structures is critical.
*   Data validation is implemented where appropriate.

## 12.  Testing Strategy

*   Unit tests will be a primary focus.
*   Integration tests will verify system interactions.
*   Consider automated test suites for regression purposes.

## 13.  Future Considerations

*   Explore the use of asynchronous programming for improved responsiveness.
*   Implement automated data synchronization mechanisms.
*   Refactor for improved scalability.

## 14.  Documentation Style

*   All documentation will be clear, concise, and accessible.
*   Use Markdown for document formatting.
*   Include examples when appropriate.

This document represents the core principles guiding the development of the AGENTS.md repository. Regular review and updates are encouraged.
```