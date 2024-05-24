<script lang="ts">
  export let image, password, service, token, reportCount;

  import { requestCode, updatePassword, clearReports } from '../scripts/requests'
	import { getToastStore } from '@skeletonlabs/skeleton';
  import { PUBLIC_API_URL } from '$env/static/public'

	const toastStore = getToastStore();

  let clearReportsLoading = false;
  let requestCodeLoading = false;
  let updateLoading = false;
  let localPassword = password;

  const onClearReportsClick = () => {
    clearReportsLoading = true;
    clearReports(service, token, toastStore).then(() => {
      clearReportsLoading = false;
    });
  }

  const requestCodeWrapper = () => {
    requestCodeLoading = true;
    requestCode(service, token, toastStore).then(() => {
      requestCodeLoading = false;
    });
  }

  const onUpdateClick = () => {
    updateLoading = true;
    updatePassword(service, localPassword, token, toastStore).finally(() => {
      updateLoading = false;
    })
  }

  const getCardBgClass = () => {
    if (reportCount === 1) {
      return "!bg-warning-800";
    }
  
    if (reportCount > 1) {
      return "!bg-error-800";
    }

    return "!bg-surface-800";
  }
</script>


<div class={`card card-hover ${getCardBgClass()} w-80 h-96 flex flex-col content-around mx-4 my-4`}>
  <header class="card-header flex-1">
  	<img class="object-cover w-full h-36" alt="logo" src={image} />
  </header>
  <section class="flex-1 flex flex-col justify-center items-center px-4">
    <div class="input-group input-group-divider grid-cols-[auto_auto]">
    	<input bind:value={localPassword} readonly={updateLoading} class="w-2/4" type="text"/>
    	<button
        disabled={updateLoading}
        class={`variant-${updateLoading ? "ghost" : "filled"}`}
        on:click={onUpdateClick}>
        Update
      </button>
    </div>
  </section>
  <section class="flex flex-row justify-around items-center">
    <hr class="w-full mx-4"><span class="text-nowrap w-full">More Options</span><hr class="w-full mx-4">
  </section>
  <footer class="flex-1 flex flex-row justify-around items-center">
    	<button
        class={`${clearReportsLoading ? "variant-soft-error" : "variant-filled-error"} basis-9/12 p-2 mx-4`}
        disabled={clearReportsLoading}
        on:click={onClearReportsClick}>
        Clear Reports
      </button>
  </footer>
</div>
