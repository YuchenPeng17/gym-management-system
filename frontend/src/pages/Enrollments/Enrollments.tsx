import { useEffect, useState } from "react";
import { getToken } from '@/services/auth';
import { baseURL } from '@/services/navigate';
import { EnrollmentsModal } from './EnrollmentsModal';
import "./Enrollments.css";

interface Enrollment {
    id: number;
    memberUsername: string;
    courseTitle: string;
    enrollmentDate: string;
    status: string;
}
interface ApiEnrollment {
    enrollment_id: number;
    user_id: number;
    username: string;
    course_id: number;
    course_title: string;
    status: string;
    created_at: string;
    updated_at: string;
}


export const Enrollments = () => {
    // 获取报名信息
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchEnrollments = async () => {
        // Replace with your API call
        try {
            const token = getToken();
            const response = await fetch(`${baseURL}/api/enrollments/list`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            let data = await response.json();
            data = data.data
            setEnrollments(data.map((item: ApiEnrollment)=>({
                id: item.enrollment_id,
                memberUsername: item.username,
                courseTitle: item.course_title,
                enrollmentDate: item.created_at,
                status: item.status,
            })));
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // 取消报名
    const updateEnrollment = async (enrollmentId: number) => {
        try {
            const token = getToken();
            const response = await fetch(`${baseURL}/api/enrollments/update/${enrollmentId}`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to update enrollment");
            }
            alert("Successfully updated enrollment!");
            await fetchEnrollments();
        } catch (error) {
            console.error('Error updating enrollment:', error);
        }
    };

    useEffect(() => {
        void fetchEnrollments();
    }, []);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="enrollments-page">
            {/* Tool Bar */}
            <div className="courses-toolbar">
                <h1>Enrollments Management</h1>
                <button
                    className="courses-add-button"
                    type="button"
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
                    Add Enrollment
                </button>
            </div>
            <div className="enrollments-search-bar">
                <input
                    type="text"
                    placeholder="Search by username, enrollment ID, or course name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="enrollments-table-wrap">
                <table className="enrollments-table">
                    <thead>
                        <tr>
                            <th>Enrollment ID</th>
                            <th>Member Username</th>
                            <th>Course Title</th>
                            <th>Enrollment Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.filter((enrollment) => 
                            enrollment.memberUsername.includes(searchTerm) ||
                            enrollment.id.toString().includes(searchTerm) ||
                            enrollment.courseTitle.includes(searchTerm)
                        ).map((enrollment) => (
                            <tr key={enrollment.id}>
                                <td>{enrollment.id}</td>
                                <td>{enrollment.memberUsername}</td>
                                <td>{enrollment.courseTitle}</td>
                                <td>{enrollment.enrollmentDate}</td>
                                <td>
                                    <span className={`enrollments-status enrollments-status--${enrollment.status}`}>
                                        {enrollment.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="enrollments-actions">
                                        <button disabled={enrollment.status==="completed"} type="button" onClick={() => updateEnrollment(enrollment.id)}>
                                            {enrollment.status==="enrolled" ? "Cancel" : "Enroll"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {isModalOpen && 
            <EnrollmentsModal 
                onClose={() => { setIsModalOpen(false); fetchEnrollments(); }}
            />}
        </div>
    );
};