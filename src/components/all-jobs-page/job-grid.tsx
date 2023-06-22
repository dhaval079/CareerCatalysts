import { BriefcaseIcon, CalendarDaysIcon, MapPinIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import AddJobForm from '../common/add-job-form';
import { Button } from '../ui/button';
import { statusColors } from './job-list';

export default function JobGrid({
  status,
}: {
  status: keyof typeof statusColors;
}) {
  return (
    <li className="space-y-3 rounded-lg border bg-slate-500/10 p-3 text-xs md:p-6 md:text-base">
      <div className="space-y-3 border-b-4 border-dotted border-accent pb-3">
        <p className="rounded-md bg-primary py-1 text-center text-5xl font-bold text-primary-foreground">
          G
        </p>
        <div>
          <p className="text-sm font-medium text-foreground md:text-lg">
            Frontend Dev
          </p>
          <p>Meta</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <MapPinIcon size={15} />
          <span className="truncate">Location</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarDaysIcon size={15} />
          <span className="truncate">10th June 2010</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-1">
            <BriefcaseIcon size={15} />
            <span className="truncate">Type</span>
          </div>
          <span
            className={twMerge(
              'rounded-md px-2.5 py-0.5 text-xs font-medium',
              statusColors[status]
            )}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 text-[rgb(248,_250,_252)] dark:bg-yellow-700 [&:not(:disabled)]:hover:bg-yellow-500/90 [&:not(:disabled)]:dark:hover:bg-yellow-700/90">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="inset-y-6 left-1/2 w-[280px] -translate-x-1/2 overflow-y-auto md:bottom-auto md:top-1/2 md:w-full md:-translate-y-1/2">
            <DialogHeader>
              <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Edit Job
              </DialogTitle>
              <DialogDescription>Make changes to job.</DialogDescription>
            </DialogHeader>
            <AddJobForm isModalForm />
          </DialogContent>
        </Dialog>
        <Button variant="destructive">Delete</Button>
      </div>
    </li>
  );
}
