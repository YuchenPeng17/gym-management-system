本项目是一个健身房管理系统，采用前后端分离架构：前端负责页面与交互，后端提供 REST API、会话与数据持久化。

用户分为管理员与会员：
- 管理员维护会员、员工、器材、课程与报名订单等；
- 会员可查看/修改个人信息、报名课程；

模块：
- Members
- Admins
- Equipments
- Courses
- Auth

---
user
- PK: user_id                       BIGINT, PRIMARY KEY, 
- username                          VARCHAR(50), NOT NULL, UNIQUE
- password_hash                     VARCHAR(255), NOT NULL,
- name                              VARCHAR(100), NOT NULL,
- role                              VARCHAR(20), NOT NULL, CHECK FOR (admin / member), 
- created_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW(),
- updated_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW(),

equipment
- PK: equipment_id                  BIGINT, PRIMARY KEY, 
- name                              VARCHAR(100), NOT NULL,
- category                          VARCHAR(100), NOT NULL,
- status                            VARCHAR(50), NOT NULL, CHECK FOR (available / maintenance / out_of_service)
- purchase_date                     DATE, NULLABLE
- created_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW(),
- updated_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW(),


course
- PK: course_id                     BIGINT, PRIMARY KEY, 
- course_title                      VARCHAR(100), NOT NULL
- description                       TEXT, NULLABLE
- start_time                        TIMESTAMPTZ, NOT NULL
- duration                          INTEGER, NOT NULL, CHECK FOR (duration > 0)
- capacity                          INTEGER, NOT NULL, CHECK FOR (capacity > 0)
- status                            VARCHAR(50), NOT NULL, CHECK FOR (scheduled / completed / cancelled)
- created_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW()
- updated_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW()

enrollment
- FK: user_id                       BIGINT, NOT NULL, REFERENCES user(user_id), ON DELETE CASCADE
- FK: course_id                     BIGINT, NOT NULL, REFERENCES course(course_id), ON DELETE CASCADE
- status                            VARCHAR(50), NOT NULL, CHECK FOR (enrolled / completed / cancelled)
- created_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW()
- updated_at                        TIMESTAMPTZ, NOT NULL, DEFAULT NOW()
UNIQUE (user_id, course_id)