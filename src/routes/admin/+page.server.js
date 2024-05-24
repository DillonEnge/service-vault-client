import { PUBLIC_API_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import { sendCode } from '../../scripts/requests';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, fetch }) {
  const tokenCookie = cookies.get("token");

	let admin = false;

	if (tokenCookie) {
	  const res = await fetch(`${PUBLIC_API_URL}/admin`, {
			method: 'GET',
			headers: {
				"Authorization": tokenCookie
			}
		})

		console.log(res)

	  admin = res.status === 200
	}

	if (!admin) {
		redirect(307, "/")
	}

	let requests = []

	if (tokenCookie) {
	  const res = await fetch(`${PUBLIC_API_URL}/requests`, {
			method: 'GET',
			headers: {
				"Authorization": tokenCookie
			}
		})

		const data = await res.json()

		requests = data
	}

  let services = [];

	if (tokenCookie) {
	  const res = await fetch(`${PUBLIC_API_URL}/services`, {
			method: 'GET',
			headers: {
				"Authorization": tokenCookie
			}
		});

		const data = await res.json();

		services = data;
	}

	return {
		token: tokenCookie,
		requests,
		services
	};
}
