<template>
  <div>
    <div class="control">
      <label class="label">{{ $gettext('date_start') | uppercaseFirstLetter }}</label>
      <input class="input" type="date" v-model="value[0]">
    </div>
    <div class="control">
      <label class="label">{{ $gettext('date_end') | uppercaseFirstLetter }}</label>
      <input class="input" type="date" v-model="value[1]">
    </div>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        value: [null, null]
      };
    },

    computed: {
      urlValue: {
        get() {
          return (this.$route.query.date || '') + ',';
        },
        set(value) {
          const query = Object.assign({}, this.$route.query);
          query.date = value;

          if (query.date !== this.$route.query.date) {
            this.$router.push({ query });
          }
        }
      }
    },

    watch: {
      value: 'compute'
    },

    created() {
      this.value = this.urlValue.split(',');
    },

    methods: {
      compute() {
        if (!this.value[0] && !this.value[1]) {
          this.urlValue = undefined;
        } else {
          if (!this.value[0] && this.value[1]) {
            this.value = [this.value[1], this.value[0]];
          }

          if (!this.value[1]) {
            this.urlValue = this.value[0];
          } else {
            this.urlValue = this.value[0] + ',' + this.value[1];
          }
        }
      }
    }
  };
</script>
