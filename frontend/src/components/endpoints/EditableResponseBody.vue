<template>
  <div class="json-container">
    <h2>Response Body</h2>
    <div v-if="!!data && data.length > 0">
      <SingleEditalbeResponse
        v-for="(item, index) of data"
        :key="index"
        :item="item"
        :index="index"
        :items="data"
        @deleteField="(i)=>deleteField(i)"
      />
    <button @click="addNewResponse" class="btn btn-submit" style="height:3rem;">Add New Field</button>
    </div>
    <button v-else @click="setDefaultBody" class="btn btn-submit">Add Body</button>
  </div>
</template>

<script>
import SingleEditalbeResponse from "./SingleEditalbeResponse";
export default {
  components: {
    SingleEditalbeResponse
  },
  computed: {
    data: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    setBody(val = {}) {
      this.$emit("input", val);
    },
    deleteField(i) {
      this.data.splice(i, 1);
      if (this.data.length === 0) this.data = undefined;
    },
    setDefaultBody() {
      this.setBody([{ status: 200, data: {} }]);
    },
    addNewResponse() {
      this.data.push({ status: 200, data: {} });
    }
  }
};
</script>