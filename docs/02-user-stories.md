# 02. User Stories

## 1. Purpose

This document describes the core user stories of the Gym Management System. It defines user goals, key actions, and acceptance criteria based on the current PRD and product structure.

User stories follow this format:

> As a [role], I want to [perform an action], so that [I can achieve a goal].

---

## 2. User Roles

| Role | Description |
| ---- | ----------- |
| Admin | Manages members, staff, equipment, maintenance records, courses, and enrollments through the Admin Portal. |
| Member | Manages personal profile, browses courses, manages own enrollments, and uses the AI Fitness Assistant through the Member Portal. |

---

## 3. Admin User Stories

### 3.1 Member Management

#### US-A01 View Member List

As an admin, I want to view the member list, so that I can manage gym members efficiently.

**Acceptance Criteria:**

- The admin can view basic member information, including name, email, phone, membership type, and status.
- The admin can search members by keyword.
- The admin can filter members by status or membership type.
- The admin can sort members where applicable.

#### US-A02 View Member Details

As an admin, I want to view member details, so that I can understand a member's profile and enrollment history.

**Acceptance Criteria:**

- The admin can view member basic information.
- The admin can view the member's enrollment history.
- The admin can add or cancel enrollments from the member details page.

#### US-A03 Create Member

As an admin, I want to create a new member, so that new gym members can be registered in the system.

**Acceptance Criteria:**

- The admin can enter required member information.
- The system validates required fields and valid formats.
- After creation, the member appears in the member list.

#### US-A04 Update Member

As an admin, I want to update member information, so that member records remain accurate.

**Acceptance Criteria:**

- The admin can update editable member information.
- The system validates the updated information.
- After saving, the updated information is shown in member details.

#### US-A05 Deactivate or Delete Member

As an admin, I want to deactivate or delete a member, so that invalid or inactive member accounts can be managed properly.

**Acceptance Criteria:**

- The admin can deactivate or delete a member.
- The system shows a confirmation prompt before the operation.
- A deactivated member cannot log in or enroll in courses.
- Historical records are kept where applicable.

---

### 3.2 Staff Management

#### US-A06 View Staff List

As an admin, I want to view the staff list, so that I can manage gym staff and instructors.

**Acceptance Criteria:**

- The admin can view staff basic information, including name, contact details, position, and status.
- The admin can search staff by keyword.
- The admin can filter or sort staff where applicable.

#### US-A07 View Staff Details

As an admin, I want to view staff details, so that I can check staff information and assigned courses.

**Acceptance Criteria:**

- The admin can view staff basic information.
- The admin can view assigned courses for the selected staff member.

#### US-A08 Create Staff

As an admin, I want to create a staff record, so that new staff members can be added to the system.

**Acceptance Criteria:**

- The admin can enter required staff information.
- The system validates required fields.
- After creation, the staff member appears in the staff list.

#### US-A09 Update Staff

As an admin, I want to update staff information, so that staff records remain accurate.

**Acceptance Criteria:**

- The admin can update editable staff information.
- After saving, the updated information is shown in staff details.

#### US-A10 Deactivate or Delete Staff

As an admin, I want to deactivate or delete staff records, so that inactive staff can be managed properly.

**Acceptance Criteria:**

- The admin can deactivate or delete a staff record.
- The system shows a confirmation prompt before the operation.
- Deactivated staff are kept for historical records where applicable.

---

### 3.3 Equipment Management

#### US-A11 View Equipment List

As an admin, I want to view the equipment list, so that I can understand equipment status and location.

**Acceptance Criteria:**

- The admin can view equipment name, category, location, and status.
- The admin can search equipment by keyword.
- The admin can filter equipment by category, location, or status.

#### US-A12 View Equipment Details

As an admin, I want to view equipment details, so that I can check equipment information and maintenance history.

**Acceptance Criteria:**

- The admin can view equipment basic information.
- The admin can view maintenance history for the selected equipment.

#### US-A13 Create Equipment

As an admin, I want to create equipment records, so that newly purchased gym equipment can be recorded.

**Acceptance Criteria:**

- The admin can enter required equipment information.
- The system validates required fields.
- After creation, the equipment appears in the equipment list.

#### US-A14 Update Equipment

As an admin, I want to update equipment information, so that equipment records remain accurate.

**Acceptance Criteria:**

- The admin can update equipment information and status.
- The updated information is reflected in the equipment list and details page.

#### US-A15 Deactivate or Delete Equipment

As an admin, I want to deactivate or delete equipment records, so that unavailable or retired equipment can be managed.

**Acceptance Criteria:**

- The admin can deactivate or delete equipment.
- The system shows a confirmation prompt before the operation.
- Deactivated or retired equipment is not treated as available.

#### US-A16 Add Maintenance Record

As an admin, I want to add a maintenance record, so that equipment maintenance history can be tracked.

**Acceptance Criteria:**

- The admin can add a maintenance record for selected equipment.
- The record includes maintenance date, type, description, cost, performer, and next maintenance date where applicable.
- After creation, the record appears in the equipment maintenance history.

#### US-A17 Import Maintenance Records

As an admin, I want to import maintenance records from a file, so that multiple maintenance records can be added efficiently.

**Acceptance Criteria:**

- The admin can upload a valid maintenance record file.
- The system validates required columns and data formats before import.
- Invalid rows are shown with clear error reasons.
- Valid records are imported into the equipment maintenance history after confirmation.

---

### 3.4 Course Management

#### US-A18 View Course List

As an admin, I want to view the course list, so that I can manage course schedules and enrollment status.

**Acceptance Criteria:**

- The admin can view course name, instructor, time, location, capacity, enrollment count, and status.
- The admin can search, filter, or sort courses where applicable.

