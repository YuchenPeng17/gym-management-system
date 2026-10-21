import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useUser } from '@/context/UserContext';
import { getToken } from '@/services/auth';
import { baseURL } from '@/services/navigate';
import './Dashboard.css';

type CourseStatus = 'scheduled' | 'completed' | 'cancelled';

interface DashboardCourse {
    course_id: number;
    course_title: string;
    status: CourseStatus;
    start_time: string;
}

interface DashboardEnrollment {
    enrollment_id: number;
    username: string;
    course_title: string;
    status: string;
    created_at: string;
}

interface DashboardUser {
    user_id: number;
}

const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
};

const formatTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
};

export const Dashboard = () => {
    const { user } = useUser();
    const [courses, setCourses] = useState<DashboardCourse[]>([]);
    const [enrollments, setEnrollments] = useState<DashboardEnrollment[]>([]);
    const [userCount, setUserCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        if (!user) return;

        let isCurrent = true;
        const fetchList = async <T,>(path: string): Promise<T[]> => {
            const token = getToken();
            const response = await fetch(`${baseURL}${path}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(`Request failed: ${path}`);
            const result = await response.json();
            return Array.isArray(result.data) ? result.data : [];
        };

        const loadDashboard = async () => {
            setIsLoading(true);
            setLoadError('');
            try {
                const [courseList, enrollmentList, userList] = await Promise.all([
                    fetchList<DashboardCourse>('/api/courses/list'),
                    fetchList<DashboardEnrollment>('/api/enrollments/list'),
                    isAdmin ? fetchList<DashboardUser>('/api/users/list') : Promise.resolve([]),
                ]);
                if (!isCurrent) return;
                setCourses(courseList);
                setEnrollments(enrollmentList);
                setUserCount(userList.length);
            } catch (error) {
                console.error('Error loading dashboard:', error);
                if (isCurrent) setLoadError('Dashboard data could not be loaded. Please try again later.');
            } finally {
                if (isCurrent) setIsLoading(false);
            }
        };

        void loadDashboard();
        return () => {
            isCurrent = false;
        };
    }, [isAdmin, user]);

    const now = new Date();
    const upcomingCourses = courses
        .filter((course) => course.status === 'scheduled' && new Date(course.start_time) >= now)
        .sort((first, second) => new Date(first.start_time).getTime() - new Date(second.start_time).getTime());
    const recentEnrollments = [...enrollments]
        .sort((first, second) => new Date(second.created_at).getTime() - new Date(first.created_at).getTime())
        .slice(0, 5);
    const activeEnrollments = enrollments.filter((enrollment) => enrollment.status === 'enrolled').length;
    const completedCourses = courses.filter((course) => course.status === 'completed').length;
    const dateLabel = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    }).format(now);

    return (
        <main className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">GMS / OVERVIEW</p>
                    <h1>Good {now.getHours() < 12 ? 'morning' : now.getHours() < 18 ? 'afternoon' : 'evening'}{user?.name ? `, ${user.name}` : ''}</h1>
                    <p className="dashboard-subtitle">A clear view of courses, members, and enrollment activity.</p>
                </div>
                <time className="dashboard-date">{dateLabel}</time>
            </header>

            {loadError && <p className="dashboard-error" role="alert">{loadError}</p>}

            <section className="dashboard-metrics" aria-label="Key metrics">
                <article className="dashboard-metric dashboard-metric--blue">
                    <span className="dashboard-metric-label">Courses</span>
                    <strong>{isLoading ? '—' : courses.length}</strong>
                    <span className="dashboard-metric-note">Across all statuses</span>
                </article>
                <article className="dashboard-metric dashboard-metric--green">
                    <span className="dashboard-metric-label">Upcoming sessions</span>
                    <strong>{isLoading ? '—' : upcomingCourses.length}</strong>
                    <span className="dashboard-metric-note">Scheduled from today</span>
                </article>
                <article className="dashboard-metric dashboard-metric--coral">
                    <span className="dashboard-metric-label">Active enrollments</span>
                    <strong>{isLoading ? '—' : activeEnrollments}</strong>
                    <span className="dashboard-metric-note">Currently enrolled</span>
                </article>
                <article className="dashboard-metric dashboard-metric--gold">
                    <span className="dashboard-metric-label">{isAdmin ? 'People' : 'Completed courses'}</span>
                    <strong>{isLoading ? '—' : isAdmin ? userCount : completedCourses}</strong>
                    <span className="dashboard-metric-note">{isAdmin ? 'Registered accounts' : 'Course history'}</span>
                </article>
            </section>

            <nav className="dashboard-shortcuts" aria-label="Quick links">
                <span className="dashboard-shortcuts-label">Go to</span>
                <Link to="/courses">Browse courses <span aria-hidden="true">↗</span></Link>
                <Link to="/enrollments">Manage enrollments <span aria-hidden="true">↗</span></Link>
            </nav>

            <section className="dashboard-content-grid">
                <article className="dashboard-panel dashboard-upcoming">
                    <div className="dashboard-panel-heading">
                        <div>
                            <p className="dashboard-eyebrow">ON THE CALENDAR</p>
                            <h2>Upcoming courses</h2>
                        </div>
                        <Link to="/courses" className="dashboard-text-link">All courses <span aria-hidden="true">→</span></Link>
                    </div>
                    {isLoading ? (
                        <p className="dashboard-empty">Loading upcoming courses…</p>
                    ) : upcomingCourses.length === 0 ? (
                        <p className="dashboard-empty">No upcoming courses scheduled.</p>
                    ) : (
                        <div className="dashboard-course-list">
                            {upcomingCourses.slice(0, 5).map((course) => (
                                <div className="dashboard-course-row" key={course.course_id}>
                                    <div className="dashboard-course-date">
                                        <strong>{new Date(course.start_time).toLocaleDateString('en-US', { day: '2-digit' })}</strong>
                                        <span>{new Date(course.start_time).toLocaleDateString('en-US', { month: 'short' })}</span>
                                    </div>
                                    <div className="dashboard-course-info">
                                        <strong>{course.course_title}</strong>
                                        <span>{formatDate(course.start_time)} · {formatTime(course.start_time)}</span>
                                    </div>
                                    <span className="dashboard-status">Scheduled</span>
                                </div>
                            ))}
                        </div>
                    )}
                </article>

                <article className="dashboard-panel dashboard-activity">
                    <div className="dashboard-panel-heading">
                        <div>
                            <p className="dashboard-eyebrow">LATEST UPDATES</p>
                            <h2>Recent enrollments</h2>
                        </div>
                        <Link to="/enrollments" className="dashboard-text-link">View all <span aria-hidden="true">→</span></Link>
                    </div>
                    {isLoading ? (
                        <p className="dashboard-empty">Loading enrollment activity…</p>
                    ) : recentEnrollments.length === 0 ? (
                        <p className="dashboard-empty">No enrollment activity yet.</p>
                    ) : (
                        <div className="dashboard-enrollment-list">
                            {recentEnrollments.map((enrollment) => (
                                <div className="dashboard-enrollment-row" key={enrollment.enrollment_id}>
                                    <span className="dashboard-avatar" aria-hidden="true">
                                        {enrollment.username.slice(0, 1).toUpperCase()}
                                    </span>
                                    <div className="dashboard-enrollment-info">
                                        <strong>{enrollment.username}</strong>
                                        <span>{enrollment.course_title}</span>
                                    </div>
                                    <time>{formatDate(enrollment.created_at)}</time>
                                </div>
                            ))}
                        </div>
                    )}
                </article>
            </section>

            <footer className="dashboard-footer">
                <span className="dashboard-footer-mark" aria-hidden="true">G</span>
                <span>Learning, organized.</span>
                <span className="dashboard-footer-line" />
                <span>{courses.length} courses · {enrollments.length} enrollments</span>
            </footer>
        </main>
    );
};