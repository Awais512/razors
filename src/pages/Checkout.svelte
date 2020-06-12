<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import cart, { cartTotal } from "../stores/cart";
  import submitOrder from "../strapi/submitOrders";

  let name = "";
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;
  $: isEmpty = !name;

  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    }
    if ($cartTotal > 0) {
      stripe = Stripe("pk_test_YyrG6JgCeyztWadWEmTqz7Nt");
      elements = stripe.elements();
      card = elements.create("card");
      card.mount(cardElement);
      card.addEventListener("change", function(event) {
        if (event.error) {
          cardErrors.textContent = event.error.message;
        } else {
          cardErrors.textContent = "";
        }
      });
    }
  });

  async function handleSubmit() {
    let response = await stripe
      .createToken(card)
      .catch(error => console.log(error));
    const { token } = response;
    if (token) {
      const { id } = token;
      let orders = await submitOrder({
        name,
        total: $cartTotal,
        items: $cart,
        stripeTokenId: id,
        userToken: $user.jwt
      });
      console.log(orders);
    } else {
    }
  }
</script>

{#if $cartTotal > 0}
  <section class="form">
    <h2 class="section-title">checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>order total: ${$cartTotal}</h3>
      <div class="form-control">
        <label for="name">Your name</label>
        <input type="text" id="name" bind:value={name} />
      </div>

      <div class="stripe-input">
        <label for="card-element">Credit or debit card</label>
        <p class="stripe-info">
          Test using this credit card:
          <span>4242 4242 4242 4242</span>
          <br />
          enter any 5 digits for zip code
          <br />
          enter any 3 digits for cvc
        </p>

        <div id="card-element" bind:this={cardElement} />
        <div id="card-errors" bind:this={cardErrors} role="alert" />
      </div>
      {#if isEmpty}
        <p class="form-empty">Please fill out name field</p>
      {/if}
      <button
        type="submit"
        class="btn btn-block btn-primary"
        disabled={isEmpty}
        class:disabled={isEmpty}>
        submit
      </button>
    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>Your cart is empty</h2>
    <a href="/products" use:link class="btn btn-primary">fill it</a>
  </div>
{/if}
