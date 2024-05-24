<script lang="ts">
  export let data;

  import AdminCard from '../../components/AdminCard.svelte';

  import RequestCard from '../../components/RequestCard.svelte';
</script>

<div class="container h-full mx-auto flex justify-around items-center">
  <div class="flex flex-wrap flex-row justify-around items-center">
    {#if data.services.length === 0}
    <div class="card p-4">There are currently no services available.</div>
    {:else}
		{#each data.services as {image_path, service_name, password, report_count}}
		<AdminCard
			service={service_name}
      password={password}
			image={image_path}
			token={data.token}
      reportCount={report_count} />
		{/each}
    {/if}
  </div>
	<div class="text-center flex flex-wrap flex-col justify-around items-center">
    {#if data.requests.length === 0}
    <div class="card p-4">There are currently no requests to process.</div>
    {:else}
    {#each data.requests as {id, type, service_name, email}}
      <RequestCard bind:requests={data.requests}  id={id} type={type} service_name={service_name} email={email} token={data.token}/>
    {/each}
    {/if}
  </div>
</div>
