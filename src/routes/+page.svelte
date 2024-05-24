<script lang="ts">
	export let data;

	import Card from '../components/Card.svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="text-center flex flex-wrap flex-row justify-around items-center my-8 ">
		{#if data.services.length > 0}
			{#each data.services as {image_path, service_name}}
			<Card
				service={service_name}
				image={image_path}
				token={data.token} />
			{/each}
		{:else}
			<div class="card p-4 leading-9 text-lg">You must be authenticated to view services.<br>Please log in.</div>
		{/if}
	</div>
</div>
