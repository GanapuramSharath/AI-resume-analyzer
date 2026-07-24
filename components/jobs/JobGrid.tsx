import JobCard from "./JobCard";

export default function JobGrid({ jobs }: { jobs: any[] }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          title={job.title}
          match={job.match}
          reason={job.reason}
        />
      ))}
    </div>
  );
}
