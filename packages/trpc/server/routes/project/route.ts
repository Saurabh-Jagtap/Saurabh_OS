import { projectService } from "../../services";
import { publicProcedure, router } from "../../trpc";

export const projectRouter = router({
    getProjects: publicProcedure
    .query(async()=>{
        console.log("PROJECT ROUTE HIT");
        const projects = await projectService.getProjects()
        return projects;
    }),
    getFeaturedProjects: publicProcedure
    .query(async()=>{
        const featuredProjects = await projectService.getFeaturedProjects()
        return featuredProjects;
    })
})