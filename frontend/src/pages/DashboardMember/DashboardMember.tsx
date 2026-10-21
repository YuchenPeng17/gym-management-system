import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getToken } from "../../services/auth";
import { baseURL } from "../../services/navigate";
import "./DashboardMember.css";

interface CourseDashboard {
    course_id: number;
    course_title: string;
    start_time: string;
}

const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    }).format(date);
};

const formatTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
};

export const DashboardMember = () => {
    const [upcomingCourses, setUpcomingCourses] = useState<CourseDashboard[]>([]);
    const [memberDays, setMemberDays] = useState<number>(0);
    const [myCourses, setMyCourses] = useState<CourseDashboard[]>([]);

    const fetchDashboardData = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${baseURL}/api/users/dashboard-member`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            let data = await response.json();
            data = data.data
            setUpcomingCourses(Array.isArray(data?.upcoming_courses) ? data.upcoming_courses : []);
            setMemberDays(data.membership_days_count);
            setMyCourses(Array.isArray(data?.top_enrolled_courses) ? data.top_enrolled_courses : []);
        } catch {
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <main className="member-dashboard">
            <header className="member-dashboard-header">
                <div>
                    <p className="member-dashboard-eyebrow">GMS / MEMBER SPACE</p>
                    <h1>Your training, in motion.</h1>
                    <p className="member-dashboard-subtitle">Keep your next session and favorite courses close at hand.</p>
                </div>
                <Link className="member-dashboard-browse" to="/courses">
                    Browse courses <span aria-hidden="true">↗</span>
                </Link>
            </header>

            <section className="member-dashboard-membership" aria-label="Membership summary">
                <div className="member-dashboard-membership-copy">
                    <p className="member-dashboard-eyebrow">YOUR MEMBERSHIP</p>
                    <p className="member-dashboard-tenure"><strong>{memberDays}</strong><span>days</span></p>
                    <p className="member-dashboard-membership-note">and counting as part of the GMS community</p>
                </div>
                <div className="member-dashboard-membership-aside">
                    <span className="member-dashboard-membership-mark" aria-hidden="true">G</span>
                    <span>Make today<br />a training day.</span>
                </div>
            </section>

            <section className="member-dashboard-grid">
                <article className="member-dashboard-panel member-dashboard-upcoming">
                    <div className="member-dashboard-panel-heading">
                        <div>
                            <p className="member-dashboard-eyebrow">ON YOUR CALENDAR</p>
                            <h2>Upcoming courses</h2>
                        </div>
                        <Link to="/enrollments" className="member-dashboard-text-link">My enrollments <span aria-hidden="true">→</span></Link>
                    </div>
                    {upcomingCourses.length === 0 ? (
                        <div className="member-dashboard-empty">
                            <span className="member-dashboard-empty-mark" aria-hidden="true">+</span>
                            <p>No upcoming courses yet.</p>
                            <Link to="/courses">Find a class to join <span aria-hidden="true">↗</span></Link>
                        </div>
                    ) : (
                        <div className="member-dashboard-course-list">
                            {upcomingCourses.slice(0, 5).map((course) => (
                                <div className="member-dashboard-course-row" key={course.course_id}>
                                    <div className="member-dashboard-course-date">
                                        <span>{new Date(course.start_time).toLocaleDateString("en-US", { month: "short" })}</span>
                                        <strong>{new Date(course.start_time).toLocaleDateString("en-US", { day: "2-digit" })}</strong>
                                    </div>
                                    <div className="member-dashboard-course-info">
                                        <strong>{course.course_title}</strong>
                                        <span>{formatDate(course.start_time)}{formatTime(course.start_time) ? ` · ${formatTime(course.start_time)}` : ""}</span>
                                    </div>
                                    <span className="member-dashboard-course-arrow" aria-hidden="true">→</span>
                                </div>
                            ))}
                        </div>
                    )}
                </article>

                <article className="member-dashboard-panel member-dashboard-favorites">
                    <div className="member-dashboard-panel-heading">
                        <div>
                            <p className="member-dashboard-eyebrow">YOUR COURSE PICKS</p>
                            <h2>Most enrolled</h2>
                        </div>
                    </div>
                    {myCourses.length === 0 ? (
                        <div className="member-dashboard-empty member-dashboard-empty--compact">
                            <p>Your course picks will appear here.</p>
                            <Link to="/courses">Explore courses <span aria-hidden="true">↗</span></Link>
                        </div>
                    ) : (
                        <div className="member-dashboard-picks-list">
                            {myCourses.slice(0, 5).map((course, index) => (
                                <div className="member-dashboard-pick-row" key={course.course_id}>
                                    <span className="member-dashboard-pick-number">{String(index + 1).padStart(2, "0")}</span>
                                    <strong>{course.course_title}</strong>
                                    <span className="member-dashboard-pick-arrow" aria-hidden="true">↗</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link to="/courses" className="member-dashboard-all-courses">Explore all courses <span aria-hidden="true">→</span></Link>
                </article>
            </section>
        </main>
    );
}; 