<script lang="ts">
  export let image, service, token;

  import { requestCode, report, requestAccess} from '../scripts/requests'
  import { unauthenticatedToast } from '../scripts/toasts'
  import { type ToastSettings, type ToastStore } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
  import { PUBLIC_API_URL } from '$env/static/public'

	const toastStore = getToastStore();

  let hidden = true;
  let reportLoading = false;
  let requestCodeLoading = false;
  let revealLoading = false;
  let password = null;

	const unauthorizedToast: ToastSettings = {
		message: 'Forbidden. ',
		background: 'variant-filled-error',
		action: {
			label: 'Request Access',
			response: () => requestAccess(token, toastStore)
		},
		autohide: false
	};

  const onRevealClick = () => {
    if (!password) {
      revealLoading = true;
      getPassword(token, toastStore, unauthorizedToast).then(() => {
        revealLoading = false;
      });
    }

    hidden = false;
  }

  const onReportClick = () => {
    reportLoading = true;
    report(service, token, toastStore).then(() => {
      reportLoading = false;
  });
  }

  const requestCodeWrapper = () => {
    requestCodeLoading = true;
    requestCode(service, token, toastStore).then(() => {
      requestCodeLoading = false;
    })
  }
  
  async function getPassword(
    token: string,
    toastStore: ToastStore,
    unauthorizedToast: ToastSettings
  ) {
  	if (!token) {
  		toastStore.trigger(unauthenticatedToast);
  		return;
  	}

  	const res = await fetch(`${PUBLIC_API_URL}/service?name=${service}`, {
  		method: 'GET',
  		headers: {
  			Authorization: token,
  		}
  	})

  	if (res.status === 403) {
  		toastStore.trigger(unauthorizedToast);
  		return
  	}

  	let jsonRes = await res.json();

  	password = jsonRes.password;
  }
</script>


<div class="card card-hover w-80 h-96 flex flex-col content-around mx-4 my-4">
  <header class="card-header flex-1">
  	<img class="object-cover w-full h-36" alt="logo" src={image} />
  </header>
  {#if password && !hidden}
  <section class="flex-1 flex flex-col justify-center items-center px-4">
    <div class="input-group input-group-divider grid-cols-[auto_auto]">
    	<input readonly class="w-2/4" type={password ? "text" : "password"} value={password ? password : "password"}/>
    	<button class="variant-filled" on:click={() => hidden=true}>{password ? "Hide" : "Reveal"}</button>
    </div>
  </section>
  <section class="flex flex-row justify-around items-center">
    <hr class="w-full mx-4"><span class="text-nowrap w-full">More Options</span><hr class="w-full mx-4">
  </section>
  <footer class="flex-1 flex flex-row justify-around items-center">
    	<button
        class={`${requestCodeLoading ? "variant-soft" : "variant-filled"} basis-9/12 p-2 mx-4`}
        disabled={requestCodeLoading}
        on:click={requestCodeWrapper}>
        Request Code
      </button>
    	<button
        class={`${reportLoading ? "variant-soft-error" : "variant-filled-error"} basis-9/12 p-2 mx-4`}
        disabled={reportLoading}
        on:click={onReportClick}>
        Report
      </button>
  </footer>
  {:else}
  <footer class="card-footer flex-1 flex items-center">
    <div class="input-group input-group-divider grid-cols-[auto_auto]">
    	<input readonly class="w-2/4" type={password && !hidden ? "text" : "password"} value={password ? password : "password"}/>
    	<button
        class={revealLoading ? "variant-soft" : "variant-filled"}
        disabled={revealLoading}
        on:click={onRevealClick}>Reveal</button>
    </div>
  </footer>
  {/if}
</div>
