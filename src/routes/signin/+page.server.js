import { redirect } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies, fetch }) {
  const code = url.searchParams.get("code");

  const state = url.searchParams.get("state")

  if (code && state) {
    const res = await fetch(`${PUBLIC_API_URL}/signin?code=${code}&state=${state}`, {
			method: 'GET',
		})

		const data = await res.json()

    cookies.set('token', `${data["token_type"]} ${data["access_token"]}`, {path: "/"})

    redirect(302, '/');
  }
}
