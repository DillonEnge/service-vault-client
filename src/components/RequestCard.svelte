<script lang="ts">
  export let id, requests, type, email, service_name, token;

  import { deleteRequest, grantAccess, sendCode } from '../scripts/requests';

	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

  let allowLoading = false;
  let sendLoading = false;
  let denyLoading = false;
  let code = "";

  const grantAccessWrapper = () => {
    allowLoading = true;    
    grantAccess(email, token, toastStore).finally(() => {
      deleteRequestWrapper();
      allowLoading = false;
    });
  }

  const denyAccessWrapper = () => {
    denyLoading = true;
    deleteRequest(id, token, toastStore).finally(() => {
      denyLoading = false;
      requests = requests.filter((item) => item.id !== id);
    });
  }

  const sendCodeWrapper = () => {
    sendLoading = true;
    sendCode(email, service_name, code, token, toastStore).finally(() => {
      deleteRequestWrapper();
      sendLoading = false;
    });
  }

  const deleteRequestWrapper = () => {
    deleteRequest(id, token, toastStore);
    requests = requests.filter((item) => item.id !== id);
  }
</script>

<div class="card flex flex-row w-full justify-between items-center my-4">
  <div class="flex flex-col">
    <header class="card-header text-lg">{type.charAt(0).toUpperCase() + type.slice(1)}</header>
  	<section class="p-4">{email}</section>
    {#if service_name}
    <section class="card-footer">{service_name}</section>
    {/if}
  </div>
  {#if type === "code"}
	<footer class="card-footer p-4">
    <div class="input-group input-group-divider grid-cols-[auto_auto] h-4/6">
    <input disabled={sendLoading} type="text" placeholder="enter code..." bind:value={code}/>
    <button
      disabled={sendLoading}
      on:click={sendCodeWrapper}
      class={`btn variant-${sendLoading ? "ghost" : "filled"}`}
    >
      Send
    </button>
    </div>
  </footer>
  {:else if type === "access"}
	<footer class="card-footer flex flex-row justify-around align-center p-4">
    <button
      disabled={allowLoading}
      on:click={grantAccessWrapper}
      class={`btn variant-${allowLoading ? "ghost" : "filled"}-success`}
    >
      Allow
    </button>
    <button
      disabled={denyLoading}
      on:click={denyAccessWrapper}
      class={`btn variant-${denyLoading ? "ghost" : "filled"}-error`}
    >
      Deny
    </button>
  </footer>
  {/if}
</div>
