import { z } from 'zod';

/* job validations */
export const JOB_STATUS = ['pending', 'interview', 'declined'] as const;
export const JOB_TYPE = [
  'full-time',
  'part-time',
  'remote',
  'internship',
] as const;

export const jobSchema = z.object({
  jobPosition: z
    .string({
      required_error: 'Position is required',
      invalid_type_error: 'Position must be a string',
    })
    .min(2, { message: 'Position must be 2 or more characters long' })
    .max(200, {
      message: 'Position cannot be more than 200 characters long',
    }),
  company: z
    .string({
      required_error: 'Company name is required',
      invalid_type_error: 'Company name must be a string',
    })
    .min(2, { message: 'Company name must be 2 or more characters long' })
    .max(100, {
      message: 'Company name cannot be more than 100 characters long',
    }),
  jobLocation: z
    .string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string',
    })
    .min(2, { message: 'Location name must be 2 or more characters long' })
    .max(100, {
      message: 'Location name cannot be more than 200 characters long',
    }),
  jobStatus: z.enum(JOB_STATUS).default('pending'),
  jobType: z.enum(JOB_TYPE, {
    errorMap: () => ({ message: 'Please select job type' }),
  }),
});
export type TJob = z.infer<typeof jobSchema>;
export type TJobStatus = z.infer<typeof jobSchema.shape.jobStatus>;
export type TJobType = z.infer<typeof jobSchema.shape.jobType>;

/* jobs api response */
const mutationResponse = z.object({
  msg: z.string(),
});
export type TMutationResponse = z.infer<typeof mutationResponse>;

const jobAPIResponseSchema = jobSchema.extend({
  _id: z.string(),
  createdBy: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type TJobAPIResponse = z.infer<typeof jobAPIResponseSchema>;

const paginatedDataSchema = z.object({
  totalNumberOfJobs: z.number(),
  currentPageJobs: z.array(jobAPIResponseSchema),
  totalNumberOfJobsOnCurrPage: z.number(),
  resultsPerPage: z.number(),
  totalNumberOfPages: z.number(),
  currentPageNumber: z.number(),
  prevPageNumber: z.number().nullable(),
  nextPageNumber: z.number().nullable(),
});
const jobsAPIResponseSchema = z.object({
  msg: z.string(),
  paginatedData: paginatedDataSchema,
});
export type TJobsAPIResponse = z.infer<typeof jobsAPIResponseSchema>;

const statusSchema = z.object({
  pending: z.number().catch(0),
  interview: z.number().catch(0),
  declined: z.number().catch(0),
});
const monthlyApplicationsSchema = z.array(
  z.object({
    date: z.string(),
    count: z.number(),
  })
);
const statsSchema = z.object({
  msg: z.string(),
  statusStats: statusSchema,
  monthlyApplications: monthlyApplicationsSchema,
});
export type TJobsStats = z.infer<typeof statsSchema>;
