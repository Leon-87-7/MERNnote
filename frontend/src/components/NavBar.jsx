import { Link } from 'react-router';
import { PlusIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/session';
import { useNavigate } from 'react-router';

const NavBar = () => {
  const session = useSessionContext();
  const navigate = useNavigate();

  const handleSingOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold text-primary font-mono tracking-tight"
          >
            MERN.note
          </Link>

          <div className="flex items-center gap-4">
            {session.loading ? (
              <div className="skeleton h-8 w-20"></div>
            ) : session.doesSessionExist ? (
              <>
                <Link
                  to="/create"
                  className="btn btn-primary"
                >
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <UserIcon className="size-5" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="text-error"
                      >
                        <LogOutIcon className="size-4" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="btn btn-outline"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
