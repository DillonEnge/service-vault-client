export let huluPassword = "";
export let maxPassword = "";

import { type ToastStore } from '@skeletonlabs/skeleton';
import {
	sendCodeSuccessToast,
	grantAccessSuccessToast,
  requestSuccessToast,
	reportSuccessToast,
	requestCodeSuccessToast,
  serverErrorToast,
	updatePasswordSuccessToast
} from './toasts';
import { PUBLIC_API_URL } from '$env/static/public'

export async function deleteRequest(id: string, token: string, toastStore: ToastStore) {
	const res = await fetch(`${PUBLIC_API_URL}/request?id=${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		}
	})

	if (res.status === 500) {
		toastStore.trigger(serverErrorToast);
	}
}

export async function updatePassword(service: string, password: string, token: string, toastStore: ToastStore) {
	const res = await fetch(`${PUBLIC_API_URL}/service/password`, {
		method: 'PATCH',
		body: JSON.stringify({
			service_name: service,
			password: password
		}),
		headers: {
			Authorization: token,
		}
	})

	if (res.status === 200) {
		toastStore.trigger(updatePasswordSuccessToast);
	}
	else if (res.status === 500) {
		toastStore.trigger(serverErrorToast);
	}
}

export async function requestAccess(token: string, toastStore: ToastStore) {
	const res = await fetch(`${PUBLIC_API_URL}/request/access`, {
		method: 'POST',
		headers: {
			Authorization: token,
		}
	})

	if (res.status === 200) {
		toastStore.trigger(requestSuccessToast);
	}
	else if (res.status === 500) {
		toastStore.trigger(serverErrorToast);
	}
}

export async function grantAccess(email: string, token: string, toastStore: ToastStore) {
	const res = await fetch(`${PUBLIC_API_URL}/access?email=${email}&notify=true`, {
		method: 'POST',
		headers: {
			Authorization: token,
		}
	})

	if (res.status === 200) {
		toastStore.trigger(grantAccessSuccessToast);
	}
	else if (res.status === 500) {
		toastStore.trigger(serverErrorToast);
	}
}

export async function report(service: string, token: string, toastStore: ToastStore) {
	const res = await fetch(
`${PUBLIC_API_URL}/report`, {
		method: 'POST',
		body: JSON.stringify({
			service_name: service
		}),
		headers: {
			Authorization: token,
		}
	})

	if (res.status === 200) {
		toastStore.trigger(reportSuccessToast);
	}
	else if (res.status === 500) {
		toastStore.trigger(serverErrorToast);
	}
}

export async function clearReports(service: string, token: string, toastStore: ToastStore) {
	const res = await fetch(
`${PUBLIC_API_URL}/report?service=${service}`, {
		method: 'DELETE',
		headers: {
			Authorization: token,
		}
	})

	if (res.status === 200) {
		toastStore.trigger(reportSuccessToast);
	}
	else if (res.status === 500) {
		toastStore.trigger(serverErrorToast);
	}
}

export async function requestCode(service: string, token: string, toastStore: ToastStore) {
	const res = await fetch(
`${PUBLIC_API_URL}/request/code`, {
		method: 'POST',
		body: JSON.stringify({
			service_name: service
		}),
		headers: {
			Authorization: token,
		}
	})

	if (res.status === 200) {
		toastStore.trigger(requestCodeSuccessToast);
	}
	else if (res.status === 500) {
		toastStore.trigger(serverErrorToast);
	}
}

export async function sendCode(
	email: string,
	service: string,
	code: string,
	token: string,
	toastStore: ToastStore
) {
	const res = await fetch(
`${PUBLIC_API_URL}/code`, {
		method: 'POST',
		body: JSON.stringify({
			service_name: service,
			email: email,
			code: code
		}),
		headers: {
			Authorization: token,
		}
	})
	
	if (res.status === 200) {
		toastStore.trigger(sendCodeSuccessToast);
	}
	else if (res.status === 500) {
		toastStore.trigger(serverErrorToast);
	}
}
