/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const tokenCookie = cookies.get("token")

  return {
  	token: tokenCookie,
  };

}
