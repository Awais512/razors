<script>
  let email = "";
  let password = "";
  let username = "default username";
  let isMember = true;
  $: isEmpty = !email || !password || !username;

  function toggleMember() {}

  async function handleSubmit() {}
</script>

<section class="form">
  <h2 class="section-title">
    {#if isMember}Sign in{:else}Register{/if}
  </h2>
  <form class="login-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-control">
      <label for="email">email</label>
      <input type="email" id="email" bind:value={email} />
    </div>

    <div class="form-control">
      <label for="password">password</label>
      <input type="password" id="password" bind:value={password} />
    </div>

    {#if !isMember}
      <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="username" bind:value={username} />
      </div>
    {/if}

    {#if isEmpty}
      <p class="form-empty">Please fill out all fields</p>
    {/if}

    <button
      type="submit"
      class="btn btn-block"
      disabled={isEmpty}
      class:disabled={isEmpty}>
      Submit
    </button>
    {#if isMember}
      <p class="register-link">
        need to register?
        <button type="button" on:click={toggleMember}>Click here</button>
      </p>
    {:else}
      <p class="register-link">
        already a member?
        <button type="button" on:click={toggleMember}>Login here</button>
      </p>
    {/if}
  </form>
</section>
