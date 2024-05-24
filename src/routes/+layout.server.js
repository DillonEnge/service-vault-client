import { PUBLIC_API_URL } from '$env/static/public';

/** @type {import('./$types').LayoutServerLoad} */
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

	let requestCount = 0;

	if (admin && tokenCookie) {
	  const res = await fetch(`${PUBLIC_API_URL}/requests`, {
			method: 'GET',
			headers: {
				"Authorization": tokenCookie
			}
		})

		if (res.status === 200) {
			const data = await res.json()

			console.log(data)

			requestCount = data.length
		}
	}

	return {
		token: tokenCookie,
		admin,
		requestCount
	};
}
