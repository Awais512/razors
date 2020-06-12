<script>
  import user from "../stores/user";
  import { logoutUser } from "../stores/user";
  import { link } from "svelte-routing";
  //Logout functionality
  import globalStore from "../stores/globalStore";
</script>

{#if $user.jwt}
  <a
    href="/"
    use:link
    class="logout-btn"
    on:click={() => {
      logoutUser();
      globalStore.toggleItem('sidebar', false);
    }}>
    logout
  </a>
{:else}
  <a
    href="/login"
    use:link
    on:click={() => {
      globalStore.toggleItem('sidebar', false);
    }}>
    login
  </a>
{/if}
