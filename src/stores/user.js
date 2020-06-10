import { writable } from 'svelte/store';

const user = writable({ usernameL: null, jwt: null });

export default user;
