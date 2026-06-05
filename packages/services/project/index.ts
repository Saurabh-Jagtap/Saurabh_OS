import db, { desc, eq } from "@repo/database"
import { projectsTable } from "@repo/database/schema"

class ProjectService{

    public async getProjects(){
        return await db
        .select()
        .from(projectsTable)
        .orderBy(desc(projectsTable.createdAt))
    }

    public async getFeaturedProjects(){
        return await db
        .select()
        .from(projectsTable)
        .where(eq(projectsTable.featured, true))
        .orderBy(desc(projectsTable.createdAt))
    }
}

export default ProjectService