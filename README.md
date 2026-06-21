# Cisco ISE Demo Series

Step-by-step Cisco ISE training demos.

Published at: **https://ciscoketcheon.github.io/ISE-Demo-June23/**

## Enrollment Key Protection

All three demos are protected by a shared client-side enrollment key gate.

1. Open `enrollment-gate.js`.
2. Set `ENROLLMENT_KEY` to the company name you want to distribute on the day.
3. Update `GATE_VERSION` whenever you rotate the key (this forces a fresh prompt for prior visitors).

The gate script is loaded in:

- `index.md`
- `index2.md`
- `index3.md`

## Demos

| # | Title | Difficulty | Description |
|---|-------|------------|-------------|
| 1 | [ISE Policy and User Onboard](index.md) | ★☆☆ Beginner | VPN-based user onboarding with role-based authorization (employee vs. manager) |
| 2 | [ISE Endpoint Quarantine and Access Control](index2.md) | ★★☆ Intermediate | Block a specific device by MAC address using an endpoint identity group and deny policy |
| 3 | [ISE POV Testing with dACL](index3.md) | ★★★ Advanced | Create an isolated POV test policy with a dedicated AD group, user, dACL, and authorization rule — without touching production rules |

## What the Series Covers

- Identity-driven policy enforcement in Cisco ISE
- User onboarding via Remote Access VPN
- Role-based authorization (Tier1/Tier2 users)
- Endpoint-level quarantine using MAC address and Endpoint Identity Groups
- Isolated POV testing with Downloadable ACLs and scoped authorization rules
- Verifying policy outcomes in ISE Live Logs and on the ASA firewall

## Assets

- Screenshots for Demo 1 are in [data](data)
- Screenshots for Demo 2 are in [data2](data2)
- Screenshots for Demo 3 are in [data3](data3)