#### US-A19 View Course Details

As an admin, I want to view course details, so that I can check course information and enrolled members.

**Acceptance Criteria:**

- The admin can view course information.
- The admin can view the enrollment list for the selected course.
- The admin can add or cancel enrollments from the course details page.

#### US-A20 Create Course

As an admin, I want to create a course, so that new gym classes can be made available for member enrollment.

**Acceptance Criteria:**

- The admin can enter course name, instructor, time, location, capacity, and description.
- The system validates course capacity and time fields.
- After creation, the course appears in the course list.

#### US-A21 Update Course

As an admin, I want to update course information, so that course time, instructor, capacity, or content can be adjusted.

**Acceptance Criteria:**

- The admin can update editable course information.
- After saving, the updated course information is shown on both admin and member sides.

#### US-A22 Cancel or Delete Course

As an admin, I want to cancel or delete a course, so that unavailable courses are no longer open for enrollment.

**Acceptance Criteria:**

- The admin can cancel or delete a course.
- The system shows a confirmation prompt before the operation.
- A cancelled course no longer accepts new enrollments.

---

## 4. Member User Stories

### 4.1 Profile Management

#### US-M01 View Profile

As a member, I want to view my profile, so that I can check my personal information and membership status.

**Acceptance Criteria:**

- The member can view their own profile information.
- The member can view membership type and account status.
- The member cannot view other members' profiles.

#### US-M02 Update Profile

As a member, I want to update my profile, so that my personal information remains accurate.

**Acceptance Criteria:**

- The member can update allowed personal information.
- The member cannot update role, membership status, or permission-related fields.
- The system validates required fields and valid formats.

---

### 4.2 Course Browsing

#### US-M03 View Course List

As a member, I want to browse available courses, so that I can choose suitable gym classes.

**Acceptance Criteria:**

- The member can view available courses.
- The member can search, filter, or sort courses where applicable.
- The list shows key course information such as name, instructor, time, location, remaining capacity, and status.

#### US-M04 View Course Details

As a member, I want to view course details, so that I can decide whether to enroll in the course.

**Acceptance Criteria:**

- The member can view course time, instructor, location, capacity, description, and status.
- The member can see whether the course is open for enrollment.

#### US-M05 Enroll in Course

As a member, I want to enroll in a course, so that I can attend a gym class.

**Acceptance Criteria:**

- The member can enroll only in an open course with available capacity.
- The same member cannot enroll in the same course more than once.
- After enrollment, the system creates an enrollment record.
- The course remaining capacity is updated accordingly.

---

### 4.3 My Enrollments

#### US-M06 View My Enrollment List

As a member, I want to view my enrollments, so that I can manage the courses I have enrolled in.

**Acceptance Criteria:**

- The member can view only their own enrollment records.
- The list shows course name, time, location, and enrollment status.

#### US-M07 View Enrollment Details

As a member, I want to view enrollment details, so that I can check the details of a selected enrollment.

**Acceptance Criteria:**

- The member can view details of their selected enrollment.
- The details include course information and enrollment status.

#### US-M08 Cancel Enrollment

As a member, I want to cancel an enrollment, so that I can release the course slot when I cannot attend.

**Acceptance Criteria:**

- The member can cancel their own active enrollment when cancellation is allowed.
- The system shows a confirmation prompt before cancellation.
- After cancellation, the enrollment status is updated.
- The course remaining capacity is restored accordingly.

---

### 4.4 AI Fitness Assistant

#### US-M09 Use AI Fitness Assistant

As a member, I want to use the AI Fitness Assistant, so that I can get general training and diet suggestions.

**Acceptance Criteria:**

- The member can enter training or diet questions in the chat interface.
- The system returns AI-generated suggestions.
- Chat messages are displayed in a conversation format.

---

## 5. General User Stories

### 5.1 Access Control

#### US-G01 Log In

As a system user, I want to log in, so that I can access features based on my role.

**Acceptance Criteria:**

- The user can log in using valid credentials.
- After successful login, the user is redirected to the correct portal.
- If login fails, the system shows an error message.

#### US-G02 Role-Based Access Control

As a system user, I want the system to show features based on my role, so that unauthorized access can be prevented.

**Acceptance Criteria:**

- Admin users can access admin management features.
- Member users can access member portal features.
- Unauthenticated users are redirected to the login page when accessing protected pages.
- Backend APIs perform authentication and authorization checks.

### 5.2 Data Protection

#### US-G03 Protect User Data

As a system user, I want my personal and operation data to be protected, so that unauthorized access can be prevented.

**Acceptance Criteria:**

- Users can only access data within their permission scope.
- Sensitive operations require permission checks.
- Important operations require confirmation where applicable.

---

## 6. MVP Priority

| Priority | User Stories |
| -------- | ------------ |
| P0 Must Have | US-G01, US-G02, US-A01, US-A02, US-A03, US-A18, US-A19, US-A20, US-M01, US-M03, US-M04, US-M05, US-M06 |
| P1 Should Have | US-A04, US-A05, US-A06, US-A07, US-A08, US-A11, US-A12, US-A13, US-A14, US-A16, US-A21, US-A22, US-M02, US-M07, US-M08 |
| P2 Could Have Later | US-A09, US-A10, US-A15, US-A17, US-M09, US-G03 |

---

## 7. Connection to Later Documents

This document will be used as input for the following documents:

- `03-system-architecture.md`: design the system architecture based on roles and modules.
- `04-database-design.md`: define entities, fields, and relationships based on user stories.
- `05-api-design.md`: design REST APIs based on user stories.
- `06-development-plan.md`: break down development tasks based on MVP priorities.