<script lang="ts">
	export let data;

	import '../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	import { PUBLIC_REDIRECT_URL, PUBLIC_CASDOOR_CLIENT_ID } from '$env/static/public';
	import MailIcon from '~icons/material-symbols/mail-outline-sharp'

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Toast />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" target="_self">
				<strong class="text-xl uppercase">Service Vault</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail" >
				{#if data.admin}
				<div class="relative inline-block">
				<a
					href="/admin"
					target="_self"
					class="btn variant-filled">
					{#if data.requestCount > 0}
					<span class="badge-icon variant-filled-error absolute -top-0 -right-0 z-10">{data.requestCount}</span>
					{/if}
					<MailIcon class="!mx-[0px]"/>
				</a>
				</div>
				{/if}
				{#if data.token}
				<a
					href="/signout"
					target="_self"
					class="btn variant-filled">
					Log Out
				</a>
				{:else}
				<a
					href={`https://auth.engehost.net/login/oauth/authorize?client_id=${PUBLIC_CASDOOR_CLIENT_ID}&response_type=code&redirect_uri=${PUBLIC_REDIRECT_URL}&scope=read&state=vault`}
					class="btn variant-filled">
					Log In
				</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

