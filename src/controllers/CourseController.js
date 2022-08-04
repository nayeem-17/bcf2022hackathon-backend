
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
class CourseController {
    constructor () {}
    list = async (req, res, next) => {
        const { userId } = req.body;
        console.log(userId);
        const courses = await prisma.course.findMany();
        return res.status(200).json(courses)
    }
    get = async (req, res, next) => {
        try {
            const course_id = parseInt(req.params.id);
            const { userId } = req.body;
            console.log(userId);
            const course = await prisma.course.findFirst({
                where: {
                    id: course_id
                }
            });
            return res.status(200).json(course)
        } catch (e) {
            if (e) {
                return res.status(400).json({
                    "message": "invalid course id"
                })
            }
        }
    }
    add = async (req, res, next) => {
        const {
            name,
            description
        } = req.body;
        const data = await prisma.course.create({
            data: {
                name: name,
                description: description
            }
        });
        return res.status(200).json({ id: data.id })

    }
    update = async (req, res, next) => {
        try {
            const course_id = parseInt(req.params.id);
            const { name, description } = req.body;
            const data = await prisma.course.update({
                where: {
                    id: course_id
                },
                data: {
                    name: name,
                    description: description
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
                    "message": "invalid course id"
                })
            }
        }
    }

    delete = async (req, res, next) => {
        try {
            const course_id = parseInt(req.params.id);
            const data = await prisma.course.delete({
                where: {
                    id: course_id
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
                    "message": "invalid course id"
                })
            }
        }
    }


}
module.exports = CourseController;
