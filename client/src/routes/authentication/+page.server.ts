import { CookiesName } from '$lib/shared/types/cookies';
import { fail, type Cookies, type SubmitFunction, redirect } from '@sveltejs/kit';
import axios from 'axios';

export { authenticationGuard as load } from '$lib/widgets/authentication';

export const actions = {
	default: async ({ cookies, request }: {cookies: Cookies, request: any}) => {
		const data = await request.formData();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {username: data.get('username'), password: 'changeme'});
            cookies.set(CookiesName.AUTH_TOKEN, response.data.access_token, { path: '/' });
            return true;
        } catch (error: any) {
			return fail(422, {
				description: data.get('username'),
				error: 'Unknown user'
			});
		}
	}
};