import type { Course } from '@/pages/Courses/Courses';
import { useState, useEffect } from 'react';
import { convertToDateTimeLocal, convertToTimestampz } from '@/services/time';
import './CourseModal.css';

export interface CourseFormValues {
    course_title: string;
    description: string | null;
    start_time: string;
    duration: number;
    capacity: number;
    status: "scheduled" | "completed" | "cancelled";
}

export interface CourseModalProps{
    course?: Course;
    onClose: () => void;
    onSubmit: (values: CourseFormValues) => void;
}

export const CourseModal = ({ course, onClose, onSubmit }: CourseModalProps) => {
    // 1. 判断 course 有值还是 undefined，如果是 undefined 就是添加 course
    // 2. 如果是有值的 course，就是编辑 course
    // 3. 把表格内容传给父级 Courses
    
    // 确认是用户加入课程还是管理员添加或修改课程
    // true 如果有 course 传入
    const isEdit = course !== undefined; 

    // 表单状态初始化
    const [formValues, setFormValues] = useState<CourseFormValues>({
        course_title: "",
        description: null,
        start_time: "",
        duration: 60,
        capacity: 10,
        status: "scheduled",
    });
    useEffect(() => {
        if (isEdit && course) {
            setFormValues({
                course_title: course.course_title,
                description: course.description,
                start_time: course.start_time,
                duration: course.duration,
                capacity: course.capacity,
                status: course.status,
            });
        }
    }, [isEdit, course]);

    // 提交表单
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formValues);
    };
    return (
        <div className="course-modal-backdrop">
            <section className="course-modal" role="dialog" aria-modal="true" aria-labelledby="course-modal-title">
                <h2 className="course-modal-title" id="course-modal-title">{isEdit ? "Edit Course" : "Add Course"}</h2>
                
                <form className="course-modal-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="course_title">Course Title</label>
                        <input
                        id="course_title"
                        type="text"
                        value={formValues.course_title}
                        onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            course_title: e.target.value,
                            })
                        }
                        required
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                        id="description"
                        value={formValues.description ?? ""}
                        onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            description: e.target.value || null,
                            })
                        }
                        />
                    </div>

                    <div>
                        <label htmlFor="start_time">Start Time</label>
                        <input
                        id="start_time"
                        type="datetime-local"
                        value={convertToDateTimeLocal(formValues.start_time)}
                        onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            start_time: convertToTimestampz(e.target.value),
                            })
                        }
                        required
                        />
                    </div>

                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input
                        id="duration"
                        type="number"
                        value={formValues.duration}
                        onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            duration: Number(e.target.value),
                            })
                        }
                        required
                        />
                    </div>

                    <div>
                        <label htmlFor="capacity">Capacity</label>
                        <input
                        id="capacity"
                        type="number"
                        value={formValues.capacity}
                        onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            capacity: Number(e.target.value),
                            })
                        }
                        readOnly
                        />
                    </div>

                    <div>
                        <label htmlFor="status">Status</label>
                        <select
                        id="status"
                        value={formValues.status}
                        onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            status: e.target.value as CourseFormValues["status"],
                            })
                        }
                        >
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Canceled</option>
                        </select>
                    </div>

                    <div className="course-modal-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>

                        <button type="submit">
                            {isEdit ? "Save Changes" : "Add Course"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );

};