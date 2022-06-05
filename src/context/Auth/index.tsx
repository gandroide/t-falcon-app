import { createContext, FC, useEffect, useReducer } from 'react';
import { appAuth } from '../../config/firebase';

interface IAuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isAuthReady: boolean;
  displayName: string;
}

interface IAuthContext {
  user: IAuthState;
  onLogoutHandler: () => void;
}

enum AuthTypeActions {
  LOGIN = 'LOGIN',
  AUTH_CHANGED = 'AUTH_CHANGED',
  LOGOUT = 'LOGOUT'
}

interface LoginAction {
  type: AuthTypeActions.LOGIN;
  payload: IAuthState['displayName'];
}

interface LogoutAction {
  type: AuthTypeActions.LOGOUT;
  payload: null;
}

interface AuthChangeAction {
  type: AuthTypeActions.AUTH_CHANGED;
  payload: IAuthState['displayName'] | null;
}

type AuthActions = LoginAction | AuthChangeAction | LogoutAction;

const initialState: IAuthState = {
  isLoggedIn: false,
  isAdmin: false,
  isAuthReady: false,
  displayName: ''
};

const defaultAuthContext: IAuthContext = {
  user: initialState,
  onLogoutHandler: () => {}
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
        isAdmin: false,
        displayName: payload,
        isAuthReady: true
      };
    case AuthTypeActions.LOGOUT:
      return { ...initialState, isAuthReady: true };
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

  useEffect(() => {
    const unsub = appAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: AuthTypeActions.AUTH_CHANGED,
          payload: user.displayName
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
    <AuthContext.Provider value={{ user: userState, onLogoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
