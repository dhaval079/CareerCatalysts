// import { useSetAtom } from 'jotai';

// import { jobIdAtom } from '~/atoms/job-id';
// import { useDeleteJob } from '~/hooks/api/useJob';
// import { useReportJob } from '~/hooks/api/useJob';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '~/components/ui/alert-dialog';

// import LoadingIndicator from '../common/loading-indicator';
// import { Button } from '../ui/button';

// export default function ReportJobBtn({ id }: { id: string }) {
//   const setJobId = useSetAtom(jobIdAtom);

//   const deleteJobMutation = useDeleteJob();

//   return (
//     <AlertDialog>
//       <Button
//         asChild
//         variant="destructive"
//         className="w-full"
//         onClick={() => setJobId(id)}
//       >
//         <AlertDialogTrigger><Report></Report></AlertDialogTrigger>
//       </Button>
//       <AlertDialogContent className="grid w-[min(calc(100%_-_1rem),_400px)] justify-items-center rounded-lg">
//         <AlertDialogHeader>
//           <AlertDialogTitle className="text-center">
//             Report Job Confirmation
//           </AlertDialogTitle>
//           <AlertDialogDescription>
//             Are you sure you want to Report this job?
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter className="w-full sm:w-auto">
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={() => deleteJobMutation.mutate()}>
//             {deleteJobMutation.isLoading ? (
//               <LoadingIndicator msg="Deleting job" />
//             ) : (
//               'Yes, report'
//             )}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { useSetAtom } from 'jotai';
import { jobIdAtom } from '~/atoms/job-id';
import { useDeleteJob, useReportJob } from '~/hooks/api/useJob';
import LoadingIndicator from '../common/loading-indicator';

export default function ReportJobBtn({ id }: { id: string }) {
  const setJobId = useSetAtom(jobIdAtom);
  const deleteJobMutation = useDeleteJob();
  const reportJobMutation = useReportJob();

  const [reportCounter, setReportCounter] = useState(0);

  const handleReportClick = () => {
    setReportCounter((prevCount) => prevCount + 1);
    reportJobMutation.mutate();
  };

  return (
    <AlertDialog>
      <Button
        asChild
        variant="destructive"
        className="w-full"
        onClick={() => setJobId(id)}
      >
        <AlertDialogTrigger>Report</AlertDialogTrigger>
      </Button>
      <AlertDialogContent className="grid w-[min(calc(100%_-_1rem),_400px)] justify-items-center rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Report Job Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to Report this job?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full sm:w-auto">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReportClick}>
            {deleteJobMutation.isLoading ? (
              <LoadingIndicator msg="Deleting job" />
            ) : (
              `Yes, report (${reportCounter})`
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
