import {  actionClientWithMeta} from "@/lib/safe-action";
import { z } from "zod";

export const createApplicationAction = actionClientWithMeta
.metadata({
    name: "create-Application",
   track: {
    event: "create-Application",
    channel: "applications",
   }
})
.schema(z.object({
    jobId: z.string(),
    userId: z.string(),
}))
.action(async ({parsedInput, ctx}) => {

    const { jobId, userId } = parsedInput;
    
    
})