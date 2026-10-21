import { useState, useEffect } from 'react';
import { getToken } from '@/services/auth';
import { useUser } from '@/context/UserContext';
import { CourseModal } from './CourseModal';
import type { CourseFormValues } from './CourseModal';
import { baseURL } from '@/services/navigate';
import './Courses.css';

type CourseStatus = "scheduled" | "completed" | "cancelled";

export interface Course {
    course_id: number;
    course_title: string;
    description: string | null;
    status: CourseStatus;
    start_time: string;
    duration: number;
    capacity: number;
    created_at: string;
    updated_at: string;
}

export const Courses = () => {
    // 获取用户
    const { user } = useUser();
    const isMemberEnroll = user?.role === "member";
    // 获取课程列表
    const [courses, setCourses] = useState<Course[]>([]);
    // 获取课程列表
    const fetchCourses = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${baseURL}/api/courses/list`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setCourses(data.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    useEffect(() => {
        if (!user){
            return;
        };
        void fetchCourses();
    }, [user]);

    // 编辑和添加课程 Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const saveCourse = async (values: CourseFormValues) => {
        const URL = selectedCourse
        ? `${baseURL}/api/courses/update/${selectedCourse.course_id}`
        : `${baseURL}/api/courses/add`;
        const method = selectedCourse ? 'PUT' : 'POST';
        try {
            const token = getToken();
            await fetch(URL, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                ...(!isMemberEnroll && { body: JSON.stringify(values) })
            });
            setIsModalOpen(false);
            setSelectedCourse(null);
            void fetchCourses();
        } catch (error) {
            console.error('Error saving course:', error);
        }
    }

    // member 加入课程
    const enrollCourse = async (courseId: number) => {
        try {
            const token = getToken();
            const response = await fetch(`${baseURL}/api/enrollments/enroll/${courseId}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to enroll");
            }
            alert("Successfully enrolled in course!");
            await fetchCourses();
        } catch (error) {
            console.error('Error enrolling in course:', error);
        }
    };

    return (
        <div className="courses-page">
            {/* Tool Bar */}
            <div className="courses-toolbar">
                <h1>{user?.role === 'admin' ? 'Course Management' : 'View Courses'}</h1>
                {user?.role === 'admin' && (
                    <button
                        className="courses-add-button"
                        type="button"
                        onClick={() => {
                            setIsModalOpen(true);
                            setSelectedCourse(null);
                        }}
                    >
                        Add Course
                    </button>
                )}
            </div>

            {/* Courses Table */}
            <div className="courses-table-wrap">
                <table className="courses-table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Start Time</th>
                            <th>Duration(mins)</th>
                            <th>Capacity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.course_id}>
                                <td>{course.course_id}</td>
                                <td>{course.course_title}</td>
                                <td>{course.description}</td>
                                <td><span className={`courses-status courses-status--${course.status}`}>{course.status}</span></td>
                                <td>{course.start_time.slice(0, 10)}</td>
                                <td>{course.duration}</td>
                                <td>{course.capacity}</td>
                                <td>
                                    <div className="courses-actions">
                                        {/* 如果用户是 member，显示 join。如果用户是 admin，显示 edit。 */}
                                        {user?.role === "member" && (
                                            <button
                                                type="button"
                                                onClick={() => void enrollCourse(course.course_id)}
                                            >
                                                Join
                                            </button>
                                        )}

                                        {user?.role === "admin" && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCourse(course);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <CourseModal
                    course={selectedCourse ?? undefined}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={saveCourse}
                />
            )}
        </div>
    );
}