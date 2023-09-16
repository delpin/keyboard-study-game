import type { User } from '$lib/entities/authentication';
import { CookiesName } from '$lib/shared/types/cookies';
import { redirect } from '@sveltejs/kit';
import type {Cookies} from '@sveltejs/kit';
import jwtDecode from 'jwt-decode';

export function load({ cookies }: {cookies: Cookies}) {
	const authTokenJwt = cookies.get(CookiesName.AUTH_TOKEN);

	if(!authTokenJwt) {
		throw redirect(307, '/authentication');
	}

	const user: User = jwtDecode(authTokenJwt);

	return {
		currentUser: {
            username: user.username,
			permissions: user.permissions
        } as User
	};
}
