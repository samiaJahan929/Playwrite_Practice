# 👹 PeopleDesk Automation Testing (Playwright)

This project contains end-to-end automated test scripts for the **PeopleDesk Web Application** using **Playwright with TypeScript**.  
The tests validate login functionality, dashboard navigation, asset management search, and employee service book interactions.

---

## Project Overview

This automation suite tests the following modules of the PeopleDesk application:

- Login functionality with multiple test cases
- Dashboard navigation
- Asset Management search functionality
- Employee Service Book interaction
- Logout functionality

The tests simulate real user actions such as login, navigation, searching assets, selecting employees, and logging out.

---

## Technologies Used

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner

---

## Project Structure
The framework follows a modular pattern to ensure scalability and ease of maintenance:
```
project-root
│
├── tests
│ ├── login.spec.ts
│ ├── AssestManage.spec.ts
│ └── practice.spec.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Test Files Description

### 1. login.spec.ts

This file contains multiple login test cases including:

- Valid login
- Invalid password
- Invalid email
- Empty email or password
- SQL injection attempt
- Long credentials input
- Special character inputs

Total **15 test cases** are implemented to validate login functionality.

---

### 2. AssestManage.spec.ts

This test script performs the following actions:

1. Open PeopleDesk application
2. Login with valid credentials
3. Navigate to **Asset Management**
4. Open **Asset Registration**
5. Perform multiple asset searches
6. Click the **Edit button** of an asset

Search test cases include:

- Laptop
- Monitor
- Item
- Empty search
- Invalid asset name
- Numeric search
- Non-existing asset

---

### 3. practice.spec.ts

This script tests navigation and employee selection.

Steps included:

1. Login to PeopleDesk
2. Open **Dashboard**
3. Navigate through different sections:
   - Supervisor
   - Management
   - Overview
   - Attendance & Leave
   - Employee Analytics
   - Compensation & Payroll Metrics
4. Open **Service Book**
5. Select a random employee
6. Open and close employee details
7. Logout from the system

## Installation
``` npm install ```
```npx playwright install```
``` npx playwright test```

## Run the Test
```   npx playwright test "./tests/login.spec.ts" --headed  ```

**View Test Report**
``` npx playwright show-report ```


## Key Features

- Automated login validation
- Multiple negative test scenarios
- Random employee selection
- Asset search testing
- UI navigation validation
- Playwright locators using role-based selectors





