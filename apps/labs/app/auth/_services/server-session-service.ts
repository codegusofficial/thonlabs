import { cookies } from 'next/headers';
import * as jose from 'jose';
import { SessionData } from '../_actions/auth-actions';

const ServerSessionService = {
  create(data: SessionData) {
    const expires = new Date(data.tokenExpiresIn);
    cookies().set('tl_session', data.token, {
      path: '/',
      expires,
      secure: process.env.NODE_ENV === 'production',
    });

    if (data.refreshToken) {
      cookies().set('tl_refresh', data.refreshToken, {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      cookies().set('tl_keep_alive', 'true', {
        path: '/',
        expires: data.refreshTokenExpiresIn,
        secure: process.env.NODE_ENV === 'production',
      });
    }
  },

  getSession() {
    return {
      accessToken: cookies().get('tl_session')?.value,
      refreshToken: cookies().get('tl_refresh')?.value,
      keepAlive: cookies().get('tl_keep_alive')?.value,
    };
  },

  isValid() {
    const accessToken = cookies().get('tl_session');

    if (!accessToken?.value) {
      return false;
    }

    const { exp } = jose.decodeJwt(accessToken.value);
    const sessionValid = (exp as number) * 1000 > new Date().getTime();

    return sessionValid;
  },

  async validateRefreshToken() {
    const refreshToken = cookies().get('tl_refresh');

    if (!refreshToken?.value) {
      console.log('Error "validateRefreshToken": Invalid refresh token');

      return {
        statusCode: 401,
      };
    }

    const response = await fetch(
      // TODO: when create lib, make sure to call the prod domain
      `${process.env.NEXT_PUBLIC_TL_API}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'tl-env-id': process.env.NEXT_PUBLIC_TL_ENV_ID,
        } as HeadersInit & { 'tl-env-id': string },
        body: JSON.stringify({
          token: refreshToken.value,
        }),
      },
    );
    const data = await response.json();

    if (data.statusCode) {
      console.log('Error "validateRefreshToken": ', data);

      return {
        statusCode: data.statusCode,
        error: data?.error || data?.message,
      };
    }

    this.create(data.data);

    return {
      statusCode: 200,
    };
  },

  async shouldKeepAlive() {
    try {
      const isValid = this.isValid();
      const { keepAlive, refreshToken } = this.getSession();

      if (keepAlive === 'true' && isValid === false) {
        if (!refreshToken) {
          console.log('Error "shouldKeepAlive": Invalid refresh token');
          return {
            status: 'invalid_session',
          };
        }

        return {
          status: 'needs_refresh',
        };
      }

      if (!isValid) {
        console.log('Error "shouldKeepAlive": Invalid access token');
        return {
          status: 'invalid_session',
        };
      }

      return {
        status: 'valid_session',
      };
    } catch (e) {
      console.log('Error "shouldKeepAlive": ', e);
      return {
        status: 'invalid_session',
      };
    }
  },

  logout() {
    cookies().delete('tl_session');
    cookies().delete('tl_refresh');
    cookies().delete('tl_keep_alive');
  },
};

export default ServerSessionService;
