import { Link } from 'react-router';
import { ImportContactsRounded } from '@mui/icons-material';

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <ImportContactsRounded className="size-14 text-primary" />
      </div>
      <h3 className="text-2xl font-bold capitalize">
        No notes in here
      </h3>
      <p className="text-base-content/70 capitalize">
        ready to organize your thoughts? <br /> Create first note to
        get going{' '}
      </p>
      <Link
        to="/create"
        className="btn btn-outline btn-primary"
      >
        Create new note
      </Link>
    </div>
  );
};

export default NotesNotFound;
