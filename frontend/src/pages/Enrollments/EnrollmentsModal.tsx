import { useState, useEffect } from 'react';
import { getToken } from '@/services/auth';
import { baseURL } from '@/services/navigate';
import { useActionState } from "react";

interface UserSearchResult {
    user_id: number;
    username: string;
    name: string;
}

interface CourseSearchResult {
    course_id: number;
    course_title: string;
    status: string;
    start_time: string;
}

interface RegisterEnrollmentState {
    success: boolean;
    message?: string;
}
const initialRegisterEnrollmentState: RegisterEnrollmentState = {
    success: false,
};

export interface EnrollmentsModalProps{
    onClose: () => void;
}

export const EnrollmentsModal = ({ onClose }: EnrollmentsModalProps) => {

    const [usernameInput, setUsernameInput] = useState('');
    const [courseNameInput, setCourseNameInput] = useState('');
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [users, setUsers] = useState<UserSearchResult[]>([]);
    const [courses, setCourses] = useState<CourseSearchResult[]>([]);

    const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUserId(null);
        const value = e.target.value;
        setUsernameInput(value);
        if (!value.trim()) {
            setUsers([]);
            return;
        }
        try{
            const token = getToken();
            const response = await fetch(`${baseURL}/api/users/search/${encodeURIComponent(value)}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            let data = await response.json();
            data = data.data
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSessionChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCourseId(null);
        const value = e.target.value;
        setCourseNameInput(value);
        if (!value.trim()) {
            setCourses([]);
            return;
        }
        try{
            const token = getToken();
            const response = await fetch(`${baseURL}/api/courses/search/${encodeURIComponent(value)}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            let data = await response.json();
            data = data.data
            console.log(data)
            setCourses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        }
    };

    const registerEnrollmentAction = async (_prevState: RegisterEnrollmentState, formData: FormData) => {
        const userId = Number(formData.get("user_id"));
        const courseId = Number(formData.get("course_id"));

        if (!userId || !courseId) {
            return {
                success: false,
                message: "Please select a member and a course"
            };
        }

        const payload = {
            user_id: userId,
            course_id: courseId
        };
        try{
            const token = getToken();
            const response = await fetch(`${baseURL}/api/enrollments/admin/enroll`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const data = await response.json();
                return {
                    success: false,
                    message: data.message || "Enrollment failed"
                };
            }

            const data = await response.json();
            const successState: RegisterEnrollmentState = {
                success: true,
                message: data.message || "Enrollment successful"
            }
            onClose();
            return successState;
        }catch (error) {
            console.error(error);
            const errorState: RegisterEnrollmentState = {
                success: false,
                message: "Enrollment failed"
            }
            return errorState;
        }
    }

    const [state, action, isPending] = useActionState(registerEnrollmentAction, initialRegisterEnrollmentState)

    useEffect(() => {
        if (state.message) {
            alert(state.message);
        }
    }, [state]);


    return (
        <div>
            Register New Enrollment: assign a member directly to an upcoming session
            <form action={action}>
                <label htmlFor="memberUsername">
                    Member username:
                    <input type="text" name="member" id="memberUsername" value={usernameInput} onChange={(e) => handleUsernameChange(e)} />
                </label>
                {users.length > 0 && (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc', maxHeight: 200, overflowY: 'auto', background: '#fff' }}>
                        {users.map((user) => (
                            <li
                                key={user.user_id}
                                style={{ padding: '4px 8px', cursor: 'pointer' }}
                                onClick={() => {
                                    setUsernameInput(user.username);
                                    setSelectedUserId(user.user_id);
                                    setUsers([]);
                                }}
                            >
                                {user.username} {user.name}
                            </li>
                        ))}
                    </ul>
                )}
                <label htmlFor="courseName">
                    Course Name:
                    <input type="text" name="course" id="courseName" value={courseNameInput} onChange={(e) => handleSessionChange(e)} />
                </label>
                {courses.length > 0 && (
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc', maxHeight: 200, overflowY: 'auto', background: '#fff' }}>
                        {courses.map((course) => (
                            <li
                                key={course.course_id}
                                style={{ padding: '4px 8px', cursor: 'pointer' }}
                                onClick={() => {
                                    setCourseNameInput(course.course_title);
                                    setSelectedCourseId(course.course_id);
                                    setCourses([]);
                                }}
                            >
                                {course.course_title} {course.status} {course.start_time}
                            </li>
                        ))}
                    </ul>
                )}
                <input type="hidden" name="user_id" value={selectedUserId ?? ''} />
                <input type="hidden" name="course_id" value={selectedCourseId ?? ''} />
                <button type="button" onClick={onClose}>Cancel</button>
                <button disabled={isPending || !selectedUserId || !selectedCourseId} type="submit">Register</button>
            </form>
        </div>
    );
};