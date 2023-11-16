import format from 'date-fns/format';
import { BriefcaseIcon, CalendarDaysIcon, MapPinIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { TJobAPI } from '~/schemas/job';

import DeleteJobBtn from './delete-job-btn';
import EditJobBtn from './edit-job-btn';
import ReportJobBtn from './report-job-btn';

const jobStatusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500 dark:bg-yellow-500/10',
  interview: 'bg-blue-500/20 text-blue-500 dark:bg-blue-500/10',
  declined: 'bg-red-500/20 text-red-500 dark:bg-red-500/10',
};

export default function JobGrid({ job }: { job: TJobAPI }) {
  const date = new Date(job.createdAt);
  const formattedDate = format(date, 'do MMMM, yyyy');

  return (
    <li className="space-y-3 rounded-lg border bg-slate-500/10 p-3 text-xs md:p-6 md:text-base">
      <div className="space-y-3 border-b-4 border-dotted border-accent pb-3">
        <p
          className="rounded-md bg-primary/50 py-1 text-center text-5xl font-bold text-primary-foreground"
          style={{
            fontSize: '2.3rem',
            boxShadow: `inset 3px 3px 6px rgba(255, 255, 255, 0.1),
            inset -6px -6px 12px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(0, 0, 0, 0.3)`,
            backdropFilter: 'blur(12px)',
          }}
        >
          {job.company}
        </p>  
        <div>
          <p className="truncate text-sm font-medium text-foreground md:text-lg">
            {job.jobPosition}
          </p>
        </div>
      </div>


      <div className="grid gap-3 md:grid-cols-2">
        <ReportJobBtn id={job._id} />
      </div>
    </li>
  );
}