import { createContext, FC, useEffect, useReducer } from 'react';
import { appAuth } from '../../config/firebase';

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
        // isAdmin: false,
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
        isLoggedIn: true
      };
    default:
      return state;
  }
};

export const AuthProvider: FC = ({ children }) => {
  const [userState, dispatch] = useReducer(authReducer, initialState);

  const onLogoutHandler = async () => {
    await appAuth.signOut();

    dispatch({ type: AuthTypeActions.LOGOUT, payload: null });
  };

  const onLoginHandler = async ({ email, password }: ILoginData) => {
    const res = await appAuth.signInWithEmailAndPassword(email, password);

    if (!res.user) {
      throw new Error('Impossivel fazer login');
    }

    dispatch({
      type: AuthTypeActions.LOGIN,
      payload: { displayName: res.user.displayName!, userId: res.user.uid }
    });
  };

  useEffect(() => {
    const unsub = appAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: AuthTypeActions.AUTH_CHANGED,
          payload: {
            displayName: user.displayName!,
            userId: user.uid
          }
        });
      } else {
        dispatch({
          type: AuthTypeActions.AUTH_CHANGED,
          payload: null
        });
      }
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userState, onLogoutHandler, onLoginHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
