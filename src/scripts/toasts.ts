import type { ToastSettings } from '@skeletonlabs/skeleton';

export const grantAccessSuccessToast: ToastSettings = {
	message: 'Successfully granted access.',
	background: 'variant-filled-success'
};

export const updatePasswordSuccessToast: ToastSettings = {
	message: "Successfully updated password.",
	background: 'variant-filled-success'
}

export const clearReportsSuccessToast: ToastSettings = {
	message: "Successfully cleared reports.",
	background: 'variant-filled-success'
}

export const denyAccessSuccessToast: ToastSettings = {
	message: 'Successfully denied access.',
	background: 'variant-filled-success'
}

export const sendCodeSuccessToast: ToastSettings = {
	message: 'Successfully granted code.',
	background: 'variant-filled-success'
}

export const unauthenticatedToast: ToastSettings = {
	message: 'You are unauthenticated. Please login and try again.',
	background: 'variant-filled-error'
};

export const requestSuccessToast: ToastSettings = {
	message: 'Successfully requested access. Please allow for 24 hours for your request to be processed.',
	background: 'variant-filled-success'
};

export const reportSuccessToast: ToastSettings = {
	message: 'Successfully reported password as incorrect. We will update that as soon as we can.',
	background: 'variant-filled-success'
};

export const requestCodeSuccessToast: ToastSettings = {
	message: 'Successfully requested 2FA code. Please monitor your email for a response.',
	background: 'variant-filled-success'
};

export const serverErrorToast: ToastSettings = {
	message: 'Internal server error. Please wait then try again.',
	background: 'variant-filled-error'
};
