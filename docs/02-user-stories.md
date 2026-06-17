# 02. User Stories

## 1. Purpose

This document describes the core user stories of the Gym Management System. It defines the main goals, actions, and acceptance criteria for each user role.

User stories follow this format:

> As a [role], I want to [perform an action], so that [I can achieve a goal].

---

## 2. User Roles

| Role | Description |
|---|---|
| Admin | Manages members, staff, equipment, courses, enrollment orders, and basic system data. |
| Member | Views and updates personal information, enrolls in courses, manages personal enrollments, and uses the built-in AI chat for training and diet advice. |

---

## 3. Admin User Stories

### 3.1 Member Management

#### US-A01 View Member List
As an admin, I want to view the member list, so that I can quickly understand the current member status of the gym.

**Acceptance Criteria:**
- The admin can view basic member information, including name, contact details, membership status, and membership type.
- The admin can search members by keyword.
- The admin can view the details of a single member.

#### US-A02 Create Member
As an admin, I want to create a new member, so that I can register new gym members in the system.

**Acceptance Criteria:**
- The admin can enter member information such as name, email, phone number, and membership type.
- The system validates required fields.
- After creation, the new member appears in the member list.

#### US-A03 Edit Member Information
As an admin, I want to edit member information, so that member records remain accurate.

**Acceptance Criteria:**
- The admin can update member profile information, membership type, and membership status.
- After saving, the system displays the updated information.

#### US-A04 Delete or Deactivate Member
As an admin, I want to delete or deactivate a member, so that invalid or inactive member accounts can be managed properly.

**Acceptance Criteria:**
- The admin can delete or deactivate a member.
- The system shows a confirmation prompt before the operation.
- A deactivated member cannot enroll in courses.

---

### 3.2 Staff Management

#### US-A05 View Staff List
As an admin, I want to view the staff list, so that I can understand the current staff information of the gym.

**Acceptance Criteria:**
- The admin can view staff name, position, contact details, and employment status.
- The admin can view staff details.

#### US-A06 Create Staff
As an admin, I want to create staff records, so that I can maintain information for trainers, receptionists, and other employees.

**Acceptance Criteria:**
- The admin can enter staff name, position, and contact details.
- After creation, the staff member appears in the staff list.

#### US-A07 Edit Staff Information
As an admin, I want to edit staff information, so that staff records remain accurate.

**Acceptance Criteria:**
- The admin can update staff profile information and employment status.
- After saving, the system displays the updated information.

---

### 3.3 Equipment Management

#### US-A08 View Equipment List
As an admin, I want to view the equipment list, so that I can understand equipment quantity, status, and location.

**Acceptance Criteria:**
- The admin can view equipment name, type, quantity, status, and location.
- The admin can filter equipment by status.

#### US-A09 Create Equipment
As an admin, I want to create equipment records, so that newly purchased gym equipment can be recorded.

**Acceptance Criteria:**
- The admin can enter equipment name, type, quantity, location, and status.
- After creation, the equipment appears in the equipment list.

#### US-A10 Update Equipment Status
As an admin, I want to update equipment status, so that the system reflects whether equipment is available, under maintenance, or retired.

**Acceptance Criteria:**
- The admin can update equipment status.
- The updated status is reflected in both the equipment list and equipment details.

---

### 3.4 Course Management

#### US-A11 View Course List
As an admin, I want to view the course list, so that I can manage course schedules and enrollment status.

**Acceptance Criteria:**
- The admin can view course name, trainer, time, capacity, current enrollment count, and course status.
- The admin can view course details.

#### US-A12 Create Course
As an admin, I want to create courses, so that new gym classes can be made available for member enrollment.

**Acceptance Criteria:**
- The admin can enter course name, trainer, time, location, capacity, and description.
- The system validates course capacity and time fields.
- After creation, the course appears in the course list.

#### US-A13 Edit Course
As an admin, I want to edit course information, so that course time, trainer, capacity, or content can be adjusted.

**Acceptance Criteria:**
- The admin can update basic course information.
- After saving, the updated course information is shown on the member side.

#### US-A14 Delete or Cancel Course
As an admin, I want to delete or cancel a course, so that unavailable courses are no longer open for enrollment.

**Acceptance Criteria:**
- The admin can delete or cancel a course.
- The system shows a confirmation prompt before the operation.
- A cancelled course no longer accepts new enrollments.

---

### 3.5 Enrollment Order Management

