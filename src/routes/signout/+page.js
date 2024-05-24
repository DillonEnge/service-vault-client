import { invalidate } from '$app/navigation';

/** @type {import('./$types').PageLoad} */
export async function load({}) {
  invalidate((url) => url.pathname === '/');
}
