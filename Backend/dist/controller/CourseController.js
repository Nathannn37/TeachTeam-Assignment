"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const data_source_1 = require("../data-source");
const Course_1 = require("src/entity/Course");
class CourseController {
    constructor() {
        this.courseRepository = data_source_1.AppDataSource.getRepository(Course_1.Course);
    }
    /**
     * Retrieves all courses from the database
     * @param request - Express request object
     * @param response - Express response object
     * @returns JSON response containing an array of all tutorials
     */
    async all(request, response) {
        const courses = await this.courseRepository.find();
        return response.json(courses);
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=CourseController.js.map