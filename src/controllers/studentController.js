
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
class StudentController {
    getResult = async (req, res) => {
        try {
            const student_id = parseInt(req.body.student_id);

            const data = await prisma.result.findFirst({
                where: {
                    studentId: student_id
                }
            })

            return res.status(200).json(data)

        } catch (error) {
            if (error) {
                console.log(error)
                return res.status(400).json({
                    "message": "invalid id"
                })
            }
        }
    }
    register = async (req, res) => {
        try {
            const course_id = parseInt(req.body.course_id);
            const student_id = parseInt(req.body.student_id);
            const data = await prisma.registration.create({
                data: {
                    studentId: student_id,
                    courseId: course_id
                }
            })
            return res.status(200).json({ id: data.id })

        } catch (error) {
            if (error) {
                console.log(error)
                return res.status(400).json({
                    "message": "invalid id"
                })
            }
        }
    }
    add = async (req, res) => {
        const {
            name,
            gender, year
        } = req.body;
        const data = await prisma.student.create({
            data: {
                name: name,
                gender: gender,
                year: year
            }
        });
        return res.status(200).json({ id: data.id })
    }
    list = async (req, res) => {

        const students = await prisma.student.findMany();
        return res.status(200).json(students)
    }

    getRegistered = async (req, res) => {
        try {
            const course_id = parseInt(req.params.course_id);
            const registrations = await prisma.registration.findMany({
                where: {
                    courseId: course_id
                }
            })

            const student_ids = []

            registrations.forEach(s => {
                student_ids.push(s.studentId);
            })
            const students = await prisma.student.findMany({
                where: {
                    id: {
                        in: student_ids
                    }
                }
            })
            return res.status(200).json(students)

        } catch (e) {
            if (e) {
                console.log(e);
                return res.status(400).json({
                    "message": "invalid course id"
                })
            }
        }
    }

    get = async (req, res) => {
        try {
            const student_id = parseInt(req.params.id);
            const student = await prisma.student.findFirst({
                where: {
                    id: student_id
                }
            });
            return res.status(200).json(student)
        } catch (e) {
            if (e) {
                return res.status(400).json({
                    "message": "invalid course id"
                })
            }
        }
    }
    update = async (req, res) => {
        try {
            const student_id = parseInt(req.params.id);
            const { name, gender, year } = req.body;
            const data = await prisma.student.update({
                where: {
                    id: student_id
                },
                data: {
                    name: name,
                    gender: gender,
                    year: year
                }
            })
            if (data) {
                return res.status(200).json({
                    success: true
                })
            } else {
                return res.status(503).json({
                    success: false
                })
            }
        } catch (e) {
            if (e) {
                return res.status(400).json({
                    "message": "invalid student id"
                })
            }
        }
    }
    delete = async (req, res) => {
        try {
            const student_id = parseInt(req.params.id);
            const data = await prisma.student.delete({
                where: {
                    id: student_id
                },
            });
            if (data) {
                return res.status(200).json({
                    success: true
                })
            } else {
                return res.status(503).json({
                    success: false
                })
            }
        } catch (e) {
            if (e) {
                console.log(e);
                return res.status(400).json({
                    "message": "invalid student id"
                })
            }
        }
    }

}
module.exports = StudentController;
