import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  cookies.delete('token', {path: "/"});
 
  redirect(307, '/');
}
