---
layout: default
title: ISE Policy and User Onboard
---

<script src="enrollment-gate.js" defer></script>

# ISE Policy and User Onboard

**Difficulty:** ★☆☆ Beginner

This guide walks through Identity Services Engine (ISE) policy enforcement and user onboarding using Remote Access VPN as the entry point.

## Table of Contents

- [Objective](#objective)
- [Lab Topology and Entry Point](#lab-topology-and-entry-point)
- [Access Cisco ISE](#access-cisco-ise)
- [Endpoint Validation — Employee Access](#endpoint-validation---employee-access)
- [Endpoint Validation — Manager Access](#endpoint-validation---manager-access)
- [Verify in ISE Live Logs](#verify-in-ise-live-logs)
- [Expected Outcome](#expected-outcome)
- [Notes](#notes)

## Objective

Validate role-based VPN authorization with Cisco ISE:

- `employee` user gets employee-level access (Tier 2).
- `manager` user gets manager-level access (Tier 1).
- ISE Live Logs confirm the authorization result.

## Lab Topology and Entry Point

### Step 1. Review the lab topology

Use this topology to understand the demo endpoints and management network.

![Lab topology](data/ise01.jpg)

### Step 2. Open the demo launch portal

Browse to the Cisco ISE Enterprise and Security portal page.

![ISE demo portal landing page](data/ise02.jpg)

## Access Cisco ISE

### Step 3. Open the ISE admin login and accept the banner

When the ISE landing screen appears, click **Accept**.

![ISE accept banner](data/ise03.jpg)

### Step 4. Sign in to ISE admin

Log in with admin credentials.

![ISE login screen](data/ise04.jpg)

### Step 5. Confirm you are on the ISE dashboard

Verify ISE is up and processing endpoint activity.

![ISE dashboard](data/ise05.jpg)

### Step 6. Verify policy set for remote access VPN

Navigate to **Policy > Policy Sets** and confirm the **Remote Access VPN** policy set is enabled and matching your VPN device conditions.

![ISE policy sets](data/ise06.jpg)

## Endpoint Validation - Employee Access

### Step 7. Start VPN from the endpoint

On endpoint `WKST4-CESA`, open Cisco Secure Client and connect to `198.18.133.100`.

![AnyConnect disconnected state](data/endpoint01.jpg)

### Step 8. Accept certificate warning in demo environments

If prompted with an untrusted certificate warning, continue for the lab demo.

![Untrusted server certificate warning](data/endpoint02.jpg)

### Step 9. Authenticate as employee

Log in with the employee user account.

- **Username**: `employee`
- **Password**: `C1sco12345`

![Employee credential prompt](data/endpoint03.jpg)

### Step 10. Confirm VPN is connected

Connection state should show connected.

![AnyConnect connected state](data/endpoint04.jpg)

### Step 11. Open corporate portal and validate employee access

From the launch portal, open the Corporate Portal and then employee resources.

![Corporate portal selected](data/endpoint05.jpg)

![Corporate connection center](data/endpoint06.jpg)

![Employee resources page](data/endpoint07.jpg)

### Step 12. Attempt manager-only page as employee

Try to open the manager-only records page. As employee, access should fail or time out.

![Manager page blocked for employee](data/endpoint09.jpg)

## Endpoint Validation - Manager Access

### Step 13. Re-authenticate VPN as manager

Disconnect/reconnect and sign in with a manager account.

- **Username**: `manager`
- **Password**: `C1sco12345`

![Manager credential prompt](data/endpoint10.jpg)

### Step 14. Validate manager-only page access

Open the same corporate records page. As manager, access should succeed.

![Manager page allowed](data/endpoint11.jpg)

## Verify in ISE Live Logs

### Step 15. Confirm authorization outcomes

In ISE, open **Operations > RADIUS > Live Logs** and verify:

- `employee` session maps to `Remote Access VPN >> Tier2 Users`
- `manager` session maps to `Remote Access VPN >> Tier1 Users`

![ISE live logs overview](data/endpoint-ise-log.jpg)

![ISE live logs with manager and employee entries](data/endpoint-ise-log-12.jpg)

## Expected Outcome

At the end of this demo, you should have confirmed all of the following:

- VPN authentication is handled by Cisco ISE.
- Authorization changes by identity group/role.
- Employee access is restricted from manager-only resources.
- Manager access is permitted to restricted corporate records.
- Live Logs provide clear evidence of policy decisions.

## Notes

- This is a training/demo environment. Certificate and timeout behavior may vary by lab instance.
- If policy behavior does not match expected results, review the **Remote Access VPN** policy set, identity source sequence, and authorization rules.

---

[Next: ISE Endpoint Quarantine and Access Control →](index2.md)
