import { PUBLIC_API_URL } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const tokenCookie = cookies.get("token")

  let services = [];

	if (tokenCookie) {
	  const res = await fetch(`${PUBLIC_API_URL}/services`, {
			method: 'GET',
			headers: {
				"Authorization": tokenCookie
			}
		});

		const data = await res.json();

    delete data["password"];

		services = data;
	}
  
  return {
  	token: tokenCookie,
    services
  };
}
