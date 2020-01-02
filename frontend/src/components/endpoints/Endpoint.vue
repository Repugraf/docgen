<template>
  <div class="endpoint" :class="data.method.toLowerCase()">
    <div class="method">
      <span>{{data.method}}</span>
    </div>
    <div class="url">
      <span>{{data.url}}</span>
    </div>
    <router-link class="edit" :to="`/endpoint/${data._id}`">
      <div class="icn edit">
        <Edit />
      </div>
    </router-link>
    <div class="icn cross" @click="deleteEndpoint(data._id)">
      <Cross color="red" />
    </div>
  </div>
</template>

<script>
import Cross from "../dynamic-icons/Cross";
import Edit from "../dynamic-icons/Edit";
export default {
  props: ["data"],
  components: {
    Cross,
    Edit
  },
  methods: {
    async deleteEndpoint(id) {
      if (!id) return;
      await this.$store.dispatch("endpoints/deleteEndpoint", id);
      await this.$store.dispatch("endpoints/getEndpoints");
    }
  }
};
</script>

<style lang="scss" scoped>
.endpoint {
  position: relative;
  width: 100%;
  height: 2.5rem;
  border: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0.625rem 0;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.19);
  .method {
    height: 100%;
    width: 4.7rem;
    position: relative;
    border-right: 1px solid black;
    span {
      color: white;
      font-display: sans-serif;
      font-weight: 700;
      font-size: 0.875rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .url {
    margin-left: 0.5rem;
  }
  .icn {
    width: 1rem;
    height: 1rem;
    padding: 0.7rem;
    cursor: pointer;

    &:hover {
      filter: brightness(80%);
    }
    &:active {
      filter: brightness(50%);
    }
  }
  a.edit {
    margin-left: auto;
  }
  &.post {
    background: rgba(73, 204, 144, 0.1);
    border-color: #49cc90;
    .method {
      background-color: #49cc90;
      border-color: #49cc90;
    }
  }
  &.get {
    background: rgba(97, 175, 254, 0.1);
    border-color: #61affe;
    .method {
      background-color: #61affe;
      border-color: #61affe;
    }
  }
  &.put {
    background: rgba(252, 161, 48, 0.1);
    border-color: #fca130;
    .method {
      background-color: #fca130fe;
      border-color: #fca130fe;
    }
  }
  &.patch {
    background: rgba(80, 227, 194, 0.1);
    border-color: #50e3c2;
    .method {
      background-color: #50e3c2;
      border-color: #50e3c2;
    }
  }
  &.delete {
    background: rgba(249, 62, 62, 0.1);
    border-color: #f93e3e;
    .method {
      background-color: #f93e3e;
      border-color: #f93e3e;
    }
  }
  &.options {
    background: rgba(13, 90, 167, 0.1);
    border-color: #0d5aa7;
    .method {
      background-color: #0d5aa7;
      border-color: #0d5aa7;
    }
  }
}
</style>