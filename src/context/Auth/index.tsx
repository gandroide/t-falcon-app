import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app, appAuth } from '../../config/firebase';
import { LoadingContext } from '../Loading';

interface ILoginData {
  email: string;
  password: string;
}

interface IAuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isAuthReady: boolean;
  displayName: string;
  userId: string | null;
}

interface IAuthContext {
  user: IAuthState;
  onLogoutHandler: () => void;
  onLoginHandler: ({ email, password }: ILoginData) => void;
}

enum AuthTypeActions {
  LOGIN = 'LOGIN',
  AUTH_CHANGED = 'AUTH_CHANGED',
  LOGOUT = 'LOGOUT'
}

interface LoginAction {
  type: AuthTypeActions.LOGIN;
  payload: {
    displayName: IAuthState['displayName'];
    userId: IAuthState['userId'];
    isAdmin: IAuthState['isAdmin'];
  };
}

interface LogoutAction {
  type: AuthTypeActions.LOGOUT;
  payload: null;
}

interface AuthChangeAction {
  type: AuthTypeActions.AUTH_CHANGED;
  payload: {
    displayName: IAuthState['displayName'];
    userId: IAuthState['userId'];
    isAdmin: IAuthState['isAdmin'];
  } | null;
}

type AuthActions = LoginAction | AuthChangeAction | LogoutAction;

const initialState: IAuthState = {
  isLoggedIn: false,
  isAdmin: true,
  isAuthReady: false,
  displayName: '',
  userId: null
};

const defaultAuthContext: IAuthContext = {
  user: initialState,
  onLogoutHandler: () => {},
  onLoginHandler: () => {}
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

const authReducer = (
  state: IAuthState,
  { type, payload }: AuthActions
): IAuthState => {
  switch (type) {
    case AuthTypeActions.AUTH_CHANGED:
      if (!payload) {
        return {
          ...initialState,
          isAuthReady: true
        };
      }

      return {
        ...state,
        isLoggedIn: true,
        isAdmin: payload['isAdmin'],
        displayName: payload['displayName'],
        userId: payload['userId'],
        isAuthReady: true
      };
    case AuthTypeActions.LOGOUT:
      return { ...initialState, isAuthReady: true };
    case AuthTypeActions.LOGIN:
      return {
        ...state,
        displayName: payload.displayName,
        userId: payload.userId,
        isLoggedIn: true,
        isAdmin: payload.isAdmin,
        isAuthReady: true
      };
    default:
      return state;
  }
};

export const AuthProvider: FC = ({ children }) => {
  const navigate = useNavigate();
  const { onLoadingHandler } = useContext(LoadingContext);
  const [userState, dispatch] = useReducer(authReducer, initialState);

  const onLogoutHandler = async () => {
    await appAuth.signOut();

    dispatch({ type: AuthTypeActions.LOGOUT, payload: null });
  };

  const onLoginHandler = async ({ email, password }: ILoginData) => {
    onLoadingHandler(true);
    appAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        if (!res.user) {
          throw new Error('Impossivel fazer login');
        }

        const userData = (
          await app.collection('users').doc(res.user.uid).get()
        ).data();

        if (!userData?.isActive) {
          onLoadingHandler(false);
          toast.error('A conta inserida não existe');
          appAuth.signOut();
          return;
        }

        dispatch({
          type: AuthTypeActions.LOGIN,
          payload: {
            displayName: res.user.displayName!,
            userId: res.user.uid,
            isAdmin: userData?.admistrador ?? false
          }
        });

        if (userData?.admistrador) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/home', { replace: true });
        }

        onLoadingHandler(false);
      })
      .catch((e) => {
        onLoadingHandler(false);
        toast.error('Credenciais inválidas', { autoClose: 15000 });
      });
  };

  useEffect(() => {
    onLoadingHandler(true);
    const unsub = appAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = (
          await app.collection('users').doc(user.uid).get()
        ).data();

        if (!userData?.isActive) {
          debugger;
          onLoadingHandler(false);
          toast.error('A sua sessão expirou.');

          dispatch({
            type: AuthTypeActions.AUTH_CHANGED,
            payload: null
          });
          return;
        }

        dispatch({
          type: AuthTypeActions.AUTH_CHANGED,
          payload: {
            displayName: user.displayName!,
            userId: user.uid,
            isAdmin: userData?.admistrador
          }
        });
      } else {
        dispatch({
          type: AuthTypeActions.AUTH_CHANGED,
          payload: null
        });
      }
      onLoadingHandler(false);
      unsub();
    });
  }, [onLoadingHandler]);

  return (
    <AuthContext.Provider
      value={{ user: userState, onLogoutHandler, onLoginHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
