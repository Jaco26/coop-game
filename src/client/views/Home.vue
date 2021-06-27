<template>
  <div class="home">
    <input type="text" v-model="username" />
    <button @click="onConnect">Connect</button>

    <div class="users">
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { socket } from "@/client/socket";
import { User } from "@/shared/types";

type Data = {
  users: User[];
  username: string;
  usernameAlreadySelected: boolean;
};

export default defineComponent({
  name: "Home",
  components: {},
  mounted() {
    const initReactiveProperties = (user: User) => {
      user.self = false;
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });

    socket.on("users", (users: User[]) => {
      this.users = users
        .map((user) => {
          user.self = user.userId === socket.id;
          initReactiveProperties(user);
          return user;
        })
        .sort((a, b) =>
          a.self
            ? -1
            : b.self
            ? 1
            : a.username.charCodeAt(0) - b.username.charCodeAt(0)
        );
    });

    socket.on("user connected", (user: User) => {
      initReactiveProperties(user);
      this.users.push(user);
    });
  },
  data(): Data {
    return {
      users: [],
      username: "",
      usernameAlreadySelected: false,
    };
  },
  methods: {
    onConnect() {
      this.usernameAlreadySelected = true;
      socket.auth = { username: this.username };
      socket.connect();
    },
  },
  unmounted() {
    socket.off("connect_error");
  },
});
</script>
