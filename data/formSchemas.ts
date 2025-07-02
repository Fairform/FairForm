import { z } from "zod";

export const formSchemas: Record<string, any> = {
  ndis: z.object({
    companyName: z.string().min(1),
    abn: z.string().min(11).max(11),
    contactEmail: z.string().email(),
    hasSupportCoordination: z.boolean(),
  }),
  childcare: z.object({
    companyName: z.string().min(1),
    address: z.string().min(1),
    staffCount: z.number().min(1),
  }),
};