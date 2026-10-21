import type { Course } from '../Courses/Courses';
import { useState, useEffect } from 'react';
import { getToken } from '../../services/auth';
import { baseURL } from '../../services/navigate';
import '../Courses/Courses.css';

interface Enrollment {
    enrollment_id: number;
    course: Course;
    status: string;
}

export const CoursesMember = () => {
    //
    const [myEnrollments, setMyEnrollments] = useState<Enrollment[]>([]);
    const fetchMyEnrollments = async () => {
        try{
            const token = getToken();
            const response = await fetch(`${baseURL}/api/enrollments/member/my-enrollments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let data = await response.json();
            data = data.data;
            setMyEnrollments(data);
        }catch(error){
            console.error('Failed to fetch my courses2:', error);
        }
    };  

    //
    useEffect(() => {
        fetchMyEnrollments();
    }, []);



    //
    const handleActionButton = async (courseId: number) => {
        try {
            const token = getToken();
            const response = await fetch(`${baseURL}/api/enrollments/update/member/${courseId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('Action response:', data);
            // Refresh the courses list after action
            fetchMyEnrollments();
        } catch (error) {
            console.error('Failed to perform action on course:', error);
        }
    }


    return (
        <div className="courses-page">
            <div className="courses-toolbar">
                <h1>My Enrollments</h1>
            </div>

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
                        {myEnrollments.length === 0 ? (
                            <tr>
                                <td colSpan={8}>No courses found.</td>
                            </tr>
                        ) : myEnrollments.map((enrollment) => (
                            <tr key={enrollment.enrollment_id}>
                                <td>{enrollment.course.course_id}</td>
                                <td>{enrollment.course.course_title}</td>
                                <td>{enrollment.course.description || '—'}</td>
                                <td>
                                    <span className={`courses-status courses-status--${enrollment.status}`}>
                                        {enrollment.status}
                                    </span>
                                </td>
                                <td>{enrollment.course.start_time.slice(0, 10)}</td>
                                <td>{enrollment.course.duration}</td>
                                <td>{enrollment.course.capacity}</td>
                                <td>
                                    <div className="courses-actions">
                                        <button
                                            type="button"
                                            onClick={() => void handleActionButton(enrollment.course.course_id)}
                                        >
                                            {enrollment.status === 'cancelled' ? 'Rejoin' : 'Cancel'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};