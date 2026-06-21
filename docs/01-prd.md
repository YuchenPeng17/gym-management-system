| Version | Date       | Author      | Changes |
| ------- | ---------- | ----------- | ------- |
| v0.1    | 2026-06-18 | Yuchen Peng | Created the initial PRD document. |

## 1. Project Background

### 1.1 Current Situation

Small and medium-sized gyms often rely on manual records, spreadsheets, or disconnected tools to manage members, staff, equipment, courses, and enrollments. This may cause low efficiency, inconsistent data, and delayed enrollment updates.

For members, the experience can also be fragmented, as they often need to contact staff to update profiles, check courses, or ask for training and diet suggestions.

The main value indicators affected by these issues include:

| Stakeholder | Value Indicators |
| ----------- | ---------------- |
| Admin | Management efficiency, data accuracy, course enrollment handling time, equipment maintenance visibility |
| Member | Course enrollment convenience, profile management efficiency, access to training and diet guidance |
| Business Owner | Operational cost, member retention, course utilization, service quality |

### 1.2 Proposed Solution

This project aims to build a full-stack gym management system with a separated frontend and backend architecture.

The frontend handles user interfaces and interactions. The backend provides REST APIs, authentication, business logic, and data persistence.

The system will support two main user roles:

| Role | Main Capabilities |
| ---- | ----------------- |
| Admin | Manage members, staff, equipment, courses, and enrollments. |
| Member | View and update personal information, enroll in courses, and use AI chat for general training and diet suggestions. |

### 1.3 Goals

The project is expected to improve the following value indicators:

| Goal | Target Value |
| ---- | ------------ |
| Improve admin management efficiency | Reduce manual management effort by centralizing core gym operations in one system. |
| Improve data accuracy | Use structured database records instead of scattered manual records. |
| Improve member self-service experience | Allow members to update profiles and enroll in courses without staff assistance. |
| Improve course operation visibility | Allow admins to view course and enrollment information in a clear and structured way. |
| Provide basic intelligent assistance | Offer AI-based general training and diet suggestions to improve member engagement. |


## 2. Global Notes

### 2.1 Glossary

| Term | Description |
| ---- | ----------- |
| Admin | A system user who manages members, staff, equipment, courses, and enrollments. |
| Member | A gym customer who can manage personal information, enroll in courses, and use the AI chat feature. |
| Course | A gym class or training session that members can enroll in. |
| Enrollment | A record created when a member enrolls in a course. |
| Equipment | Gym facilities or training devices managed by the admin. |
| AI Chat | A built-in assistant that provides general training and diet suggestions to members. |

### 2.2 Default List Rules

| Rule | Description |
| ---- | ----------- |
| Default sorting | Lists are sorted by creation time in descending order by default. |
| Default page size | Each page shows 10 records by default. |
| Pagination | Pagination is shown when the total number of records is greater than 10. |
| Empty state | If no data is available, show `No data available`. |
| Missing value | If a field has no value, show `-`. |

### 2.3 Global Conventions

- Date format: `YYYY-MM-DD`.
- Time format: `HH:mm`.
- Currency format: `AUD`.
- All user-facing error messages should be clear, short, and non-technical.


## 3. Project Scope

### 3.1 Scope Overview

The system covers core gym workflows: admin management, member self-service, course enrollment, AI fitness assistance, authentication, role-based access control, and operation logs.

Payment, refund, coupon, payroll, and advanced financial features are excluded from this version.

### 3.2 Function Structure

![Function Structure](./images/GMS_FS_V2.png)

### 3.3 In Scope

| Module | Included Features |
| ------ | ----------------- |
| Admin Portal | Member, staff, equipment, course, enrollment, and dashboard management. |
| Member Portal | Profile management, course browsing, course enrollment records, and AI fitness assistant. |
| System Management | Login, logout, password reset, role-based access control, and operation logs. |



## 4. Business Process

### 4.1 Admin Management Process

```text
Admin logs in
→ Selects a management module
→ Views the data list
→ Creates, updates, deactivates, or deletes records
→ System validates the input
→ System saves the changes
→ Operation log is recorded
```

This process applies to member, staff, equipment, course, and enrollment management.

### 4.2 Member Course Enrollment Process

```text
Member logs in
→ Browses course list
→ Views course details
→ Submits enrollment request
→ System checks course availability
→ Enrollment is created
→ Member views the enrollment in My Enrollments
```

If the course is full or unavailable, the system shows an error message and the enrollment is not created.

### 4.3 Enrollment Cancellation Process

```text
Member or admin opens enrollment details
→ Selects Cancel Enrollment
→ System checks whether cancellation is allowed
→ Enrollment status is updated to Cancelled
→ Operation log is recorded
```

### 4.4 AI Fitness Assistant Process

```text
Member opens AI Fitness Assistant
→ Enters a training or diet question
→ System sends the request to the AI service
→ AI returns a general suggestion
→ System displays the response
→ Chat history is saved
```




我想做一个健身房管理系统，采用前后端分离架构：前端负责页面和交互，后端提供RestAPI、会话与数据持久化。用户分为管理员与会员：管理员维护会员、员工、器材、课程与报名订单等；会员可查看/修改个人信息、报名课程、并使用内置 ai 聊天功能获取训练与饮食建议