#### US-A15 View Enrollment Order List
As an admin, I want to view enrollment orders, so that I can understand member course enrollment status.

**Acceptance Criteria:**
- The admin can view member name, course name, enrollment time, and order status.
- The admin can filter enrollment orders by course or order status.

#### US-A16 View Enrollment Details
As an admin, I want to view enrollment order details, so that I can handle confirmations, cancellations, or abnormal cases.

**Acceptance Criteria:**
- The admin can view the related member, course, and enrollment status.
- The admin can update the order status.

---

## 4. Member User Stories

### 4.1 Account and Profile

#### US-M01 Log In
As a member, I want to log in to the system, so that I can access member features.

**Acceptance Criteria:**
- The member can log in using email and password.
- After successful login, the member is redirected to the member homepage.
- If login fails, the system shows an error message.

#### US-M02 View Profile
As a member, I want to view my profile, so that I can check my personal information and membership status.

**Acceptance Criteria:**
- The member can view name, email, phone number, membership type, and membership status.
- The member can only view their own personal information.

#### US-M03 Edit Profile
As a member, I want to edit my profile, so that my contact information remains accurate.

**Acceptance Criteria:**
- The member can update editable personal information, such as phone number and nickname.
- The member cannot update their own membership status or role permissions.

---

### 4.2 Course Browsing and Enrollment

#### US-M04 View Available Courses
As a member, I want to view available courses, so that I can choose suitable gym classes.

**Acceptance Criteria:**
- The member can view course name, trainer, time, location, remaining capacity, and description.
- The member can view course details.

#### US-M05 Enroll in Course
As a member, I want to enroll in a course, so that I can attend a gym class I am interested in.

**Acceptance Criteria:**
- The member can enroll in a course that is open and has remaining capacity.
- After successful enrollment, the system creates an enrollment record.
- The same member cannot enroll in the same course more than once.

#### US-M06 View My Enrollments
As a member, I want to view my enrollments, so that I can manage the courses I have enrolled in.

**Acceptance Criteria:**
- The member can view a list of their own enrolled courses.
- The list shows course name, time, location, and enrollment status.
- The member can view the details of a single enrollment.

#### US-M07 Cancel Enrollment
As a member, I want to cancel an enrollment, so that I can release the course slot when I cannot attend.

**Acceptance Criteria:**
- The member can cancel their own enrollment if cancellation is allowed.
- After cancellation, the enrollment status is updated.
- The remaining course capacity is restored accordingly.

---

### 4.3 AI Chat Advice

#### US-M08 Use AI Chat
As a member, I want to use the built-in AI chat, so that I can get training and diet advice.

**Acceptance Criteria:**
- The member can enter questions in the chat interface.
- The system returns advice related to fitness, training, or diet.
- Chat messages are displayed in a conversation format.

#### US-M09 View Chat History
As a member, I want to view recent AI chat history, so that I can review previous advice.

**Acceptance Criteria:**
- The member can view their own recent chat history.
- The member cannot view other users' chat history.

---

## 5. General User Stories

### 5.1 Access Control

#### US-G01 Role-Based Access Control
As a system user, I want the system to show features based on my role, so that I cannot access unauthorized pages.

**Acceptance Criteria:**
- After login, an admin can access admin management features.
- After login, a member can only access member features.
- If an unauthenticated user accesses a protected page, they are redirected to the login page.

### 5.2 Data Security

#### US-G02 Protect User Data
As a system user, I want my personal information and operation data to be protected, so that unauthorized access can be prevented.

**Acceptance Criteria:**
- Users can only access data within their permission scope.
- Sensitive operations require permission checks.
- Backend APIs perform authentication and authorization checks.

---

## 6. MVP Priority

| Priority | User Stories |
|---|---|
| P0 Must Have | US-M01, US-M02, US-M04, US-M05, US-M06, US-G01, US-G02, US-A01, US-A02, US-A11, US-A12, US-A15 |
| P1 Should Have | US-M03, US-M07, US-A03, US-A04, US-A05, US-A06, US-A08, US-A09, US-A13, US-A16 |
| P2 Could Have Later | US-M08, US-M09, US-A07, US-A10, US-A14 |

---

## 7. Connection to Later Documents

This document will be used as input for the following documents:

- `03-system-architecture.md`: design the system architecture based on roles and modules.
- `04-database-design.md`: define entities, fields, and relationships based on user stories.
- `05-api-design.md`: design REST APIs based on user stories.
- `06-development-plan.md`: break down development tasks based on MVP priorities.